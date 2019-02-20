console.log("Here");

var thing = "https://api.nasa.gov/planetary/apod\?api_key\=fWGvSVshJd95FFVtTFPMEbIniRM1UrTULMIOkHvM\&date\=2019-01-12"

fetch(thing)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    ocument.getElementsByTagName('p')[0].innerHTML = "other thinsg"

    // var p = document.createElement('p').innerHTML = "This is some shit";
    // var e = document.getElementsByClassName('main');
    // e[0].appendChild(p);
    
    document.createElement('img').src = myJson.url;
    console.log(JSON.stringify(myJson.url));
    console.log(document.getElementsByName('img'));
    document.getElementsByTagName('img')[0].src = myJson.url
    
  }).catch(function(error) {
    console.log("Error:", error);
    
});

console.log("Here 2");
