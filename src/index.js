//get Stylesheet based on current time 

function getStylesheet() {
    let theme = document.querySelector("#theme");
    let currentTime = new Date().getHours();

    if (0<= currentTime&&currentTime <6) {
        theme.setAttribute(`href`, `src/night.css`);
    } if (6<= currentTime&&currentTime <18) {
        theme.setAttribute(`href`, `src/day.css`);
    } if (18<= currentTime&&currentTime<24) {
        theme.setAttribute(`href`, `src/night.css`);
    }
}    

//load on start 

function getForecast(coordinates) {
  let lon = coordinates.longitude;
  let lat = coordinates.latitude;
  let apiKey = `498cb4a4fe930cotf42babaf05d8e8ae`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);

};

function showTemp(response) {
  let cityName = document.querySelector("#city-name");
  let newCityName = response.data.city;
  let oldTemp = document.getElementById("#current-temp");
  let newTemp = Math.round(response.data.temperature.current);
  let oldFeelsLike = document.getElementById("#feels-like");
  let newFeelsLike = Math.round(response.data.temperature.feels_like);
  let oldHumidity = document.getElementById("#humidity");
  let newHumidity = response.data.temperature.humidity;
  let oldWinds = document.getElementById("#winds");
  let newWinds = Math.round(response.data.wind.speed);
  let oldWeatherDetails = document.querySelector("#weather-description")
  let newWeatherDetails = response.data.condition.description;
  let iconElement = document.querySelector("#icon");

  celciusTemp = response.data.temperature;

  cityName.innerHTML = newCityName;
  oldTemp.innerHTML = `${newTemp}°`;
  oldFeelsLike.innerHTML = `Feels like ${newFeelsLike}°`;
  oldHumidity.innerHTML = `${newHumidity}% Humidity`;
  oldWinds.innerHTML = `${newWinds}km/h Winds`;
  oldWeatherDetails.innerHTML = newWeatherDetails;

  iconElement.setAttribute("src", iconCodePathConverter[response.data.condition.icon]);

  getForecast(response.data.coordinates);

}

//Get current date and time

function formatDate(date) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let now = new Date();
  let month = months[now.getMonth()];
  let todaysDate = now.getDate();
  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let time = hours + `:` + minutes;
  let sentence = `${day} ${month} ${todaysDate}, ${time}`;

  return sentence;
};

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat" ]
 

  return days[day];
};

function displayForecast(response) {
  let forecast = response.data.daily;
 
  

  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function(forecastDay) {
    forecastHTML = 
      forecastHTML + `
              <div class="col">
                <div class="weather-forecast-weekday">${formatDay(forecastDay.time)}</div>
                <img
                  src="${iconCodePathConverter[forecastDay.condition.icon]}"
                  alt="icon"
                  width="50"
                  id="#icon"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}°</span>
                  <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}°</span>
                </div>
              </div>
              `; 
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
};



//search city 

function showSearchedStats(response) {
  let cityName = document.querySelector("#city-name");
  let newCityName = response.data.city;
  let oldTemp = document.getElementById("#current-temp");
  let newTemp = Math.round(response.data.temperature.current);
  let oldFeelsLike = document.getElementById("#feels-like");
  let newFeelsLike = Math.round(response.data.temperature.feels_like);
  let oldHumidity = document.getElementById("#humidity");
  let newHumidity = response.data.temperature.humidity;
  let oldWinds = document.getElementById("#winds");
  let newWinds = Math.round(response.data.wind.speed);
  let oldWeatherDetails = document.querySelector("#weather-description")
  let newWeatherDetails = response.data.condition.description;
  let iconElement = document.querySelector("#icon");

  celciusTemp = response.data.temperature;

  cityName.innerHTML = newCityName;
  oldTemp.innerHTML = `${newTemp}°`;
  oldFeelsLike.innerHTML = `Feels like ${newFeelsLike}°`;
  oldHumidity.innerHTML = `${newHumidity}% Humidity`;
  oldWinds.innerHTML = `${newWinds}km/h Winds`;
  oldWeatherDetails.innerHTML = newWeatherDetails;

  iconElement.setAttribute("src", iconCodePathConverter[response.data.condition.icon]);

};



function searchCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-city").value;
  let apiKey = `498cb4a4fe930cotf42babaf05d8e8ae`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchedCity}&key=${apiKey}`;

  axios.get(apiUrl).then(showSearchedStats);
};

// Get current location Button

function showLocalStats(response) {
  let cityName = document.querySelector("#city-name");
  let newCityName = response.data.city;
  let oldTemp = document.getElementById("#current-temp")
  let newTemp = Math.round(response.data.temperature.current);
  let oldFeelsLike = document.getElementById("#feels-like");
  let newFeelsLike = Math.round(response.data.temperature.feels_like);
  let oldHumidity = document.getElementById("#humidity");
  let newHumidity = response.data.temperature.humidity;
  let oldWinds = document.getElementById("#winds");
  let newWinds = Math.round(response.data.wind.speed);
  let oldWeatherDetails = document.querySelector("#weather-description")
  let newWeatherDetails = response.data.condition.description;
  let iconElement = document.querySelector("#icon");
  
  celciusTemp = response.data.temperature;

  cityName.innerHTML = newCityName;
  oldTemp.innerHTML = `${newTemp}°`;
  oldFeelsLike.innerHTML = `Feels like ${newFeelsLike}°`;
  oldHumidity.innerHTML = `${newHumidity}% Humidity`;
  oldWinds.innerHTML = `${newWinds}km/h Winds`;
  oldWeatherDetails.innerHTML = newWeatherDetails;

  iconElement.setAttribute("src", iconCodePathConverter[response.data.condition.icon]);
};

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);

  function showLocation(position) {
    let lat = Math.round(position.coords.latitude);
    let lon = Math.round(position.coords.longitude);
    let apiKey = `498cb4a4fe930cotf42babaf05d8e8ae`;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;

    axios.get(apiUrl).then(showLocalStats);
  };

};

//Temperature Conversion

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  
  let temperature = document.getElementById("#current-temp");
  let fahrenheitTemp = Math.round((celciusTemp.current * 9/5) + 32);
  temperature.innerHTML = `${fahrenheitTemp}°`;
  celciusSwitch.classList.remove("active");
  fahrenheitSwitch.classList.add("active");

  
};

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperature = document.getElementById("#current-temp");
  temperature.innerHTML = `${Math.round(celciusTemp.current)}°`;
  fahrenheitSwitch.classList.remove("active");
  celciusSwitch.classList.add("active");
  
}

//stylesheet function call

getStylesheet();

// weather icons 

let iconCodePathConverter = {
    "clear-sky-day": "media/clearskyday.svg",
    "clear-sky-night": "media/clearskynight.svg",
    "few-clouds-day": "media/fewcloudsday.svg",
    "few-clouds-night": "media/fewcloudsnight.svg",
    "scattered-clouds-day": "media/scatteredcloudsday.svg",
    "scattered-clouds-night": "media/scatteredcloudsnight.svg",
    "broken-clouds-day": "media/brokencloudsday.svg",
    "broken-clouds-night": "media/brokencloudsnight.svg",
    "shower-rain-day": "media/showerrain.svg",
    "shower-rain-night": "media/showerrain.svg",
    "rain-day": "media/rainday.svg",
    "rain-night": "media/rainnight.svg",
    "thunderstorm-day": "media/thunderstormday.svg",
    "thunderstorm-night": "media/thunderstormnight.svg",
    "snow-day": "media/snowday.svg",
    "snow-night": "media/snownight.svg",
    "mist-day": "media/mistday.svg",
    "mist-night": "media/mistnight.svg",
}



let celciusTemp = null;

//Get current date and time

let dateAndTime = document.querySelector("#date");
dateAndTime.innerHTML = formatDate(dateAndTime);


//search city (new with API)


let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

// Get current location Button


let locationButton = document.getElementById("#location-button");
locationButton.addEventListener("click", getLocation);


//Temperature Conversion 

let fahrenheitSwitch = document.getElementById("#fahrenheit-switch");
fahrenheitSwitch.addEventListener("click", displayFahrenheitTemperature)

let celciusSwitch = document.getElementById("#celcius-switch");
celciusSwitch.addEventListener("click", displayCelciusTemperature);

//load on start

let apiKey = `498cb4a4fe930cotf42babaf05d8e8ae`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=toronto&key=${apiKey}`;

axios.get(apiUrl).then(showTemp);
