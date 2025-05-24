import React from 'react';
import './BrandPage2.css';
import { useNavigate } from 'react-router-dom';


const Brand2 = () => {
    const navigate = useNavigate();
  
    const handleExploreClick = () => {
      navigate('/brand2-products');
    };
  

  return (
    <div className="brand-page-container">
    <div className="brand-card">
      <h2 className="brand-heading">🌿 Nuziveedu Seeds Ltd</h2>
      <img src="./images/Nuziveedu Seeds Ltd.jpg" alt="Nuziveedu Logo" className="brand-logo" />
      <div className="brand-details">
        <p>🌱 One of India’s largest seed companies.</p>
        <p>Strong presence in cotton, maize, paddy, bajra, jowar.</p>
        <p>Good R&D facilities.</p>
      </div>
      <button className="explore-btn" onClick={handleExploreClick}>
        Explore Products
      </button>
    </div>
  </div>
  );
};

export default Brand2;
