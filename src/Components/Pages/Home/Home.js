import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

import Button from "../../Base/Button";

export default function Home() {
  return (
    <div className="home-style">
      <div className="home-parent">
        <div className="home-info">
          <div className="left">
            <h2 className="welcome-header">Welcome to VaporNest</h2>
            <h2 className="introduction">Discover Your Vape Experience!</h2>
            <p>
              Discover our exclusive range of premium vape and pod products,
              thoughtfully crafted to elevate your experience and suit your
              unique style.
            </p>
            <div className="cta-container">
              <Button baseVariant="cta">
                <Link className="link" to="/products">
                  Browse Products
                </Link>
              </Button>
              <Button baseVariant="cta">
                <Link className="link" to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
