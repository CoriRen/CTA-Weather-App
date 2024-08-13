//Example fetch using pokemonapi.co
document.querySelector('.button').addEventListener('click', getFetch)
const key= '5h8uKuPcRyXpKJI8OjWPtyWDipjxATaB';


function getFetch(){
  const url = 'https://api.weather.gov/gridpoints/LOT/75,72/forecast'
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('.shortForecast').innerText=data.properties.periods[1].shortForecast
        document.querySelector('.currentTemp').innerText=data.properties.periods[0].temperature
        // document.querySelector('.details').innerText=data.properties.periods[0].detailedForecast
        // document.querySelector('.icon').src=data.properties.periods[0].icon
        // document.querySelector('.currentTemp').innerText=data.properties.periods[0].temperature
        // document.querySelector('.currentTemp').innerText=data.properties.periods[0].temperature
        // document.querySelector('.currentDate').innerText=data.properties.periods[0].temperature
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
getFetch()



