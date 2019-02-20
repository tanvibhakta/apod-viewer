var today = new Date();

function date_format(today) {
    var date = "";
    date += today.getFullYear();
    date += '-';
    date += today.getMonth() + 1;
    date += '-';
    date += today.getDate();
    return date;
}

function date_subtract() {
    today.setDate(today.getDate() - 1);
    return date_format(today);
}

var url = "https://api.nasa.gov/planetary/apod\?api_key\=fWGvSVshJd95FFVtTFPMEbIniRM1UrTULMIOkHvM\&date\="

while(today.getFullYear()  == 2019) {
    var date = date_format(today);

    fetch(url+date)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log("SDg");
        
        console.log(JSON.stringify(myJson));
        var main = document.getElementById('main');
        var img = document.createElement('img');
        img.src = myJson.url;
        main.appendChild(img);
        //append instead of replace
        
    }).catch(function(error) {
        console.log("Error:", error);
        
    });

    date = date_subtract();
}