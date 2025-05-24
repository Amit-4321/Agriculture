import React from 'react';
import './BrandPage3.css';
import { useNavigate } from 'react-router-dom';


 
const Brand3 = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/brand3-products');
  };

  return (
    <div className="brand-page-container">
    <div className="brand-card">
      <h2 className="brand-heading">🌿 Rasi Seeds</h2>
      <img src="./images/Rasi Seeds.jpg" alt="Rasi Logo" className="brand-logo" />
      <div className="brand-details">
        <p>Famous for cotton, maize, paddy, and vegetables.</p>
        <p>Trusted especially in South India..</p>
        <p>Advanced biotech use.</p>
      </div>
      <button className="explore-btn" onClick={handleExploreClick}>
        Explore Products
      </button>
    </div>
  </div>
  );
};

export default Brand3;
