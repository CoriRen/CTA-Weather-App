//Example fetch using pokemonapi.co
document.querySelector('.button').addEventListener('click', getFetch)
const key= '5h8uKuPcRyXpKJI8OjWPtyWDipjxATaB';


function getFetch(){
  const url = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/348308?apikey=%095h8uKuPcRyXpKJI8OjWPtyWDipjxATaB'
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data.DailyForecasts[0])
        document.querySelector('.currentTemp').innerText=data.DailyForecasts[0].Temperature.Maximum[0]

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
getFetch()



