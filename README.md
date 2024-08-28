# Weather App

This Weather App fetches and displays weather forecasts, the current time, and top news headlines. The app is built using JavaScript and relies on external APIs to provide up-to-date information.

## Features

- **Hourly Weather Forecast:** Displays the current temperature and short forecast.
- **Detailed Weather Forecast:** Shows detailed weather information including the high temperature and chance of rain.
- **Current Time:** Fetches and displays the current date and time.
- **Top News:** Displays the latest news headline with a link to the full article.

## How It Works

### 1. WeatherFetcher Classs

The `WeatherFetcher` class is the core of this app. It handles fetching data from various APIs and updating the DOM with the retrieved information.

#### Constructor

```javascript
constructor(hourlyForecastUrl, forecastUrl, timeUrl, newsUrl)
hourlyForecastUrl: URL to fetch the hourly weather forecast.
forecastUrl: URL to fetch the detailed weather forecast.
timeUrl: URL to fetch the current time.
newsUrl: URL to fetch the latest news headlines.

Methods
fetchWeatherData(): Calls all the other methods to fetch weather, time, and news data.
fetchHourlyForecast(): Fetches and displays the current temperature and short forecast. Updates the weather icon based on the forecast.
fetchForecast(): Fetches and displays detailed weather information including the high temperature and chance of rain.
fetchTime(): Fetches and displays the current date and time.
fetchNews(): Fetches and displays the latest news headline with a link to the full article.
```

### 2. API URLs
The app uses the following APIs:

Weather API: National Weather Service API for hourly and detailed weather forecasts.
Time API: World Time API for fetching the current time.
News API: The News API for fetching top news headlines.

### 3. Event Listener
An event listener is attached to a button in the DOM, allowing users to manually fetch and refresh the data by clicking the button.
```javascript
document.querySelector('.button').addEventListener('click', () => weatherFetcher.fetchWeatherData());
```

The weather data is also fetched automatically when the page loads by calling 
```javascript
fetchWeatherData().
```

### 4. Usage
To use the app:

Clone or download the repository.
Open index.html in your browser.
The weather data, time, and news will be fetched and displayed automatically on page load. You can also click the button to refresh the data.
