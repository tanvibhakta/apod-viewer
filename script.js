console.log("Here");

var thing = "https://api.nasa.gov/planetary/apod\?api_key\=fWGvSVshJd95FFVtTFPMEbIniRM1UrTULMIOkHvM\&date\=2019-01-12"

fetch(thing)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    
    console.log(JSON.stringify(myJson.url));
 
  }).catch(function(error) {
    console.log("Error:", error);
    
});

console.log("Here 2");
