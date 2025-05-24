import React, { useState } from "react";
import "./MarketPrice.css";

const MarketPrice = () => {
  // Commodity Data with prices
  const commodityData = {
    Onion: { min: 1800, max: 3000, current: 1600 },
    Potato: { min: 900, max: 1600, current: 1300 },
    Tomato: { min: 1000, max: 2000, current: 1500 },
  };

  // State variables
  const [commodity, setCommodity] = useState("Onion");
  const [selectedPrice, setSelectedPrice] = useState(commodityData["Onion"]);
  const [selectedState, setSelectedState] = useState("Madhya Pradesh");
  const [selectedDistrict, setSelectedDistrict] = useState("Indore");
  const [selectedMarket, setSelectedMarket] = useState("Main Mandi");
  const today = new Date().toISOString().split("T")[0];
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);

  // Handle Go button click
  const handleGoClick = () => {
    setSelectedPrice(commodityData[commodity]);
  };

  // Generate marquee content dynamically
  const marqueeContent = Object.entries(commodityData)
    .map(([name, prices]) => (
      `${name} Max: ₹${prices.max}, Min: ₹${prices.min}, Current: ₹${prices.current}`
    ))
    .join(" | ");

  return (
    <div className="market-price-container">
      <h2 className="text-center">AGMARKNET</h2>

      {/* Dynamic Price Marquee */}
      <div className="price-marquee-wrapper">
        <marquee className="price-marquee">
          🌾 Live Prices: {marqueeContent}
        </marquee>
      </div>

      {/* Filters Section */}
      <div className="filters">
        {/* Commodity Dropdown */}
        <div className="filter-group">
          <label>Commodity</label>
          <select 
            value={commodity} 
            onChange={(e) => setCommodity(e.target.value)}
          >
            {Object.keys(commodityData).map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        {/* State Dropdown */}
        <div className="filter-group">
          <label>State</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option>Madhya Pradesh</option>
            <option>Uttar Pradesh</option>
            <option>Maharashtra</option>
            <option>Bihar</option>
            <option>Rajasthan</option>
            <option>Punjab</option>
            <option>Gujarat</option>
            <option>Haryana</option>
          </select>
        </div>

        {/* District Dropdown */}
        <div className="filter-group">
          <label>District</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option>Indore</option>
            <option>Bhopal</option>
            <option>Kanpur</option>
            <option>Nashik</option>
            <option>Patna</option>
          </select>
        </div>

        {/* Market Dropdown */}
        <div className="filter-group">
          <label>Market</label>
          <select
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
          >
            <option>Main Mandi</option>
            <option>Sub Market</option>
            <option>Wholesale Yard</option>
          </select>
        </div>

        {/* Date From */}
        <div className="filter-group">
          <label>Date From</label>
          <input 
            type="date" 
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>

        {/* Date To */}
        <div className="filter-group">
          <label>Date To</label>
          <input 
            type="date" 
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>

        {/* Go Button */}
        <div className="go-button-wrapper">
          <button onClick={handleGoClick}>Go</button>
        </div>
      </div>

      {/* Price Display Card */}
      {selectedPrice && (
        <div className="price-result-card">
          <h3>
            {commodity} Prices in {selectedDistrict}, {selectedState}
          </h3>
          <div className="price-details">
            <div className="price-item">
              <span className="price-label">Minimum Price:</span>
              <span className="price-value">₹{selectedPrice.min}</span>
            </div>
            <div className="price-item">
              <span className="price-label">Maximum Price:</span>
              <span className="price-value">₹{selectedPrice.max}</span>
            </div>
            <div className="price-item">
              <span className="price-label">Current Price:</span>
              <span className="price-value">₹{selectedPrice.current}</span>
            </div>
          </div>
          <p className="last-updated">
            Last Updated: {new Date().toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default MarketPrice;