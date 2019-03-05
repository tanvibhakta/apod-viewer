// TODO: re-organize order of cards (horizontal not vertical), also change
//  layout to make it more even
// TODO: image load needs to be much faster, adds a compression algorithm in there 
// TODO: hpw to stop that initial no-css load? Why are these things taking so long anyway?

initialize();

//TODO: try and remove this global variable
const setOfCards = [];

function initialize() {
    const currentDate = new Date();
    //initialize first set of cards
    for (i=0; i<9; i++){
        getCard(currentDate);        
    }     
    getManyCards(currentDate);
}

function putManyCards( card, setOfCards) {
    setOfCards.push(card);
    //display six cards at once to not break layout
    if( setOfCards.length >6 ){
        //sort cards by date, not order of arrival
        setOfCards.sort(function(obj1, obj2) {
            if(obj1.querySelector(".text-muted").innerHTML < obj2.querySelector(".text-muted").innerHTML ) {
                return -1;
            }
            else {
                return 1;
            }
        });
        let album = document.querySelector('.album');
        album.appendChild(setOfCards.pop());
    }
}

function getManyCards(currentDate) {   
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