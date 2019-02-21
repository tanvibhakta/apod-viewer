var today = new Date();

function dateFormat(today) {
    var date = "";
    date += today.getFullYear();
    date += '-';
    date += today.getMonth() + 1;
    date += '-';
    date += today.getDate();
    return date;
}

function dateSubtract() {
    today.setDate(today.getDate() - 1);
    return dateFormat(today);
}

var url = "https://api.nasa.gov/planetary/apod\?api_key\=fWGvSVshJd95FFVtTFPMEbIniRM1UrTULMIOkHvM\&date\="

function createCard(myJson) {
    var card = document.createElement('div');
    card.class = 'card';
    
    var date = document.createElement('p');
    date.innerHTML = myJson.date;
    card.appendChild(date);

    var img = document.createElement('img');
    img.src = myJson.url;
    card.appendChild(img);
    
    return card;
}

while(today.getFullYear()  == 2019) {
    var date = dateFormat(today);

    fetch(url+date)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(JSON.stringify(myJson));
        var main = document.getElementById('container');
        main.appendChild(createCard(myJson));
        //append instead of replace
        
    }).catch(function(error) {
        console.log("Error:", error);
        
    });

    date = dateSubtract();
}