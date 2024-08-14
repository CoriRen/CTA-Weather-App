// Define a class to handle fetching weather and time data
class WeatherFetcher {
  constructor(hourlyForecastUrl, forecastUrl, timeUrl) {
    this.hourlyForecastUrl = hourlyForecastUrl;
    this.forecastUrl = forecastUrl;
    this.timeUrl = timeUrl;
  }

  fetchWeatherData() {
    this.fetchHourlyForecast();
    this.fetchForecast();
    this.fetchTime();
  }

  fetchHourlyForecast() {
    fetch(this.hourlyForecastUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        document.querySelector('.currentTemp').innerText = data.properties.periods[0].temperature;
        document.querySelector('.shortForecast').innerText = data.properties.periods[0].shortForecast;
        document.querySelector('#humidity').innerText = data.properties.periods[0].relativeHumidity.value;
      })
      .catch(err => {
        console.log(`error ${err}`);
      });
  }

  fetchForecast() {
    fetch(this.forecastUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        document.querySelector('.detailedForecast').innerText = data.properties.periods[0].detailedForecast;
        const chanceOfRain = data.properties.periods[0].probabilityOfPrecipitation.value ?? 0;
        document.querySelector('#chanceOfRain').innerText = chanceOfRain;
        document.querySelector('#highTemp').innerText=data.properties.periods[0].temperature;
      })
      .catch(err => {
        console.log(`error ${err}`);
      });
  }

  fetchTime() {
    fetch(this.timeUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      
      })
      .catch(err => {
        console.log(`error ${err}`);
      });
  }
}

// Instantiate the WeatherFetcher class with the URLs
const weatherFetcher = new WeatherFetcher(
  'https://api.weather.gov/gridpoints/LOT/75,72/forecast/hourly',
  'https://api.weather.gov/gridpoints/LOT/75,72/forecast',
  'https://timeapi.io/api/Time/current/zone?timeZone=America/Chicago'
);

// Set up event listener on the button
document.querySelector('.button').addEventListener('click', () => weatherFetcher.fetchWeatherData());

// Optionally, call the fetchWeatherData method on page load
weatherFetcher.fetchWeatherData();
