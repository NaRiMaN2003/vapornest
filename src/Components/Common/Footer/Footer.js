import React from 'react';
import './Footer.css';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <div className="footer-left">
            <h4>About Us</h4>
            <a href="/home">VaporNest Subject</a>
            <a href="/brands">Our Brands</a>
          </div>
          <div className="footer-right">
            <a href="/products">Shopping Page</a>
            <a href="/about">Our Collaborations</a>
          </div>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a 
              href="https://www.instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a 
              href="https://www.twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 VaporNest. All rights reserved.</p>
      </div>
    </footer>
  );
}
