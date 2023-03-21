const Countries = ({ countries, handleClick}) => {
    if (countries.length === 1) {
        const country = countries[0]
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}</p>
                <h4>Languages: </h4>
                <ul>
                    {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
                </ul>
                <img src={country.flags.png}></img>
            </div>
        )
    }
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    return countries.map(country => <p key={country.name.common}>{country.name.common} <button onClick={() => handleClick(country)}>show</button></p>)
}

export default Countries