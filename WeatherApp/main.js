// Class to fetch weather and time data
class WeatherFetcher {
  constructor(hourlyForecastUrl, forecastUrl, timeUrl, newsUrl) {
    this.hourlyForecastUrl = hourlyForecastUrl;
    this.forecastUrl = forecastUrl;
    this.timeUrl = timeUrl;
    this.newsUrl = newsUrl;
  }

  fetchWeatherData() {
    this.fetchHourlyForecast();
    this.fetchForecast();
    this.fetchTime();
    this.fetchNews();
  }

  fetchHourlyForecast() {
    fetch(this.hourlyForecastUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const shortForecast = data.properties.periods[0].shortForecast.toLowerCase();
        document.querySelector('.currentTemp').innerText = data.properties.periods[0].temperature;
        document.querySelector('.shortForecast').innerText = shortForecast
        if (shortForecast === 'sunny' || shortForecast === 'mostly sunny'){
          document.querySelector('.weatherIcon').style.backgroundImage = "url('assets/sunny.png')"
        }else if (String(shortForecast).includes('showers') ){
          document.querySelector('.weatherIcon').style.backgroundImage = "url('assets/rain-clouds.png')"
        }else if (String(shortForecast).includes('snow') ){
          document.querySelector('.weatherIcon').style.backgroundImage = "url('assets/snowfall.gif')"
        }else {
          document.querySelector('.weatherIcon').style.backgroundImage = "url('assets/Clouds.png')"
        }
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
        let currentDate = new Date(data.datetime).toLocaleDateString();
        document.querySelector('#currentDate').innerText = currentDate
        let currentTime = new Date(data.datetime).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
        document.querySelector('#currentTime').innerText = currentTime
        if( String(currentTime).includes('6:') ){
          document.querySelector('#high').textContent = "Low"
        }
      
      })
      .catch(err => {
        console.log(`error ${err}`);
      });
  }
  fetchNews() {

    fetch(this.newsUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        document.querySelector('#news').innerText = data.data[0].title;
        document.querySelector('#newsLink').setAttribute('href', data.data[0].url);
              
      })
      .catch(err => {
        console.log(`error ${err}`);
      });
  }

}

// API URLs
const weatherFetcher = new WeatherFetcher(
  'https://api.weather.gov/gridpoints/LOT/75,72/forecast/hourly',
  'https://api.weather.gov/gridpoints/LOT/75,72/forecast',
  'http://worldtimeapi.org/api/timezone/America/Chicago',
  'https://api.thenewsapi.com/v1/news/top?api_token=rl6kvZrVeyykAdeUYEcwR4RPa00bTCIXJWXeWEFC&locale=us&limit=3'
);

// Event listener on the button
document.querySelector('.button').addEventListener('click', () => weatherFetcher.fetchWeatherData());

// Call the fetchWeatherData method on page load
weatherFetcher.fetchWeatherData();
