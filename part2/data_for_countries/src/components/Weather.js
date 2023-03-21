const Weather = ({ country, weather }) => {
    console.log(weather)
    return (
        <div>
            <h3>Weather in {country.capital}</h3>
            <p>Temperature: {weather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
            <p>Wind: {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather