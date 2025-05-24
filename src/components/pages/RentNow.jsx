// RentNow.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RentNow.css";

const RentNow = () => {
  const navigate = useNavigate();
  
  const products = [
    { id: 1, name: "Farming Tool 1", image: "tool1.jpeg", type: "tool" },
    { id: 2, name: "Farming Tool 2", image: "tool2.jpeg", type: "tool" },
    { id: 3, name: "Organic Fertilizer 1", image: "fertilizer1.jpeg", type: "fertilizer" },
    { id: 4, name: "Organic Fertilizer 2", image: "fertilizer2.jpeg", type: "fertilizer" }
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [duration, setDuration] = useState(1);
  const [price, setPrice] = useState(0);

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
    setPrice(e.target.value * 50); // Assuming rent is 50 per week for each product
  };

  const handleRentNow = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Rent Agricultural Tools and Fertilizers</h2>
      <p className="text-center">Choose the best tools and fertilizers to rent for your crops.</p>

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="rent-card">
              <div className="rent-card-img-container">
                <img src={product.image} className="rent-card-img" alt={product.name} />
              </div>
              <div className="rent-card-body">
                <h5 className="rent-card-title">{product.name}</h5>
                <p className="rent-card-text">
                  Rent this {product.type} for your crops. 
                </p>

                {/* Duration and Price */}
                <div className="duration-selector">
                  <label>Duration (in weeks):</label>
                  <select value={duration} onChange={handleDurationChange}>
                    <option value={1}>1 week</option>
                    <option value={2}>2 weeks</option>
                    <option value={3}>3 weeks</option>
                  </select>
                  <p className="price">Rent: ₹{price}</p>
                </div>

                <button className="rent-now-btn" onClick={() => handleRentNow(product)}>
                  Rent Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal or Payment Button (You can customize this) */}
      {selectedProduct && (
        <div className="payment-modal">
          <h4>Confirm Rent for {selectedProduct.name}</h4>
          <p>Duration: {duration} week(s)</p>
          <p>Total Rent: ₹{price}</p>
          <button className="payment-btn" onClick={() => navigate("/payment")}>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
};

export default RentNow;
