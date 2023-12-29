import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import './SearchBar.css';

export const SearchByCountry = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch unique countries when component mounts
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    fetch("https://www.europeana.eu/api/v2/search.json?wskey=amotians&query=art")
      .then((response) => response.json())
      .then(json => {
        if (json && json.items) {
          const uniqueCountries = Array.from(
            new Set(json.items.map(item => item.country && item.country[0]))
          ).filter(country => country);
          setCountries(uniqueCountries);
        }
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        setCountries([]);
      });
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  return (

      <select onChange={(e) => handleCountryChange(e.target.value)}>
        <option key="all" value="">All Countries</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>

     
  );
};
