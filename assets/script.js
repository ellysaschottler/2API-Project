//API 1 https://openweathermap.org/api 
//API 2 https://www.last.fm/api


//Weather API Section
var cityName = "Rochester"
var APIKey = "af36b85d3236ca25f03ced5a81cc6ee6";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";

fetch(queryURL)
.then (function(response){

return response.json();
})
.then(function(data){
    // getWeather(data)
console.log(data) // gets whole data
console.log("weather-icon-code" +data.weather[0].icon)
console.log("speed" +data.wind.speed)
console.log("humidity"+data.main.humidity)
console.log("temp" + data.main.temp)
console.log("unix-date"+data.dt)
console.log("lat" +data.coord.lat)
console.log("lon" + data.coord.lon)
})

//Music API Section

var methodChoice = "geo.gettopartists"
var countryChoice = "spain"
var queryModifier = methodChoice + "&country="+ countryChoice

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
    
console.log(data) 
})
