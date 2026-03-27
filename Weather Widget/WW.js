const apiKey = "YOUR_API_KEY";

// 🌙 Toggle Light/Dark Mode
function toggleMode() {
document.body.classList.toggle("light");
}

// ⏳ Loader Functions
function showLoader() {
document.getElementById("loader").style.display = "block";
}

function hideLoader() {
document.getElementById("loader").style.display = "none";
}

// 🌦 Get Weather by City
async function getWeather() {

```
const city = document.getElementById("cityInput").value;

if(city === ""){
    alert("Please enter a city name");
    return;
}

showLoader();

try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
        alert("City not found");
        hideLoader();
        return;
    }

    displayWeather(data);
    getForecast(city);

} catch (error) {
    alert("Error fetching data");
}

hideLoader();
```

}

// 📍 Get Weather by Current Location
function getLocationWeather() {

```
if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
}

navigator.geolocation.getCurrentPosition(async (position) => {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    showLoader();

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        const res = await fetch(url);
        const data = await res.json();

        displayWeather(data);
        getForecast(data.name);

    } catch (error) {
        alert("Error fetching location weather");
    }

    hideLoader();

});
```

}

// 🌡 Display Current Weather
function displayWeather(data) {

```
document.getElementById("cityName").innerText = data.name;

document.getElementById("temp").innerText =
    "Temperature: " + data.main.temp + " °C";

document.getElementById("desc").innerText =
    "Condition: " + data.weather[0].description;

document.getElementById("humidity").innerText =
    "Humidity: " + data.main.humidity + "%";

document.getElementById("wind").innerText =
    "Wind: " + data.wind.speed + " km/h";

const icon = data.weather[0].icon;

document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

// 🌦 Dynamic Background Change
setWeatherBackground(data.weather[0].main);
```

}

// 📅 5-Day Forecast
async function getForecast(city) {

```
try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    let forecastHTML = "";

    for (let i = 0; i < 5; i++) {

        const day = data.list[i * 8];
        const icon = day.weather[0].icon;

        forecastHTML += `
        <div class="forecast-day">
            <p>${new Date(day.dt_txt).toLocaleDateString()}</p>
            <img src="https://openweathermap.org/img/wn/${icon}.png">
            <p>${day.main.temp}°C</p>
        </div>
        `;
    }

    document.getElementById("forecast").innerHTML = forecastHTML;

} catch (error) {
    console.log("Forecast error");
}
```

}

// 🌈 Set Background Based on Weather
function setWeatherBackground(condition) {

```
document.body.classList.remove("sunny", "rain", "clouds", "night");

condition = condition.toLowerCase();

if (condition.includes("clear")) {
    document.body.classList.add("sunny");
} 
else if (condition.includes("rain")) {
    document.body.classList.add("rain");
} 
else if (condition.includes("cloud")) {
    document.body.classList.add("clouds");
} 
else {
    document.body.classList.add("night");
}
```

}
