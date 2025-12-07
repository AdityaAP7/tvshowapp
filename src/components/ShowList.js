321import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ShowList.css'; // Import the CSS file

const API_URL = 'https://api.tvmaze.com/search/shows?q=all';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await axios.get(API_URL);
      setShows(response.data);
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  };
  //Started implementing the axios to fetch the data so we can use the interceptors

  return (
    <div>
      <h1>All Shows</h1>
      <ul className="show-list">
        {shows.map((show, index) => (
          <li key={show.show.id} className="show-card">
             <Link to={`/shows/${show.show.id}`} >
            <img className="show-image" src={show.show.image?.medium} alt={show.show.name} />
            </Link>
            <p className="rating">Rating: {show.show.rating?.average}</p>
            
            <Link to={`/shows/${show.show.id}`} className="show-name">
            {index + 1}{"."} {show.show.name}
            </Link>
            <p className="summary">
              {/* Truncate summary to show only the first 100 characters */}
              {show.show.summary?.slice(0, 100)}...
              <Link to={`/shows/${show.show.id}`} className="read-more">
                Read More
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
