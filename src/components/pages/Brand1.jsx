import React from 'react';
import './BrandPage1.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Brand1 = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleExploreClick = () => {
    navigate('/brand1-products');
  };

  return (
    <div className="brand-page-container">
      <div className="brand-card">
        <h2 className="brand-heading">{t("brand1.heading")}</h2>
        <img src="./images/Mahyco.jpg" alt="Mahyco Logo" className="brand-logo" />
        <div className="brand-details">
          <p>{t("brand1.line1")}</p>
          <p>{t("brand1.line2")}</p>
          <p>{t("brand1.line3")}</p>
        </div>
        <button className="explore-btn" onClick={handleExploreClick}>
          {t("brand1.explore")}
        </button>
      </div>
    </div>
  );
};

export default Brand1;
