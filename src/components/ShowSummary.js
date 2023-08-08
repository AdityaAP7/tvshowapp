import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ShowSummary.css'; // Import the CSS file

const ShowSummary = () => {
  const { id } = useParams();
  const [showSummary, setShowSummary] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [bookingStatus, setBookingStatus] = useState(null);

  useEffect(() => {
    fetchShowSummary();
  }, []);

  useEffect(() => {
    // Check if user details are stored in local storage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      if (parsedUserData.name === formData.name && parsedUserData.email === formData.email) {
        setBookingStatus('alreadyBooked');
      } else {
        setBookingStatus(null);
      }
    }
  }, [formData]);

  const fetchShowSummary = async () => {
    try {
      const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
      setShowSummary(response.data);
    } catch (error) {
      console.error('Error fetching show summary:', error);
    }
  };

  const handleBookTicket = () => {
    setShowBookingForm(true);
    setBookingStatus(null); // Reset booking status
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Store the form data in local storage
    localStorage.setItem('userData', JSON.stringify(formData));
    setShowBookingForm(false);
    setBookingStatus('successfullyBooked');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <div className="show-summary-container">
      {showSummary ? (
        <>
          <h2>{showSummary.name}</h2>
          <p className="genres">Genres: {showSummary.genres.join(', ')}</p>
          <p>Status: {showSummary.status}</p>
          <p>Average Rating: {showSummary.rating?.average}</p>
          <img className="show-image" src={showSummary.image?.medium} alt={showSummary.name} />
          <p className="summary">{showSummary.summary}</p>
          <button className="book-ticket-btn" onClick={handleBookTicket}>
            Book a Ticket
          </button>

          {showBookingForm && (
            <form className="booking-form" onSubmit={handleFormSubmit}>
              <h3>Book a Ticket for {showSummary.name}</h3>
              <div className="form-field">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          )}

{bookingStatus === 'alreadyBooked' && (
            <p className="booking-status">Already booked from this account.</p>
          )}
          {bookingStatus === 'successfullyBooked' && (
            <p className="booking-status">Successfully booked!</p>
          )}


          {/* Additional information from API response */}
          <div className="additional-info">
            <h4>Additional Information</h4>
            <p>Language: {showSummary.language}</p>
            <p>Runtime: {showSummary.runtime} minutes</p>
            <p>Premiered: {showSummary.premiered}</p>
            <p>Official Site: {showSummary.officialSite}</p>
            <p>Network: {showSummary.network?.name}</p>
            <p>Country: {showSummary.network?.country?.name}</p>
            {/* Add more details as needed */}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowSummary;
