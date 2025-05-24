import React, { useState, useRef } from 'react';
import './SeasonWise.css';

const crops = {
  kharif: {
    title: "Kharif Crops",
    images: [
      "/rice.jpeg",      // First image for Kharif
      "/millet.jpeg",     // Second image for Kharif
      "/cotton.jpeg"     // Third image for Kharif
    ],
    description: [
      "Sown at the beginning of the monsoon.",
      "Harvested at the end of the monsoon.",
      "Major crops: Rice, Jowar, Bajra, Cotton."
    ]
  },
  rabi: {
    title: "Rabi Crops",
    images: [
      "/wheat.jpeg",     // First image for Rabi
      "/Peas.jpeg",    // Second image for Rabi
      "/sarso.jpeg"    // Third image for Rabi
    ],
    description: [
      "Sown in winter (October-November).",
      "Harvested in spring (March-April).",
      "Major crops: Wheat, Barley, Mustard."
    ]
  },
  zaid: {
    title: "Zaid Crops",
    images: [
      "/Bitter Gourd.jpeg",  // First image for Zaid
      "/Cucumber.jpeg",    // Second image for Zaid
      "/Watermelon.jpeg"    // Third image for Zaid
    ],
    description: [
      "Grown between Rabi and Kharif seasons.",
      "Short-duration summer crops (March-June).",
      "Major crops: Watermelon, Cucumber, Muskmelon."
    ]
  }
};

const SeasonWise = () => {
  const [selected, setSelected] = useState(null);
  const descRefs = useRef({});

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
      <h2 className="season-heading">Crop Seasons in India</h2>

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