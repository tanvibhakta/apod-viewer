var currentDate = new Date();

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

var url = "https://api.nasa.gov/planetary/apod\?api_key\=fWGvSVshJd95FFVtTFPMEbIniRM1UrTULMIOkHvM\&date\="

function createCard(asod) {
    var card = document.createElement('div');
    card.class = 'card';
    
    var date = document.createElement('p');
    date.innerHTML = asod.date;
    card.appendChild(date);

    var img = document.createElement('img');
    img.src = asod.url;
    card.appendChild(img);
    
    return card;
}

while(currentDate.getFullYear()  == 2019) {
    var date = formatDate(currentDate);
    
    fetch(url+date)
    .then(function(response) {
        return response.json();
    })
    .then(function(asod) {
        console.log(JSON.stringify(asod));
        var main = document.getElementById('container');
        main.appendChild(createCard(asod));
        //append instead of replace
        
    }).catch(function(error) {
        console.log("Error:", error);
        
    });

    date = subtractDate();
}