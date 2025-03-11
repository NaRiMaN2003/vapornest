import React, { useState, useEffect } from 'react';
import './Brands.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import brands from './BrandsData';

export default function Brands() {
  const [activeBrand, setActiveBrand] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < brands[activeBrand].description.length) {
        setDisplayedText((prev) => prev + brands[activeBrand].description[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30); 
    return () => {
      clearInterval(interval);
      setDisplayedText('');
    };
  }, [activeBrand]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        (prev + 1) % brands[activeBrand].gallery.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [activeBrand]);

  const handleBrandClick = (index) => {
    setActiveBrand(index);
    setCurrentImage(0); 
  };

  return (
    <div className="brands-page">
      <section className="brands-section">
        <h2>Our Top Brands</h2>
        <div className="slider-wrapper">
          <Slider {...sliderSettings} className="brands-slider">
            {brands.map((brand, index) => (
              <div
                key={brand.name}
                className={`brand-card ${index === activeBrand ? 'active' : ''}`}
                onClick={() => handleBrandClick(index)}
              >
                <div className="brand-image-container">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="brand-logo"
                  />
                  <div className="brand-info">
                    <h3>{brand.name}</h3>
                    <p>{brand.specialty}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <div className="brands-details">
        <div className="brands-description">
          <h2>{brands[activeBrand].name}</h2>
          <p>{displayedText}</p>
        </div>
        <div className="brands-gallery">
          <img
            src={brands[activeBrand].gallery[currentImage]}
            alt={`${brands[activeBrand].name} gallery`}
            className="gallery-image"
          />
        </div>
      </div>
    </div>
  );
}
