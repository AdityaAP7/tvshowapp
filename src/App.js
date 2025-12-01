654321import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import ShowList from './components/ShowList';
import ShowSummary from './components/ShowSummary';
import SearchResults from './components/SearchResults';
import './components/Navbar.css';
import Footer from './components/Footer';
//Changed the theme


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the menu

  const handleSearch = async () => {
    console.log('Searching for:', searchQuery);
    try {
      const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchQuery}`);
      console.log('Search results:', response.data);
      setSearchResults(response.data.map(result => result.show));
    } catch (error) {
      console.error('Error searching shows:', error);
      setSearchResults([]);
    }
  };

  return (
    <Router>
      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        <ul className="navbar-nav left-links">
          <Link to="/" className="navbar-brand">
            TV Shows App
          </Link>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Hamburger icon for mobile menu */}
        <div className="navbar-hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></div>
          <div className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></div>
          <div className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></div>
        </div>

        <div className={`navbar-search ${isMenuOpen ? 'active' : ''}`}>
          <input
            type="text"
            placeholder="Search shows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <ul className={`navbar-nav right-links ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Watchlist
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Sign In
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/shows/:id" element={<ShowSummary />} />
        <Route path="/search" element={<SearchResults results={searchResults} />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
