//Example fetch using pokemonapi.co
document.querySelector('.button').addEventListener('click', getFetch)
const key= '5h8uKuPcRyXpKJI8OjWPtyWDipjxATaB';


function getFetch(){
  const hourlyForecast='https://api.weather.gov/gridpoints/LOT/75,72/forecast/hourly';
  const forecast = 'https://api.weather.gov/gridpoints/LOT/75,72/forecast';
  
  fetch(hourlyForecast)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        document.querySelector('.currentTemp').innerText=data.properties.periods[0].temperature
        document.querySelector('.shortForecast').innerText=data.properties.periods[0].shortForecast
        document.querySelector('#humidity').innerText=data.properties.periods[0].relativeHumidity.value
        document.querySelector('#chanceOfRain').innerText=data.properties.periods[0].relativeHumidity.value
        

      })
      .catch(err => {
          console.log(`error ${err}`)
      });

      fetch(forecast)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        document.querySelector('.detailedForecast').innerText=data.properties.periods[0].detailedForecast
        if (data.properties.periods[0].probabilityOfPrecipitation.value== null){
          document.querySelector('#chanceOfRain').innerText=0
        }else document.querySelector('#chanceOfRain').innerText=data.properties.periods[0].probabilityOfPrecipitation.value
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
getFetch()



