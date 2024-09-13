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

        //Inserts current temp and short weather forecast
        const shortForecast = data.properties.periods[0].shortForecast.toLowerCase();
        const currentTemp = data.properties.periods[0].temperature;

        document.querySelector('.currentTemp').innerText = currentTemp
        document.querySelector('.shortForecast').innerText = shortForecast

        //Inserts forecast data into the hourly forecast grid 
        const futureTemp1 = data.properties.periods[2].temperature;
        const futureTemp2 = data.properties.periods[4].temperature;
        const futureTemp3 = data.properties.periods[6].temperature;
        const futureTemp4 = data.properties.periods[8].temperature;
        const futureTemp5 = data.properties.periods[10].temperature;

        document.querySelector('#futureTemp1').innerText = futureTemp1;
        document.querySelector('#futureTemp2').innerText = futureTemp2;
        document.querySelector('#futureTemp3').innerText = futureTemp3;
        document.querySelector('#futureTemp4').innerText = futureTemp4;
        document.querySelector('#futureTemp5').innerText = futureTemp5;

        //Inserts forecast start time into the forecast grid 
        const futureTime1 = data.properties.periods[2].startTime;
        const futureTime2 = data.properties.periods[4].startTime;
        const futureTime3 = data.properties.periods[6].startTime;
        const futureTime4 = data.properties.periods[8].startTime;
        const futureTime5 = data.properties.periods[10].startTime;

        document.querySelector('#futureTime1').innerText = new Date(futureTime1).toLocaleTimeString(navigator.language, { timeStyle: 'short'});
        document.querySelector('#futureTime2').innerText = new Date(futureTime2).toLocaleTimeString(navigator.language, { timeStyle: 'short'});
        document.querySelector('#futureTime3').innerText = new Date(futureTime3).toLocaleTimeString(navigator.language, { timeStyle: 'short'});
        document.querySelector('#futureTime4').innerText = new Date(futureTime4).toLocaleTimeString(navigator.language, { timeStyle: 'short'});
        document.querySelector('#futureTime5').innerText = new Date(futureTime5).toLocaleTimeString(navigator.language, { timeStyle: 'short'});

        //inserts chance of rain into forecast grid
        const futureRain1 = data.properties.periods[2].probabilityOfPrecipitation.value ?? 0;
        const futureRain2 = data.properties.periods[4].probabilityOfPrecipitation.value ?? 0;
        const futureRain3 = data.properties.periods[6].probabilityOfPrecipitation.value ?? 0;
        const futureRain4 = data.properties.periods[8].probabilityOfPrecipitation.value ?? 0;
        const futureRain5 = data.properties.periods[10].probabilityOfPrecipitation.value ?? 0;

        document.querySelector('#futureRain1').innerText = futureRain1;
        document.querySelector('#futureRain2').innerText = futureRain2;
        document.querySelector('#futureRain3').innerText = futureRain3;
        document.querySelector('#futureRain4').innerText = futureRain4;
        document.querySelector('#futureRain5').innerText = futureRain5;
    

        //Selects weather icon based on the shortForecast variable
        const weatherIcons = {
          sunny: "url('assets/sunny.png')",
          mostlySunny: "url('assets/partly-sunny.png')",
          showers: "url('assets/rain-clouds.png')",
          snow: "url('assets/snowfall.gif')",
          default: "url('assets/Clouds.png')"
        }
         
        let weatherIcon = weatherIcons['default'];

        if (shortForecast.includes('mostly sunny')){
         weatherIcon = weatherIcons['mostlySunny']

        } else if (shortForecast.includes('showers')){
          weatherIcon = weatherIcons['showers']

        } else if (shortForecast.includes('snow')){
          weatherIcon = weatherIcons['snow']

        }else if (shortForecast.includes('sunny')){
          weatherIcon = weatherIcons['Sunny']
        }

          document.querySelector('.weatherIcon').style.backgroundImage = weatherIcon
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

        //document.querySelector('.detailedForecast').innerText = data.properties.periods[0].detailedForecast;

        const chanceOfRain = data.properties.periods[0].probabilityOfPrecipitation.value ?? 0;
        
        const highTemp = data.properties.periods[0].temperature;

        document.querySelector('#chanceOfRain').innerText = chanceOfRain;

        document.querySelector('#highTemp').innerText= highTemp;

        document.querySelector('#period1').innerText= highTemp;


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
    
        let currentDate = new Date(data.datetime).toLocaleDateString(navigator.language, {weekday: 'long', month: 'long', day: 'numeric'});
        
        document.querySelector('#currentDate').innerText = currentDate;

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

// Call fetchWeatherData method on page load
weatherFetcher.fetchWeatherData();
