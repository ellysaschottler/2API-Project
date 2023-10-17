//API 1 https://openweathermap.org/api 
//API 2 https://www.last.fm/api


//Weather API Section

var cityName = "Rochester" // need to make the cityName respond to user input
var APIKey = "af36b85d3236ca25f03ced5a81cc6ee6";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";

fetch(queryURL)
.then (function(response){

return response.json();
})
.then(function(data){
console.log(data) // gets whole data
console.log("weather-icon-code" +data.weather[0].icon)
console.log("speed" +data.wind.speed)
console.log("humidity"+data.main.humidity)
console.log("temp" + data.main.temp)
})

//Music API Section
var weatherTerm = "rain" // weather term to be updated depending on the day's weather
var methodChoice = "track.search" 
var methodChoiceValue = "&track=" + weatherTerm
var queryModifier = methodChoice + methodChoiceValue

var APIKey2 = "7900466c10eb22d039833bef2573b531"
var queryURL2 = "http://ws.audioscrobbler.com/2.0/?method=" + queryModifier + "&api_key=" + APIKey2 + "&format=json"

fetch(queryURL2, {
    method: "GET",
    headers: {'User-Agent': 'Weather DJW'}
})
.then (function(response){

return response.json();
})
.then(function(data){
    
console.log(data.results.trackmatches.track[0]) 
console.log(data.results.trackmatches.track[0].name)
console.log(data.results.trackmatches.track[0].url)
})
