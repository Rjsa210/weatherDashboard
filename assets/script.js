var cityNameEl = document.querySelector('#city-name-search');
var searchForm = document.querySelector('#city-search');
var currentWeatherEl = document.querySelector('#current-block');
var forecastEl = document.querySelector('#forecast-field');
var buttonList = document.querySelector('#button-list');
var cityList = [];
var apiKey = '53f33f9772ec66c7ccfbcf166501533a';

//search function to make API call by city name, return data, and change variable values 
// alert if city name is not valid
renderCities();

function submitCity(event) {
  event.preventDefault();
  cityName = cityNameEl.value.trim();
  if (cityName) {
    getCurrentWeather(cityName);
    cityList.unshift(cityName);
    if (cityList.length > 5) {
      cityList.pop();
    }
    console.log(cityList);
    storeCities();
    cityNameEl.value = '';

  }
}

searchForm.addEventListener('submit', submitCity);

function getCurrentWeather(city) {
  console.log('It was rainy it was cold... West ' + city + ' was no place for a 12 year old.')
  var currentUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey;
  

  fetch(currentUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);

          var lon = data.coord.lon;
          var lat = data.coord.lat;
          getForecast(lat, lon);

          document.querySelector('#city-date').textContent = data.name + ' ' + moment(data.dt * 1000).format('MM/DD/YYYY');
          document.querySelector('#wicon').setAttribute('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
          document.querySelector('#wicon').setAttribute('alt', data.weather[0].description);
        
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
    
  }
}


//store cities function to push city to an array and store array in local storage
function storeCities() {
  localStorage.setItem('savedCities', JSON.stringify(cityList));
 resetButtons();

}
function resetButtons() {
  buttonList.children[0].innerHTML = '';
  buttonList.children[1].innerHTML = '';
  buttonList.children[2].innerHTML = '';
  buttonList.children[3].innerHTML = '';
  buttonList.children[4].innerHTML = '';
  renderCities();
}
function renderCities() {
  var cityButtons = JSON.parse(localStorage.getItem('savedCities'));
  if (cityButtons !== null) {
    cityList = cityButtons;
    console.log(cityButtons);
    for (i = 0; i< cityButtons.length; i++) {
      var newButton = document.createElement('button');
      newButton.setAttribute('class', 'btn btn-primary');
      newButton.textContent = cityButtons[i];
      newButton.addEventListener('click', function(event){
        getCurrentWeather(event.target.textContent);
      });
      buttonList.children[i].appendChild(newButton);

    }

    }
  }

//renderCities function to pull array from storage and print city buttons below search bar



