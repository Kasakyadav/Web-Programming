const apiKey = "bd44930b1521721160fccf40fe56aba1";

let map, chart;

async function getWeather(){
let city = document.getElementById("cityInput").value;

if(!city) return alert("Enter city");

let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
let data = await res.json();

displayWeather(data);
getForecast(city);
saveRecent(city);
}

function displayWeather(data){

cityName.innerText = data.name;
temp.innerText = "Temp: " + data.main.temp + "°C";
desc.innerText = data.weather[0].description;
humidity.innerText = "Humidity: " + data.main.humidity;
wind.innerText = "Wind: " + data.wind.speed;

weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

setBackground(data.weather[0].main);
showMap(data.coord.lat, data.coord.lon);
}

/* FORECAST */
async function getForecast(city){
let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
let data = await res.json();

let html="";
for(let i=0;i<5;i++){
let d=data.list[i*8];
html+=`<div>${d.main.temp}°C</div>`;
}
forecast.innerHTML=html;

drawChart(data);
}

/* CHART */
function drawChart(data){

let labels=[],temps=[];
for(let i=0;i<8;i++){
labels.push(new Date(data.list[i].dt_txt).getHours());
temps.push(data.list[i].main.temp);
}

if(chart) chart.destroy();

chart=new Chart(tempChart,{
type:"line",
data:{labels:labels,datasets:[{data:temps}]}
});
}

/* MAP */
function showMap(lat,lon){
if(map) map.remove();

map=L.map('map').setView([lat,lon],10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
L.marker([lat,lon]).addTo(map);
}

/* BACKGROUND EFFECT */
function setBackground(condition){

document.body.className="";

condition=condition.toLowerCase();

if(condition.includes("rain")){
document.body.classList.add("rain");
}
else if(condition.includes("cloud")){
document.body.classList.add("day");
}
else{
document.body.classList.add("day");
}

let hour=new Date().getHours();
if(hour>18) document.body.classList.add("night");
}

/* RECENT */
function saveRecent(city){
let arr=JSON.parse(localStorage.getItem("cities"))||[];
arr.unshift(city);
localStorage.setItem("cities",JSON.stringify(arr));
showRecent();
}

function showRecent(){
let arr=JSON.parse(localStorage.getItem("cities"))||[];
recent.innerHTML=arr.map(c=>`<span onclick="searchAgain('${c}')">${c}</span>`).join("");
}

function searchAgain(city){
cityInput.value=city;
getWeather();
}

window.onload=showRecent;