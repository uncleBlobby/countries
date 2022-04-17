import axios from 'axios';
import { useState, useEffect } from 'react';

import Results from './components/Results';


const App = () => {

  const [searchTarget, setSearchTarget] = useState('');
  const [countries, setCountries] = useState([]);
  const [results, setResults] = useState(countries);

  const [chosenCountry, setChosenCountry] = useState(null);

  const [weatherCondition, setWeatherCondition] = useState({});
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  }
  
  const handleInputChange = (event) => {
    setSearchTarget(event.target.value);
    refineResults(countries, searchTarget);
  }

  const LoadCountryData = () => {
    console.log('country data hook');
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }

  const LoadWeatherData = () => {
    console.log(`weather data hook`);
    // Query the OpenWeatherMap for geolocation data of chosen country's capital city.
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${results[0].capital},${results[0].cca2}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(response => {
        //console.log(`latitude: ${response.data[0].lat}`);
        //console.log(`longitude: ${response.data[0].lon}`);
        setLatitude(response.data[0].lat);
        setLongitude(response.data[0].lon);
      })
    // Query the OpenWeatherMap for weather data using geolocation data from above.
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(response => {
        //console.log(response.data);
        //console.log(response.data.weather);
        setWeatherCondition(
          {
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            description: response.data.weather[0].description,
            windSpeed: response.data.wind.speed,
            windDirection: response.data.wind.deg,
          }
        );
      })
  }

  useEffect(LoadCountryData, []);

  const refineResults = (results, searchTarget) => {
    if (searchTarget === '') {
      setResults(results);
    }
    setResults(results.filter(country => country.name.toLowerCase().includes(searchTarget.toLowerCase())));
  }

  const listenToButton = (country) => {
    console.log(`heard button click from App`)
    console.log(`heard country: ${country.name}`)
    setResults([country]);
  }

  /*
    BROKE WEATHER FUNCTION - NEED TO FIX
    ERROR 429 -- TOO MANY REQUESTS
    FIX: IMPLEMENT BUTTON TO COLLECT WEATHER DATA ON DEMAND
  

  if (results.length === 1) {
    LoadWeatherData();
  }
  */

  return (
    <div className="App">
    <form onSubmit={handleSubmit}>
      search countries:
      <input
        onChange={handleInputChange}  
     />
    </form>
    <Results 
      results={results} 
      chosenCountry={chosenCountry} 
      setChosenCountry={setChosenCountry}
      listenToButton={listenToButton}
      loadWeatherData={LoadWeatherData}
      />
    <button onClick={() => LoadWeatherData()}>Get Weather Data</button>
    <h2>Weather:</h2>
    <p>Current Conditions: {weatherCondition.description}</p>
    <p>Temperature: {weatherCondition.temperature}</p>
    <p>Humidity: {weatherCondition.humidity}</p>
    <p>Wind Speed: {weatherCondition.windSpeed}</p>
    </div>
  );
}

export default App;
