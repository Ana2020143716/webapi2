import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import './SearchBar.css';
export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");
  
    const fetchData = (value) => {
      fetch(`https://www.europeana.eu/api/v2/search.json?wskey=amotians&query=${value}`)
        .then((response) => response.json())
        .then(json => {
          if (json && json.items) {
            const results = json.items
              .filter(item => item.title && item.title[0].toLowerCase().includes(value.toLowerCase()))
              .map(item => ({
                title: item.title[0],
                provider: item.provider[0],
                edmPreview: item.edmPreview[0],
                // Add other properties you want to include
              }));
  
            setResults(results);
          } else {
            setResults([]);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setResults([]);
        });
    };
  
    const handleChange = (value) => {
      setInput(value);
      fetchData(value);
    };
  
    return (
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input 
          placeholder="Search for title..." 
          value={input} 
          onChange={(e) => handleChange(e.target.value)} 
        />
      </div>
    );
  };
  