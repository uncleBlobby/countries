import React from 'react';

const showChosenCountry = (country) => {
    console.log(`clicked`);
}

const CountryData = (country) => {
    return (
        <div>

        </div>
    )
}

const Results = ( {results} ) => {
    if (results.length === 0) {
        return (
            <div>
                No results found
            </div>
        )
    }
    if (results.length > 10) {
        return (
            <div>
                Too many results. Please be more specific.
            </div>
        )
    }
    if (results.length < 10 && results.length > 1) {
        return (
            <div>
                Results: {results.length}
                {results.map(country => <p key={country.name}>{country.name}<button onClick={()=> showChosenCountry()}>show</button></p>)}
                
            </div>
        )
    } else {
        const country = results[0];
        //console.log(country);
        //console.log(country.flags.png)
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
}

export default Results;