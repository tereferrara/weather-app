function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}



function displayTemperature(response) {
    let temperatureElement = document.querySelector(`#temperature`);
    let cityElement = document.querySelector(`#city`);
    let descriptionElement = document.querySelector(`#weatherDescription`);
    let humidityElement = document.querySelector(`#humidity`);
    let windspeedElement = document.querySelector(`#windspeed`);
    let dateElement = document.querySelector(`.currentTime`);
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = (response.data.name);
    descriptionElement.innerHTML = (response.data.weather[0].description);
    humidityElement.innerHTML = (response.data.main.humidity);
    windspeedElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "09d4e7600a7b696d5e69d0366d8b8483";
let city = "Paris";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
