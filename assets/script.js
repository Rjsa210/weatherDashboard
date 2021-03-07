var cityNameEl = document.querySelector('#city-name-search');
var searchForm = document.querySelector('#city-search');
var currentWeatherEl = document.querySelector('#current-block');
var forecastEl = document.querySelector('#forecast-block');
var apiKey = '53f33f9772ec66c7ccfbcf166501533a';

//search function to make API call by city name, return data, and change variable values 
// alert if city name is not valid
function submitCity(event) {
  event.preventDefault();
  cityName = cityNameEl.value.trim();
  if (cityName) {
    getCurrentWeather(cityName);
    console.log(cityName);
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
          document.querySelector('#city-date').textContent = data.name;
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

