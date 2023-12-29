import { useState } from 'react';

import { SearchBar } from './components/SearchBar.js';

import { SearchResultsList } from './components/SearchResultsList.js';

import { SearchByCountry } from './components/SearchByCountry.js';

import './App.css';

function App() {

  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <div className="search-bar-container">
         <SearchBar setResults={setResults}/>
 
          
<SearchResultsList results={results}/>

<SearchByCountry></SearchByCountry>
      </div>
    </div>
  );
}

export default App;
