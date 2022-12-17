let apiKey = "7386080a2f6318d17ebb9t1f5453o70f";

// about city
function cityWeather(){
//change the city-name temp and other 
let cityelement=document.querySelector(".city-name")
cityelement.innerHTML= city
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`

function findTemp(response){
    let currentTemp = Math.round(response.data.temperature.current) 
    let tempelement = document.querySelector(".temperature")
    tempelement.innerHTML= currentTemp
    //icon
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
axios.get(apiUrl).then(findTemp)

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
    let days = [
      "Sun.",
      "Mon.",
      "Tues.",
      "Wed.",
      "Thurs.",
      "Fri.",
      "Sat."
    ];

    return `${days[now.getDay()]} ${now.getDate()}`
  }
let today= document.querySelector(".day")
today.innerHTML = `${formatDate(now)}`
let timeNow = document.querySelector(".time")
timeNow.innerHTML = `${now.toLocaleTimeString('en-US', {hour: '2-digit',minute: '2-digit',})}`;

