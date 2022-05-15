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

function displayForecast() {
    let forecastElement= document.querySelector(`#forecast`);
    let forecastHTML ="Forecast";
    forecastHTML= forecastHTML + `<div class="row">`
    let days=["Fri","Sat","Sun","Mon", "Tue","Wed"];
    days.forEach(function(day){
        forecastHTML = forecastHTML+`
        <div class="col-2">
          ${day}
          <img
            src="http://openweathermap.org/img/wn/01d@2x.png"
            alt=""
            width="35"
          />
          12°C/ 18°C
        </div>
      
    `;
    })
    


forecastHTML= forecastHTML + `</div>`
forecastElement.innerHTML= forecastHTML;
}


function displayTemperature(response) {
    let temperatureElement = document.querySelector(`#temperature`);
    let cityElement = document.querySelector(`#city`);
    let descriptionElement = document.querySelector(`#weatherDescription`);
    let humidityElement = document.querySelector(`#humidity`);
    let windspeedElement = document.querySelector(`#windspeed`);
    let dateElement = document.querySelector(`.currentTime`);
    let iconElement = document.querySelector(`#icon`);

    celsiusTemp= (response.data.main.temp);

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = (response.data.name);
    descriptionElement.innerHTML = (response.data.weather[0].description);
    humidityElement.innerHTML = (response.data.main.humidity);
    windspeedElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

}



function search(city) {
    let apiKey = "09d4e7600a7b696d5e69d0366d8b8483";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFar(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let ftemp = (celsiusTemp *9)/5 + 32;
    temperatureElement.innerHTML= Math.round(ftemp);
    let far= document.querySelector("#f-link");
    far.classList.add("active");
    let cels= document.querySelector("#c-link");
    cels.classList.remove("active");
    
}
let celsiusTemp= null;

displayForecast();

function displayCels(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML =Math.round(celsiusTemp);
    let far= document.querySelector("#f-link");
    far.classList.remove("active");
    let cels= document.querySelector("#c-link");
    cels.classList.add("active");
}
search("Paris");

let form = document.querySelector("#search-form");
console.log(form)
form.addEventListener("submit", handleSubmit);


let fahrenheight = document.querySelector("#f-link");
fahrenheight.addEventListener("click", displayFar);

let celsius = document.querySelector("#c-link");
celsius.addEventListener("click", displayCels);


