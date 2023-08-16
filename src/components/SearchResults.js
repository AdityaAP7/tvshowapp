// SearchResults.js
import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <ul>
        {results.map((show) => (
          <li key={show.id}>
            <Link to={`/shows/${show.id}`}>{show.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;

//ok
