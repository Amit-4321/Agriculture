import React from 'react';
import './BrandPage3.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Brand3 = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleExploreClick = () => {
    navigate('/brand3-products');
  };

  return (
    <div className="brand-page-container">
      <div className="brand-card">
        <h2 className="brand-heading">{t("brand3.heading")}</h2>
        <img src="./images/Rasi Seeds.jpg" alt="Rasi Logo" className="brand-logo" />
        <div className="brand-details">
          <p>{t("brand3.line1")}</p>
          <p>{t("brand3.line2")}</p>
          <p>{t("brand3.line3")}</p>
        </div>
        <button className="explore-btn" onClick={handleExploreClick}>
          {t("brand3.explore")}
        </button>
      </div>
    </div>
  );
};

export default Brand3;
