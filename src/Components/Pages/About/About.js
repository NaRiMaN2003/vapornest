import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-page">
      <div className="hero-section">
        <h1>About Vapornest</h1>
        <p>
          Welcome to <strong>Vapornest</strong>! As pioneers in the vape and pod industry, we are dedicated to bringing you the best products and experiences in the world of vaping.
        </p>
        <p>
          Founded in 2015, Vapornest started as a small initiative to make premium vaping products accessible to everyone. Over the years, we have grown into a global community of vapers, fostering innovation and sustainability in the industry.
        </p>
        <p>Discover the finest vaping brands and explore the world of premium experiences.</p>
      </div>
      <section className="mission-section">
        <h2>Our Mission Vision</h2>
        <p>
          At Vapornest, our mission is to empower vapers with exceptional products and services, ensuring a seamless and enjoyable vaping journey for every customer.
          We envision a world where vaping becomes the healthier and more sustainable alternative to traditional smoking. Vapornest aims to lead the charge in reshaping the vaping industry for the better.
        </p>
      </section>
      <section className="features-section">
        <h2>Why Choose Vapornest?</h2>
        <ul>
          <li>Wide variety of high-quality products</li>
          <li>Trusted by thousands of vapers worldwide</li>
          <li>Exceptional customer service and support</li>
          <li>Eco-friendly and innovative technologies</li>
        </ul>
      </section>
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-gallery">
          <div className="team-member">
            <img src="/img/about/john.jpg" alt="Team Member 1" />
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="/img/about/jane.jpg" alt="Team Member 2" />
            <h3>Jane Smith</h3>
            <p>Product Designer</p>
          </div>
          <div className="team-member">
            <img src="/img/about/sam.jpg" alt="Team Member 3" />
            <h3>Sam Brown</h3>
            <p>Marketing Specialist</p>
          </div>
        </div>
      </section>
      <div className="cta-section">
        <h2>Explore Our Products</h2>
        <p>Find your perfect vape today!</p>
        <button className="gotoshop-button">
          <Link className="link" to="/products">Shop Now</Link>
        </button>
      </div>
    </div>
  );
}
