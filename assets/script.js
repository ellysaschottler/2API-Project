//API 1 https://openweathermap.org/api 
//API 2 https://www.last.fm/api

var cityNameForm = document.querySelector("#city-name")
var weatherContainerEl = document.querySelector("#weather")
var songContainerEl = document.querySelector("#song")
var saveButtonEl = document.querySelector("#save-btn")
var cityNameDispayEl = document.querySelector("#city-name-display") //need to add this ID to html above weather
var cityInput = document.querySelector("#city")

//Weather API Section

var cityName = "Rochester" // need to make the cityName respond to user input
var APIKey = "af36b85d3236ca25f03ced5a81cc6ee6";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";


function getCurrentWeather (){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";

    fetch(queryURL).then (function(response){
        return response.json();
    })
    .then(function(data){
        var cityNameDataEl = document.createElement("h2")
        cityNameDataEl.textContent = data.name
        
        var weatherForecastListEl = document.createElement("ul")
        var dateEl = document.createElement("li");
        dateEl.textContent = dayjs.unix(data.dt).format("MM/DD/YYYY")
        var iconListEl = document.createElement("li")
        var iconEl = document.createElement("img");
        iconEl.src = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png"
        iconListEl.appendChild(iconEl)
        var tempEl = document.createElement("li")
        tempEl.textContent = "Temp: " +data.main.temp +"°F"
        var windEl = document.createElement("li")
        windEl.textContent = "Wind: "+ data.wind.speed +" MPH"
        var humidityEl = document.createElement("li")
        humidityEl.textContent = "Humidity: "+data.main.humidity + "%"
        var weatherDescriptionEl = document.createElement("li")
        weatherDescriptionEl.textContent = "description:" +data.weather[0].main
        
        cityNameDispayEl.appendChild(cityNameDataEl)
        weatherForecastListEl.appendChild(dateEl)
        weatherForecastListEl.appendChild(iconListEl)
        weatherForecastListEl.appendChild(tempEl)
        weatherForecastListEl.appendChild(windEl)
        weatherForecastListEl.appendChild(humidityEl)
        weatherForecastListEl.appendChild(weatherDescriptionEl)
        weatherContainerEl.appendChild(weatherForecastListEl)

        getMusicData() // getMusicData() not yet written
    })
}
//Music API Section
var weatherTerm = "rain" // weather term to be updated depending on the day's weather
var methodChoice = "track.search"
var methodChoiceValue = "&track=" + weatherTerm
var queryModifier = methodChoice + methodChoiceValue

var APIKey2 = "7900466c10eb22d039833bef2573b531"
var queryURL2 = "http://ws.audioscrobbler.com/2.0/?method=" + queryModifier + "&api_key=" + APIKey2 + "&format=json"

fetch(queryURL2, {
    method: "GET",
    headers: { 'User-Agent': 'Weather DJW' }
})
    .then(function (response) {


        return response.json();
    })
    .then(function (data) {

        console.log(data.results.trackmatches.track)
        console.log(data.results.trackmatches.track[0].name)
        console.log(data.results.trackmatches.track[0].url)
    })
var weatherTerms = ["Rain", "Wind", "Hot", "Pressure", "Cloud"]


// Function SaveFavorite = save + display on click event
// Function SelectWeather = choose weather term from weather data, use if conditions to choose specific weather terms
// Function randomWeatherSong = use randomizer to select track index #
// Function DisplayWeather = use openweather assignment code

// const submitBtn = document.querySelector("#btn");
// submitBtn.addEventListener("click", handleUserInput);
// function handleUserInput() {
//     const cityName = document.querySelector("#cityName").value;
//     const weatherTerm = document.querySelector("#weatherTerm").value;



//     //getMusic(weatherTerm);
// }
const userSongs = [];
const saveBtn = document.querySelector("#save-btn");
saveBtn.addEventListener("click", saveUserInput);
function saveUserInput(){
    
    // const faveSong = document.querySelector("#save-data").value;


}
// define getMusic function + use save button to save favorite song in local storage + display saved song + make getMusic function, save locally + globally

  
    // getWeather(cityName);
    // getMusic(weatherTerm);


  // City Name input set as cityName variable and empty the input after entry
cityNameForm.addEventListener("submit", function (e){
    e.preventDefault()
    if (cityInput.value == ""){
        return
    }
    cityName = cityInput.value  
    cityInput.value = ""
    getCurrentWeather()
})

