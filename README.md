# unit06_WeatherDashboard

In this assignment we were instructed to create a website that displays current weather conditions and a 5 day forecast for a city upon submission. this was to be done by utilizing the Open Weather Map API.

The weather dashboard functions as follows.
1. the value of a text input is sent as a search parameter [figure_1](assets/screenshots/1.jpg)[figure_2](./assets/screenshots/2.jpg)
1. Upon submission of the city, current weather is displayed as well as a 5 day forecast. The city name is placed at the front of an array in local storage, the array is pulled from local storage and a button is created under the search bar for each index of the array. [figure_3](./assets/screenshots/3.jpg)[figure_4](./assets/screenshots/4.jpg)
1. If a city button is clicked, it acts just as if the city was submitted through the search bar, and current weather and forecast is displayed. If more than 6 cities are present in the array, the oldest value is popped. [figure_5](./assets/screenshots/5.jpg)

The Website can be viewed here [unit6_WeatherDashboard](https://rjsa210.github.io/weatherDashboard/)