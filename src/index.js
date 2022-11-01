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

  cityName.innerHTML = newCityName;
  oldTemp.innerHTML = `${newTemp}°`;
  oldFeelsLike.innerHTML = `Feels like ${newFeelsLike}°`;
  oldHumidity.innerHTML = `${newHumidity}% Humidity`;
  oldWinds.innerHTML = `${newWinds}km/h Winds`;
  oldWeatherDetails.innerHTML = newWeatherDetails;

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
  
  cityName.innerHTML = newCityName;
  oldTemp.innerHTML = `${newTemp}°`;
  oldFeelsLike.innerHTML = `Feels like ${newFeelsLike}°`;
  oldHumidity.innerHTML = `${newHumidity}% Humidity`;
  oldWinds.innerHTML = `${newWinds}km/h Winds`;
  oldWeatherDetails.innerHTML = newWeatherDetails;
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

//Get current date and time

let dateAndTime = document.querySelector("#date");
dateAndTime.innerHTML = formatDate(dateAndTime);

//search city (new with API)


let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

// Get current location Button


let locationButton = document.getElementById("#location-button");
locationButton.addEventListener("click", getLocation);


// 🙀Bonus Feature
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

// function convertToFahrenheit(event) {
//   event.preventDefault();
//   let temp = document.querySelector(".currentTemp");
//   let fakeTemp = 17;
//   let fahrenheitTemp = Math.round((fakeTemp * 9) / 5 + 32);
//   temp.innerHTML = `${fahrenheitTemp}°`;
// }

// let fahrenheitLink = document.getElementById("#fahrenheit-switch");
// fahrenheitLink.addEventListener("click", convertToFahrenheit);

// function convertToCelsius(event) {
//   event.preventDefault();
//   let temp = document.querySelector(".currentTemp");
//   let fakeTemp = 63;
//   let celsiusTemp = Math.round((fakeTemp - 30) / 2);
//   temp.innerHTML = `${celsiusTemp}°`;
// }

// let celsiusLink = document.getElementById("#celsius-switch");
// celsiusLink.addEventListener("click", convertToCelsius);
