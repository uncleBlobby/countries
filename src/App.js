import axios from 'axios';
import { useState, useEffect } from 'react';

import Results from './components/Results';


const App = () => {

  const [searchTarget, setSearchTarget] = useState('');
  const [countries, setCountries] = useState([]);
  const [results, setResults] = useState(countries);

  const [chosenCountry, setChosenCountry] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`submitted ${event.target}`);
  }
  
  const handleInputChange = (event) => {
    console.log(event.target.value);
    setSearchTarget(event.target.value);
    refineResults(countries, searchTarget);
  }

  const LoadCountryData = () => {
    console.log('hook');
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data);
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
      />
    </div>
  );
}

export default App;
