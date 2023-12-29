import React from "react";
import './SearchResultsList.css';

export const SearchResultsList = ({ results }) => {
    return (
        <div className="results-list">
            {
                results && Array.isArray(results) &&
                results.map((result, id) => (
                    <div key={id}>
                        <p>Title: {result.title}</p>
                        <img src={result.edmPreview} alt={result.title} />
                        <p>Provider: {result.provider}</p>
                        {/* Add additional properties as needed */}
                    </div>
                ))
            }
        </div>
    );
};
