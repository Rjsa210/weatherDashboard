//search function to make API call by city name, return data, and change variable values 
// alert if city name is not valid
function submitCities(event) {
  event.preventDefault();
  var city = $('#city-name-search').value.trim();
  var currentURL = 'api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=53f33f9772ec66c7ccfbcf166501533a';
  var forecastURL = 'api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&cnt=5&appid=53f33f9772ec66c7ccfbcf166501533a';
  console.log(city);
}

var citySearch = $('#city-search').on.('submit', submitCities());
//store cities function to store city to an array in local storage

//renderCities function to print city buttons below search bar

//rendercurrent function to print relevant information to the current block

//renderforecast function to print forcast to the forecast block assuming for loop if returned as array






