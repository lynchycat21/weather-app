let now = new Date();

let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = day[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let currentMonth = months[now.getMonth()];

let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

let formattedDate = `${currentDay}, ${currentMonth} ${date} ${hour}:${minutes}`;
let todayDate = document.querySelector("#date");
todayDate.innerHTML = formattedDate;

//change from celcius to farhenheit using links and static data
function changeTemp(event) {
  event.preventDefault();

  let temp = document.querySelector("#current-temp");
  let temperature = Math.round(12 * (9 / 5) + 32);
  temp.innerHTML = `${temperature}°C`;
}

function changeTempBack(event) {
  event.preventDefault();

  let celciusTemp = document.querySelector("#current-temp");
  let temperature = 12;
  celciusTemp.innerHTML = `${temperature}°C`;
}

let fahLink = document.querySelector("#fahrenheit-link");
fahLink.addEventListener("click", changeTemp);

let celLink = document.querySelector("#celcius-link");
celLink.addEventListener("click", changeTempBack);

//Geolocation
function searchCity(city) {
  let apiKey = "9036b9a17b31220b33901d3c3a2c9847";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function displayCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "9036b9a17b31220b33901d3c3a2c9847";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Madrid");