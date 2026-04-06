import React from 'react';
import './BrandPage2.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Brand2 = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleExploreClick = () => {
    navigate('/brand2-products');
  };

  return (
    <div className="brand-page-container">
      <div className="brand-card">
        <h2 className="brand-heading">{t("brand2.heading")}</h2>
        <img src="./images/Nuziveedu Seeds.jpg" alt="Nuziveedu Logo" className="brand-logo" />
        <div className="brand-details">
          <p>{t("brand2.line1")}</p>
          <p>{t("brand2.line2")}</p>
          <p>{t("brand2.line3")}</p>
        </div>
        <button className="explore-btn" onClick={handleExploreClick}>
          {t("brand2.explore")}
        </button>
      </div>
    </div>
  );
};

export default Brand2;
