import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import './SearchBar.css';

export const SearchByCountry = ({ setResults, titleSearch }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch unique countries when component mounts
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    setLoading(true);
    setError(null);

    fetch("https://www.europeana.eu/api/v2/search.json?wskey=amotians&query=art")
      .then((response) => response.json())
      .then(json => {
        if (json && json.items) {
          const uniqueCountries = Array.from(
            new Set(json.items.map(item => item.country && item.country[0]))
          ).filter(country => country);
          setCountries(uniqueCountries);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        setCountries([]);
        setError(error);
        setLoading(false);
      });
  };

  const fetchResults = (title, country) => {
    // Build the base URL
    let url = 'https://www.europeana.eu/api/v2/search.json?wskey=amotians';

    // Construct query parameters
    const queryParams = [];

    // Append title query parameter if title is specified
    if (title) {
      queryParams.push(`query=${title}`);
    }

    // Append country filter if country is specified
    if (country) {
      queryParams.push(`qf=country:${encodeURIComponent(country)}`);
    }

    // Add query parameters to the URL
    if (queryParams.length > 0) {
      url += `&${queryParams.join('&')}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then(json => {
        if (json && json.items) {
          const results = json.items.map(item => ({
            title: item.title[0],
            provider: item.provider[0],
            edmPreview: item.edmPreview[0],
            edmIsShownAt: item.edmIsShownAt[0],
            country: item.country[0],
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

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    fetchResults(titleSearch, country);
  };

  return (
    <select onChange={(e) => handleCountryChange(e.target.value)}>
      <option key="all" value="">All Countries</option>
      {loading && <option key="loading" value="" disabled>Loading Countries...</option>}
      {error && <option key="error" value="" disabled>Error Loading Countries</option>}
      {countries.map((country, index) => (
        <option key={index} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
};
