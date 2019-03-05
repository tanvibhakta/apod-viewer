initialize();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
const setOfCards = [];

function initialize() {
    const currentDate = new Date();
    //make this more clear(but how?)
    for (i=0; i<9; i++){
        getCard(currentDate);        // putManyCards(getCard(currentDate), setOfCards);
    }
    getManyCards(currentDate);
}     

function putManyCards( card, setOfCards) {
    setOfCards.push(card);
    if( setOfCards.length >=6 ){
        setOfCards.sort();
        let album = document.querySelector('.album');
        console.log(setOfCards);
        album.appendChild(setOfCards.pop());
    }
}

function getManyCards(currentDate) {   
    let setOfCards = [];
    window.onscroll = function() {
        // detects reaching the bottom of the page
        if ((window.innerHeight + window.pageYOffset) 
            >= document.body.offsetHeight) {
            getCard(currentDate);
        }
    };   
}

function getCard(currentDate) {
    let date = formatDate(currentDate);
    const url = "https://api.nasa.gov/planetary/apod?api_key=fWGvSVshJd95FFVtTFPMEbIniRM1UrTULMIOkHvM&date=";
    
    fetch(url+date)
    .then(function(response) {
        return response.json();
    })
    .then(function( apod) {
        //sort cards by date and then display 
        return createCard(apod);
    }).then( function(card) {
        putManyCards(card, setOfCards);
    }).catch(function(error) {
        console.log("Error:", error);
        
    });
    
    date = subtractDate(currentDate);
}   

function createCard(apod) {
    const card = document.querySelector('template').content.cloneNode(true);
    
    const date = card.querySelector('.text-muted');
    date.innerHTML =  apod.date;
    //TODO: format date to read nicer 
    
    const title = card.querySelector('.card-title');
    title.innerHTML =  apod.title;
    
    const img = card.querySelector('img');
    if ( apod.media_type == 'image') {
        img.src =  apod.url;
        img.alt =  apod.explanation;
    }
    else {
        img.src =  apod.url;
        img.alt = "Video";
        console.log(apod);
    }
    return card;
}

function formatDate(currentDate) {
    let date = "";
    date += currentDate.getFullYear();
    date += '-';
    date += currentDate.getMonth() + 1;
    date += '-';
    date += currentDate.getDate();
    return date;
}

function subtractDate(currentDate) {
    currentDate.setDate(currentDate.getDate() - 1);
    return formatDate(currentDate);
}