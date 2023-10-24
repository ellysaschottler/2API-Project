//API 1 https://openweathermap.org/api 
var weatherAPIKey = "af36b85d3236ca25f03ced5a81cc6ee6"

//API 2 https://www.last.fm/api
var musicAPIKey = "7900466c10eb22d039833bef2573b531"
// various variables
var trackNameSave
var trackURLSave
var savedTrackNames = []
var savedTrackURLs = []
var weatherTermArray = []
var savedSongsContainerEl=document.querySelector("#save-data-list")
var cityNameForm = document.querySelector("#city-name")
var weatherContainerEl = document.querySelector("#weather")
var songContainerEl = document.querySelector("#song")
var saveButtonEl = document.querySelector("#save-btn")
var cityNameDispayEl = document.querySelector("#city-name-display") //need to add this ID to html above weather
var cityInput = document.querySelector("#city")

// City Name input set as cityName variable and empty the input after entry
cityNameForm.addEventListener("submit", function (e) {
    e.preventDefault()
    if (cityInput.value == "") {
        return
    }
    cityName = cityInput.value
    cityInput.value = ""
    weatherContainerEl.innerHTML="" // clears out previous weather if new search is made
    cityNameDispayEl.innerHTML="" // clears out previous city if new city is searched
    weatherTermArray= [] // clears the weather array for the new search
    getCurrentWeather()
})

// Pulls weather data and displays it and populates the weatherTermArray
function getCurrentWeather() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + weatherAPIKey + "&units=imperial";

    fetch(queryURL).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            var cityNameDataEl = document.createElement("h4")
            cityNameDataEl.textContent = data.name
        
            var weatherForecastListEl = document.createElement("ul")
            var dateEl = document.createElement("li");
            dateEl.textContent = "Today's Weather:"
            var iconListEl = document.createElement("li")
            var iconEl = document.createElement("img");
            iconEl.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
            iconListEl.appendChild(iconEl)
            var tempEl = document.createElement("li")
            tempEl.textContent = "Temp: " + data.main.temp + "°F"
            var windEl = document.createElement("li")
            windEl.textContent = "Wind: " + data.wind.speed + " MPH"
            var humidityEl = document.createElement("li")
            humidityEl.textContent = "Humidity: " + data.main.humidity + "%"
            var weatherDescriptionEl = document.createElement("li")
            weatherDescriptionEl.textContent = "Description: " + data.weather[0].main

            //Displays the Weather data
            cityNameDispayEl.appendChild(cityNameDataEl)
            weatherForecastListEl.appendChild(dateEl)
            weatherForecastListEl.appendChild(iconListEl)
            weatherForecastListEl.appendChild(tempEl)
            weatherForecastListEl.appendChild(windEl)
            weatherForecastListEl.appendChild(humidityEl)
            weatherForecastListEl.appendChild(weatherDescriptionEl)
            weatherContainerEl.appendChild(weatherForecastListEl)

            // Populates the weatherTermArray
            var temp = data.main.temp
            var windSpeed = data.wind.speed
            var description = data.weather[0].main
            if (description == "Clouds") {
                weatherTermArray.push("cloud")
            } else {
                weatherTermArray.push(data.weather[0].main)
            }
            if (temp > 80) {
                weatherTermArray.push("hot")
            }
            if (temp < 20) {
                weatherTermArray.push("cold")
            }
            if (windSpeed > 20) {
                weatherTermArray.push("wind")
            }
            fetchMusicDataForRandom(weatherTermArray)
        })
}

function getRandomTrack(tracks) {
    if (tracks.length === 0) {
        return "No Tracks Available";
    }
    const randomIndex = Math.floor(Math.random() * tracks.length);
    return tracks[randomIndex];
}
function getRandomWeather() {
    if (weatherTermArray.length === 0) {
        return "No Weather Terms Available";
    }
    const randomIndex = Math.floor(Math.random() * weatherTermArray.length);
    return weatherTermArray[randomIndex];
}
// retrieves the music from the API depending on the weather
function fetchMusicDataForRandom(weatherTermArray) {
    const randomWeatherTerm = getRandomWeather();
    const method = "track.search";
    const track = randomWeatherTerm;
    const queryURL2 = "http://ws.audioscrobbler.com/2.0/?method=" + method + "&track=" + track + "&api_key=" + musicAPIKey + "&format=json";

    fetch(queryURL2, {
        method: "GET",
        headers: { 'User-Agent': 'Weather DJW' }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const tracks = data.results.trackmatches.track;
            if (tracks.length > 0) {
                const randomTrack = getRandomTrack(tracks);
                console.log('Randomly selected track:', randomTrack.name);
                console.log('Track URL:', randomTrack.url);
                displayRandomTrack(randomTrack.name, randomTrack.url);
                trackNameSave = randomTrack.name
                trackURLSave = randomTrack.url
            } else {
                console.log('No tracks found.');
            }
        })

    // Displays the randomly chosen track
    function displayRandomTrack(trackName, trackURL) {
        var trackNameEl = document.createElement("p");
        var trackLink = document.createElement("a");
        trackNameEl.textContent = "Now Playing: "
        trackLink.textContent = trackName;
        trackLink.href = trackURL;
        trackLink.target = "_blank"

        trackNameEl.appendChild(trackLink);
        songContainerEl.innerHTML= "";
        songContainerEl.appendChild(trackNameEl);
    }
}

// Saving Favorite Songs, Storing, Rendering them to the page
function storeSongInfo (){
    localStorage.setItem("savedTrackNames", JSON.stringify(savedTrackNames));
    localStorage.setItem("savedTrackURLs", JSON.stringify(savedTrackURLs))
}
// Saves the song
saveButtonEl.addEventListener("click", function (e){
    e.preventDefault()
    savedTrackNames.push(trackNameSave)
    savedTrackURLs.push(trackURLSave)
    storeSongInfo()
    renderSavedTracks()
})
// Displays the saved tracks
function renderSavedTracks(){
    savedSongsContainerEl.innerHTML= ""
    for (var i = 0; i < savedTrackNames.length; i++){
        var savedTrack = savedTrackNames[i];
        var savedUrl = savedTrackURLs[i]
        var li = document.createElement("li")
        var link = document.createElement("a")
        link.href=savedUrl
        link.textContent = savedTrack
        li.appendChild(link)
        savedSongsContainerEl.appendChild(li)
    }
}
//Get stored songs/links if available
function init(){
    var storedTracks = JSON.parse(localStorage.getItem("savedTrackNames"))
    if (storedTracks != null){
        savedTrackNames = storedTracks;
    }
    var storedURLs = JSON.parse(localStorage.getItem("savedTrackURLs"))
    if (storedURLs != null) {
        savedTrackURLs = storedURLs;
    }
    renderSavedTracks()
}
init()
