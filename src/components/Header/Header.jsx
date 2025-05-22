// src/components/Header.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./Header.css";

const Header = () => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Preload the background image
  useEffect(() => {
    const img = new Image();
    img.src = "../../assets/header.png"; // Main image
    img.onload = () => setIsImageLoading(false); // Hide loader when image loads
    img.onerror = () => setIsImageLoading(false); // Hide loader on error

    // Preload mobile image if needed
    const mobileImg = new Image();
    mobileImg.src = "../../assets/header-mobile.png";
  }, []);

  return (
    <>
      {isImageLoading && <Loader />}
      <div
        className={`p-5 mb-4 bg-light rounded-3 mt-1 header ${
          isImageLoading ? "hidden" : ""
        }`}
      >
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Savor the Flavors You Crave</h1>
          <p className="col-md-8 fs-4">
            Dive into Hyderabad’s finest culinary delights.
          </p>
          <Link to="/explore" className="btn btn-size">
            Browse Menu
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;