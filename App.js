const getWeather = () => {
  let inp = document.getElementById('inputCity').value
  
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=b9a19d23d6cf2eb624e5529ab42acecb`)
    .then(({ data }) => {
      console.log(data)
      console.log(data.weather[0])
      let elem = document.createElement('li')
      elem.innerHTML = data.name
      elem.className = "list-group-item"
      document.getElementById('cities').append(elem)

      document.getElementById('title').innerHTML = data.name
      document.getElementById('main').innerHTML = `Weather: ${data.weather[0].main}`
      document.getElementById('temp').innerHTML = `Temperature: ${data.main.temp}`
      document.getElementById('wind').innerHTML = `Wind speed: ${data.wind.speed} mph`

      saveCities()
    })
    .catch(e => console.error(e))
}

const getWeatherFromSaved = (city) => {
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b9a19d23d6cf2eb624e5529ab42acecb`)
    .then(({ data }) => {
      document.getElementById('title').innerHTML = data.name
      document.getElementById('main').innerHTML = `Weather: ${data.weather[0].main}`
      document.getElementById('temp').innerHTML = `Temperature: ${data.main.temp}`
      document.getElementById('wind').innerHTML = `Wind speed: ${data.wind.speed} mph`
    })
    .catch(e => console.error(e))
}

document.getElementById('btn').addEventListener('click', () => {
  getWeather()
})

const saveCities = () => {
  let cities = document.getElementById('cities').innerHTML
  localStorage.setItem('savedCities', JSON.stringify(cities))
}

const populateCities = () => {
  let saved = localStorage.getItem('savedCities')
  document.getElementById('cities').innerHTML = saved.slice(1, saved.length - 1).replace(/\\/g, "")
}

populateCities()

const makeThemClick = () => {
  let clickieCities = document.getElementsByClassName('list-group-item')
  console.log(Array.from(clickieCities))
  Array.from(clickieCities).forEach(city => {
    city.addEventListener('click', () => {
      Array.from(clickieCities).forEach(unclick => {
        unclick.className="list-group-item"
      })
      city.className = "list-group-item active"
      getWeatherFromSaved(city.textContent)
    })
  })
}

makeThemClick()