import React from 'react';
import './BrandPage1.css';
import { useNavigate } from 'react-router-dom';

const Brand1 = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/brand1-products');
  };

  return (
    <div className="brand-page-container">
    <div className="brand-card">
      <h2 className="brand-heading">🌿 Mahyco (Maharashtra Hybrid Seeds Company)</h2>
      <img src="./images/mahyco.PNG" alt="Mahyco Logo" className="brand-logo" />
      <div className="brand-details">
        <p>🌱 Pioneer in hybrid seeds.</p>
        <p>🌾 Specializes in cotton, wheat, rice, and vegetables.</p>
        <p>🧬 Innovation in Bt cotton seeds.</p>
      </div>
      <button className="explore-btn" onClick={handleExploreClick}>
        Explore Products
      </button>
    </div>
  </div>
  );  
};

export default Brand1;
