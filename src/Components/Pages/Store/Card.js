import React from 'react';
import './Card.css';
import { CardMedia, Button } from '@mui/material';
import { FaCartShopping } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Card({ product, onAddProduct }) {

  const sliderSettings = {
    dots: true,        
    infinite: true,    
    speed: 500,       
    slidesToShow: 1,   
    slidesToScroll: 1, 
    autoplay: false,   
    arrows: true,      
  };

  const clickHandler = (id) => {
    console.log(id);
    onAddProduct(id);
  };

  const descriptionList = Array.isArray(product.des) ? product.des : [product.des];

  return (
    <div className="card">
      <div className="product-slider">
        {product.hasSlider && product.images.length > 1 ? (
          <Slider {...sliderSettings} className='card-slider'>
            {product.images.map((img, index) => (
              <div key={index} className="slide">
                <img src={img} alt={`${product.title} - ${index}`} />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="single-image">
            <img src={product.images[0]} alt={product.title} />
          </div>
        )}
      </div>

      <div className="container">
        <h4 className='title'><b>{product.title}</b></h4>
        
        <ul className="description">
          {descriptionList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <Button style={{ color: "#ff6700" }} onClick={() => clickHandler(product.id)}>
          <FaCartShopping className='shop-icon' /> Add to Cart
        </Button>

        <span className='price-style'>
          ${product.price}.00
        </span>
      </div>
    </div>
  );
}
