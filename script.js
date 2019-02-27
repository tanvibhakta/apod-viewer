 let countPictures = 0;
 const url = "https://api.nasa.gov/planetary/apod?api_key=fWGvSVshJd95FFVtTFPMEbIniRM1UrTULMIOkHvM&date="
 const currentDate = new Date();
 
 function createCard( apod) {
    const card = document.querySelector('template').content.cloneNode(true);
    
    const date = card.querySelector('.text-muted');
    date.innerHTML =  apod.date;
    
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

while(countPictures < 9) {
    let date = formatDate(currentDate);
    
    fetch(url+date)
    .then(function(response) {
        return response.json();
    })
    .then(function( apod) {
        const album = document.querySelector('.album');
        album.appendChild(createCard( apod));
        //append instead of replace
        
    }).catch(function(error) {
        console.log("Error:", error);
        
    });
    
    countPictures += 1;
    date = subtractDate();
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

function subtractDate() {
    currentDate.setDate(currentDate.getDate() - 1);
    return formatDate(currentDate);
}