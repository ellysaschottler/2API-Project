//API 1 https://openweathermap.org/api 
//API 2 https://developer.musixmatch.com/

var APIKey2 = "1fa617f326e19f07e8f269c74152f2b1"

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
var APIKey2 = "1fa617f326e19f07e8f269c74152f2b1"
var queryURL2 = "https://api.musixmatch.com/ws/1.1/" + "track.get?apikey=" + APIKey2


fetch(queryURL2)
.then (function(response){

return response.json();
})
.then(function(data){
    // getMusic(data)
    console.log(data)

})





