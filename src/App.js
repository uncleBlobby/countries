import axios from 'axios';
import { useState, useEffect } from 'react';

import Results from './components/Results';


const App = () => {

  const [searchTarget, setSearchTarget] = useState('');
  const [countries, setCountries] = useState([]);
  const [results, setResults] = useState(countries);

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
  console.log(countries);

  const refineResults = (results, searchTarget) => {
    if (searchTarget === '') {
      setResults(results);
    }
    setResults(results.filter(country => country.name.toLowerCase().includes(searchTarget.toLowerCase())));
  }
  

  return (
    <div className="App">
    <form onSubmit={handleSubmit}>
      search countries:
      <input
        onChange={handleInputChange}  
     />
    </form>
    <Results results={results} />
    </div>
  );
}

export default App;
