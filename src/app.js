let apiKey = "7386080a2f6318d17ebb9t1f5453o70f";
let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
function cityWeather(){
//change the city-name temp and other 
let cityelement=document.querySelector(".city-name")
cityelement.innerHTML= city
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
let forecastApiurl =`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
function findTemp(response){
    let currentTemp = Math.round(response.data.temperature.current) 
    let tempelement = document.querySelector(".temperature")
    tempelement.innerHTML= currentTemp
    let  iconInput = document.querySelector(".icon");
    iconInput.setAttribute("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`)
    //weather details
    let detail = document.querySelector(".description")
    detail.innerHTML = `${response.data.condition.description}`
    let windVel = document.querySelector(".wind")
    windVel.innerHTML =`Wind: ${response.data.wind.speed}km/h`
    let humidityPercent = document.querySelector(".humidity")
    humidityPercent.innerHTML= ` Humidity: ${response.data.temperature.humidity}%`;
    //change units
    function func1(event){
      event.preventDefault()
      let tempelement = document.querySelector(".temperature")
      tempelement.innerHTML = tempFarenheit
    } 
    let tempFarenheit = Math.round(currentTemp * 1.8 + 32);
    let farenElement =  document.querySelector(".farenheit");
    farenElement.addEventListener("click", func1);
    function func2(event){
      event.preventDefault()
      let tempelement = document.querySelector(".temperature")
    tempelement.innerHTML= currentTemp
    }
    let celcuisElement =  document.querySelector(".celcius");
    celcuisElement.addEventListener("click", func2);
}
function findForecast(response){
  let forecastElment = `<div class="row">` 
 let i=1
  while (i<7) {
    let forcasteDate = new Date(response.data.daily[i].time*1000)
    forecastElment = forecastElment + `<div class="col ">
    <div class="card-header">${days[forcasteDate.getDay()]}</div>
    <div class="card-body"><img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[i].condition.icon}.png" alt=""></div>
    <div class="card-footer">${Math.round(response.data.daily[i].temperature.minimum)}°C  \xa0  ${Math.round(response.data.daily[i].temperature.maximum)}°C </div>
  </div>
`
i++
  }
  forecastElment = forecastElment + `</div>`;
  let forecast = document.querySelector(".forecast")
  forecast.innerHTML = forecastElment;
}
axios.get(apiUrl).then(findTemp)
axios.get(forecastApiurl).then(findForecast)
}
function findCity(event){
    event.preventDefault()
    let cityEnter = document.querySelector(".city-input")
    city = cityEnter.value
    cityWeather()
}
let city =null;
let seachInput = document.querySelector(".search-button")
seachInput.addEventListener("click",findCity)
// For Day and time 
let now= new Date()
function formatDate(now) {
    return `${days[now.getDay()]}. ${now.getDate()}`
  }
let today= document.querySelector(".day")
today.innerHTML = `${formatDate(now)}`
let timeNow = document.querySelector(".time")
timeNow.innerHTML = `${now.toLocaleTimeString('en-US', {hour: '2-digit',minute: '2-digit',})}`;
//initializing
function initialFunction(response){
  let forecastForDays = response.data.daily
  let cityelement=document.querySelector(".city-name")
  cityelement.innerHTML= response.data.city
  let currentTemp = Math.round(response.data.daily[0].temperature.day) 
  let tempelement = document.querySelector(".temperature")
  tempelement.innerHTML= currentTemp
  let  iconInput = document.querySelector(".icon");
  iconInput.setAttribute("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[0].condition.icon}.png`);
  let detail = document.querySelector(".description")
  detail.innerHTML = `${response.data.daily[0].condition.description}`
  let windVel = document.querySelector(".wind")
  windVel.innerHTML =`Wind: ${response.data.daily[0].wind.speed}km/h`
  let humidityPercent = document.querySelector(".humidity")
  humidityPercent.innerHTML= ` Humidity: ${response.data.daily[0].temperature.humidity}%`;
  let forecastElment = `<div class="row">` 
 let i=1
  while (i<7) {
    let forcasteDate = new Date(response.data.daily[i].time*1000)
    forecastElment = forecastElment + `<div class="col ">
    <div class="card-header">${days[forcasteDate.getDay()]}</div>
    <div class="card-body"><img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[i].condition.icon}.png" alt=""></div>
    <div class="card-footer">${Math.round(response.data.daily[i].temperature.minimum)}°C  \xa0  ${Math.round(response.data.daily[i].temperature.maximum)}°C </div>
  </div>
`
i++
  }
  forecastElment = forecastElment + `</div>`;
  let forecast = document.querySelector(".forecast")
  forecast.innerHTML = forecastElment;
}
let initialApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=oslo&key=${apiKey}&units=metric`
axios.get(initialApiUrl).then(initialFunction)