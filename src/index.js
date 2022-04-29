function displayTemperature(response) {
    let temperatureElement = document.querySelector(`#temperature`);
    let cityElement = document.querySelector(`#city`);
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = (response.data.name);
}

let apiKey = "09d4e7600a7b696d5e69d0366d8b8483";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayTemperature);
