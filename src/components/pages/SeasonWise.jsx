import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './SeasonWise.css';

const SeasonWise = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);
  const descRefs = useRef({});

  const crops = {
    kharif: {
      title: t("season.kharif.title"),
      images: [
        "/rice.jpeg",
        "/millet.jpeg",
        "/cotton.jpeg"
      ],
      description: [
        t("season.kharif.desc1"),
        t("season.kharif.desc2"),
        t("season.kharif.desc3")
      ]
    },
    rabi: {
      title: t("season.rabi.title"),
      images: [
        "/wheat.jpeg",
        "/Peas.jpeg",
        "/sarso.jpeg"
      ],
      description: [
        t("season.rabi.desc1"),
        t("season.rabi.desc2"),
        t("season.rabi.desc3")
      ]
    },
    zaid: {
      title: t("season.zaid.title"),
      images: [
        "/Bitter Gourd.jpeg",
        "/Cucumber.jpeg",
        "/Watermelon.jpeg"
      ],
      description: [
        t("season.zaid.desc1"),
        t("season.zaid.desc2"),
        t("season.zaid.desc3")
      ]
    }
  };

  const handleSelect = (season) => {
    setSelected(season);
    setTimeout(() => {
      descRefs.current[season]?.scrollIntoView({ 
        behavior: "smooth",
        block: "nearest"
      });
    }, 100);
  };

  return (
    <div className="season-container">
      <h2 className="season-heading">{t("season.heading")}</h2>

      <div className="season-content">
        <div className="season-links">
          {Object.keys(crops).map((season) => (
            <button
              key={season}
              className={`season-link ${selected === season ? 'active' : ''}`}
              onClick={() => handleSelect(season)}
            >
              {crops[season].title}
            </button>
          ))}
        </div>

        <div className="season-card-area">
          {Object.keys(crops).map((season) => (
            <div key={season} className="season-card-box">
              <div
                className="season-card"
                onClick={() => handleSelect(season)}
              >
                <h3>{crops[season].title}</h3>
                <div className="card-images">
                  {crops[season].images.map((image, index) => (
                    <img 
                      key={index} 
                      src={image} 
                      alt={`${season} crop ${index + 1}`} 
                    />
                  ))}
                </div>
              </div>

              {selected === season && (
                <div 
                  className="season-description"
                  ref={el => descRefs.current[season] = el}
                >
                  <h3>{crops[season].title}</h3>
                  <ul>
                    {crops[season].description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonWise;