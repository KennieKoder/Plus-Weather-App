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

getStylesheet();

//load on start 

function showTemp(response) {
  let cityName = document.querySelector("#city-name");
  let newCityName = response.data.name;
  let oldTemp = document.getElementById("#current-temp");
  let newTemp = Math.round(response.data.main.temp);
  let oldFeelsLike = document.getElementById("#feels-like");
  let newFeelsLike = Math.round(response.data.main.feels_like);
  let oldHumidity = document.getElementById("#humidity");
  let newHumidity = response.data.main.humidity;
  let oldWinds = document.getElementById("#winds");
  let newWinds = Math.round(response.data.wind.speed);
  let oldWeatherDetails = document.querySelector("#weather-description")
  let newWeatherDetails = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");

  celciusTemp = response.data.main.temp;

  cityName.innerHTML = newCityName;
  oldTemp.innerHTML = `${newTemp}°`;
  oldFeelsLike.innerHTML = `Feels like ${newFeelsLike}°`;
  oldHumidity.innerHTML = `${newHumidity}% Humidity`;
  oldWinds.innerHTML = `${newWinds}km/h Winds`;
  oldWeatherDetails.innerHTML = newWeatherDetails;

  iconElement.setAttribute("src", iconCodePathConverter[response.data.weather[0].icon]);
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

//search city (new with API)

function showSearchedStats(response) {
  let cityName = document.querySelector("#city-name");
  let newCityName = response.data.name;
  let oldTemp = document.getElementById("#current-temp");
  let newTemp = Math.round(response.data.main.temp);
  let oldFeelsLike = document.getElementById("#feels-like");
  let newFeelsLike = Math.round(response.data.main.feels_like);
  let oldHumidity = document.getElementById("#humidity");
  let newHumidity = response.data.main.humidity;
  let oldWinds = document.getElementById("#winds");
  let newWinds = Math.round(response.data.wind.speed);
  let oldWeatherDetails = document.querySelector("#weather-description")
  let newWeatherDetails = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");

  celciusTemp = response.data.main.temp;

  cityName.innerHTML = newCityName;
  oldTemp.innerHTML = `${newTemp}°`;
  oldFeelsLike.innerHTML = `Feels like ${newFeelsLike}°`;
  oldHumidity.innerHTML = `${newHumidity}% Humidity`;
  oldWinds.innerHTML = `${newWinds}km/h Winds`;
  oldWeatherDetails.innerHTML = newWeatherDetails;

  iconElement.setAttribute("src", iconCodePathConverter[response.data.weather[0].icon]);
};

function searchCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-city").value;
  let apiKey = `0ebc654fccbc00189d5408f3d6f15b08`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showSearchedStats);
};

// Get current location Button

function showLocalStats(response) {
  let cityName = document.querySelector("#city-name");
  let newCityName = response.data.name;
  let oldTemp = document.getElementById("#current-temp")
  let newTemp = Math.round(response.data.main.temp);
  let oldFeelsLike = document.getElementById("#feels-like");
  let newFeelsLike = Math.round(response.data.main.feels_like);
  let oldHumidity = document.getElementById("#humidity");
  let newHumidity = response.data.main.humidity;
  let oldWinds = document.getElementById("#winds");
  let newWinds = Math.round(response.data.wind.speed);
  let oldWeatherDetails = document.querySelector("#weather-description")
  let newWeatherDetails = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  
  celciusTemp = response.data.main.temp;

  cityName.innerHTML = newCityName;
  oldTemp.innerHTML = `${newTemp}°`;
  oldFeelsLike.innerHTML = `Feels like ${newFeelsLike}°`;
  oldHumidity.innerHTML = `${newHumidity}% Humidity`;
  oldWinds.innerHTML = `${newWinds}km/h Winds`;
  oldWeatherDetails.innerHTML = newWeatherDetails;

  iconElement.setAttribute("src", iconCodePathConverter[response.data.weather[0].icon]);
};

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);

  function showLocation(position) {
    let lat = Math.round(position.coords.latitude);
    let long = Math.round(position.coords.longitude);
    let apiKey = `0ebc654fccbc00189d5408f3d6f15b08`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lon=${long}&lat=${lat}&units=metric&appid=${apiKey}`;

    axios.get(apiUrl).then(showLocalStats);
  };

};

//Temperature Conversion

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  
  let temperature = document.getElementById("#current-temp");
  let fahrenheitTemp = Math.round((celciusTemp * 9/5) + 32);
  temperature.innerHTML = `${fahrenheitTemp}°`;
  celciusSwitch.classList.remove("active");
  fahrenheitSwitch.classList.add("active");
};

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperature = document.getElementById("#current-temp");
  temperature.innerHTML = `${Math.round(celciusTemp)}°`;
  fahrenheitSwitch.classList.remove("active");
  celciusSwitch.classList.add("active");
  
}

// weather icons 

let iconCodePathConverter = {
    "01d": "media/clearskyday.svg",
    "01n": "media/clearskynight.svg",
    "02d": "media/fewcloudsday.svg",
    "02n": "media/fewcloudsnight.svg",
    "03d": "media/scatteredcloudsday.svg",
    "03n": "media/scatteredcloudsnight.svg",
    "04d": "media/brokencloudsday.svg",
    "04n": "media/brokencloudsnight.svg",
    "09d": "media/showerrain.svg",
    "09n": "media/showerrain.svg",
    "10d": "media/rainday.svg",
    "10n": "media/rainnight.svg",
    "11d": "media/thunderstormday.svg",
    "11n": "media/thunderstormnight.svg",
    "13d": "media/snowday.svg",
    "13n": "media/snownight.svg",
    "50d": "media/mistday.svg",
    "50n": "media/mistnight.svg",
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

let apiKey = `0ebc654fccbc00189d5408f3d6f15b08`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=toronto&units=metric&appid=${apiKey}`;

axios.get(apiUrl).then(showTemp);
