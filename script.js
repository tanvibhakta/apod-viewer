var currentDate = new Date();
let countPictures = 0;

function formatDate(currentDate) {
    var date = "";
    date += currentDate.getFullYear();
    date += '-';
    date += currentDate.getMonth() + 1;
    date += '-';
    date += currentDate.getDate();
    return date;
}

function subtractDate() {
    currentDate.setDate(currentDate.getDate() - 1);
    return formatDate(currentDate);
}

var url = "https://api.nasa.gov/planetary/apod?api_key=fWGvSVshJd95FFVtTFPMEbIniRM1UrTULMIOkHvM&date="

function createCard( apod) {
    var card = document.querySelector('.card').cloneNode(true);
    
    var date = card.querySelector('.text-muted');
    date.innerHTML =  apod.date;
    
    var title = card.querySelector('.card-title');
    title.innerHTML =  apod.title;

    var img = card.querySelector('img');
    if ( apod.media_type == 'image') {
        img.src =  apod.url;
        img.alt =  apod.explanation;
    }
    else {
        img.src =  apod.url;
        img.alt = "Video";
    }
    
    
    return card;
}

while(countPictures < 9) {
    var date = formatDate(currentDate);
    
    fetch(url+date)
    .then(function(response) {
        return response.json();
    })
    .then(function( apod) {
        console.log(JSON.stringify( apod));
        var album = document.querySelector('.album');
        album.appendChild(createCard( apod));
        //append instead of replace
        
    }).catch(function(error) {
        console.log("Error:", error);
        
    });

    countPictures += 1;
    date = subtractDate();
}