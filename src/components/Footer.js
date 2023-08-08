import React from 'react';
import './Footer.css'; // Import the Footer CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} TV Shows App. All rights reserved.</p>
        <p>
          Designed and developed by <a href="https://adityapalodkarportfolio.netlify.app/">Aditya Palodkar</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
