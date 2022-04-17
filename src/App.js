import { useState, useEffect } from 'react';


const App = () => {

  const [searchTarget, setSearchTarget] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`submitted ${event.target}`);
  }
  
  const handleInputChange = (event) => {
    console.log(event.target.value);
    setSearchTarget(event.target.value);
  }
  

  return (
    <div className="App">
    <form onSubmit={handleSubmit}>
      search countries:
      <input
        onChange={handleInputChange}  
     />
    </form>
    </div>
  );
}

export default App;
