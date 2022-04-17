import React from 'react';


const NoResults = () => {
    return (
        <div>
            No results found
        </div>
    )
}

const TooManyResults = () => {
    return (
        <div>
            Too many results. Please be more specific.
        </div>
    )
}

const CountryData = ( {country} ) => {
    console.log(country);
    return (
        <div>
                <h1>{country.name}</h1>
                <img src={country.flags.png} alt="flag"></img>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <h2>Languages</h2>
                <ul>
                    {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
                </ul>
        </div>
    )
}

const Results = ( {results, chosenCountry, setChosenCountry, listenToButton, loadWeatherData } ) => {


    const showChosenCountry = (country, results) => {
        const chosenCountry = results.filter(result => result.name === country);
        setChosenCountry(chosenCountry[0]);
        listenToButton(chosenCountry[0]);

    }

    if (results.length === 0) {
        return (
            <NoResults />
        )
    }
    if (results.length > 10) {
        return (
            <TooManyResults />
        )
    }
    if (results.length < 10 && results.length > 1) {
        return (
            <div>
                Results: {results.length}
                {results.map(country => <p key={country.name}>{country.name}<button onClick={()=> showChosenCountry(country.name, results)}>show</button></p>)}
                
            </div>
        )
    } if (results.length === 1) {
        setChosenCountry(results[0]);
        return (
            <div>
                <CountryData country={chosenCountry}/>
            </div>
        )
    }
}


export default Results;