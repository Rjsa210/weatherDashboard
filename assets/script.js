var cityNameEl = document.querySelector('#city-name-search');
var searchForm = document.querySelector('#city-search');
var currentWeatherEl = document.querySelector('#current-block');
var forecastEl = document.querySelector('#forecast-field');
var apiKey = '53f33f9772ec66c7ccfbcf166501533a';

//search function to make API call by city name, return data, and change variable values 
// alert if city name is not valid
function submitCity(event) {
  event.preventDefault();
  cityName = cityNameEl.value.trim();
  if (cityName) {
    getCurrentWeather(cityName);
  }
}


searchForm.addEventListener('submit', submitCity);

function getCurrentWeather(city) {
  console.log('It was rainy it was cold... West ' + city + ' was no place for a 12 year old.')
  var currentUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey;
  var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&mode=xml&units=imperial&cnt=5&appid=53f33f9772ec66c7ccfbcf166501533a';

  fetch(currentUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);

          var lon = data.coord.lon;
          var lat = data.coord.lat;
          getForecast(lat, lon);

          // console.log(data.weather[0].main);
          document.querySelector('#city-date').textContent = data.name + ' ' + moment(data.dt * 1000).format('MM/DD/YYYY');
          document.querySelector('#wicon').setAttribute('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
          document.querySelector('#wicon').setAttribute('alt', data.weather[0].description);
          // document.querySelector('#current-temp').textContent = 'Temperature: ' + data.main.temp;
          // document.querySelector('#current-humidity').textContent = 'Humidity: ' + data.main.humidity;
          // document.querySelector('#wind-speed').textContent = 'Wind Speed: ' + data.wind.speed;
          // document.querySelector('#UV-index').textContent = 'UV Index: ';//need uv index
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Open Weather API');
    });
}

function getForecast(lat, lon) {
  var forecastURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,minutely&units=imperial&appid=' + apiKey;
  console.log('so he rented a flat on the lower east side... of ');

  fetch(forecastURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          var dailyForecast = data.daily;
          renderForecast(dailyForecast);

          document.querySelector('#current-temp').textContent = 'Temperature: ' + data.current.temp + '°F';
          document.querySelector('#current-humidity').textContent = 'Humidity: ' + data.current.humidity + '%';
          document.querySelector('#wind-speed').textContent = 'Wind Speed: ' + data.current.wind_speed + 'mph';
          document.querySelector('#UV-index').textContent = 'UV Index: ' + data.current.uvi;
        });
      } else {
        alert('Error 2nd: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('unable to connect to Open Weather API');
    });
}

function renderForecast(array) {

  for (var i = 0; i < 5; i++) {

    forecastEl.children[i].children[0].children[0].textContent = moment(array[i].dt * 1000).format('MM/DD/YY');
    forecastEl.children[i].children[0].children[1].children[0].setAttribute('src','http://openweathermap.org/img/w/' + array[i].weather[0].icon + '.png' );
    forecastEl.children[i].children[0].children[1].children[0].setAttribute('alt',  array[i].weather[0].description);
    forecastEl.children[i].children[0].children[2].textContent = array[i].temp.day + '°F';
    forecastEl.children[i].children[0].children[3].textContent = 'Humidity: ' + array[i].humidity + '%';
    //   renderBlocks();
    //   dayMain.removeChild(dayIcon);
    //   dayList.removeChild(dayHumidity);
    //   dayList.removeChild(dayTemp);
    //   dayList.removeChild(dayMain);
    //   dayList.removeChild(dayDate);
    //   dayBlock.removeChild(dayList);
    //   forecastEl.removeChild(dayBlock);
    // } else {
    
    //   renderBlocks();
    // }
    // function deleteBlocks() {
      
    // }
    // function renderBlocks() {
    //   var dayBlock = document.createElement('div');
    //   dayBlock.className = 'col col-sm-12 col-md-6 col-lg-2';
    //   // forecastEl.removeChild(dayBlock);
    //   forecastEl.appendChild(dayBlock);

    //   var dayList = document.createElement('ul');
    //   // dayBlock.removeChild(dayList);
    //   dayBlock.appendChild(dayList);

    //   var dayDate = document.createElement('li');
    //   dayDate.textContent = moment(array[i].dt * 1000).format('MM/DD/YY');
    //   // dayList.removeChild(dayDate);
    //   dayList.appendChild(dayDate);

    //   var dayMain = document.createElement('li');
    //   // dayList.removeChild(dayMain);
    //   dayList.appendChild(dayMain);

    //   var dayIcon = document.createElement('img');
    //   dayIcon.setAttribute('src', 'http://openweathermap.org/img/w/' + array[i].weather[0].icon + '.png');
    //   dayIcon.setAttribute('alt', array[i].weather[0].description);
    //   // dayMain.removeChild(dayIcon);
    //   dayMain.appendChild(dayIcon);

    //   var dayTemp = document.createElement('li');
    //   dayTemp.textContent = array[i].temp.day + '°F';
    //   // dayList.removeChild(dayTemp);
    //   dayList.appendChild(dayTemp);

    //   dayHumidity = document.createElement('li');
    //   dayHumidity.textContent = 'Humidity: ' + array[i].humidity + '%';
    //   // dayList.removeChild(dayHumidity);
    //   dayList.appendChild(dayHumidity);


    // }
  }
}



//renderCities function to print city buttons below search bar
// function storeCities(city) {
//   var cityList = [];
//   cityList.push(city);

//   for (var i = 0; i < cityList.length; i++) {
//     var

//   }
// }

//store cities function to store city to an array in local storage
//rendercurrent function to print relevant information to the current block

//renderforecast function to print forcast to the forecast block assuming for loop if returned as array

