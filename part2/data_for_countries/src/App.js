import { useState, useEffect } from "react";
import axios from 'axios'
import Countries from "./components/Countries";
import Weather from "./components/Weather";

const REACT_APP_WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY

function App() {
  const [countries, setCountries] = useState([])
  const [countryData, setCountryData] = useState([])
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(res => {
      setCountryData(res.data)
    })
  }, [])

  useEffect(() => {
    if (countries.length === 1) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${countries[0].capital},${countries[0].cca2}&appid=${REACT_APP_WEATHER_API_KEY}&units=metric`)
        .then(res => {
          setWeather(res.data)
        })
    }
  }, [countries])

  const handleFindCountry = (event) => {
    const keyword = event.target.value

    if (keyword !== '') {
      const newCountries = countryData.filter(country => country.name.common.toLowerCase().includes(keyword.toLowerCase()))
      setCountries(newCountries)
    }
    else {
      setCountries([])
    }
  }

  const handleShow = (country) => {
    setCountries([country])
  }

  return (
    <div>
      <h3>Find countries: <input onChange={handleFindCountry}></input></h3>
      <Countries countries={countries} handleClick={handleShow} />
      {(countries.length === 1 && weather.main) ? <Weather country={countries[0]} weather={weather} /> : <></>}
    </div>
  );
}

export default App;
