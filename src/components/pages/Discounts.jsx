import React, { useState } from 'react';
import './Discounts.css';
import BuyNowModal from './BuyNowModal';

const discountItems = [
  {
    id: 1,
    name: "Organic Fertilizer",
    image: "/Brands/chilly-seeds.jpeg",
    originalPrice: 500,
    discountedPrice: 350,
    discount: "30% OFF",
  },
  {
    id: 2,
    name: "Hybrid Seeds",
    image: "/Brands/tomato-seeds.jpeg",
    originalPrice: 300,
    discountedPrice: 225,
    discount: "25% OFF",
  },
  {
    id: 3,
    name: "Pesticide Spray",
    image: "/Brands/okra-seeds.jpeg",
    originalPrice: 200,
    discountedPrice: 150,
    discount: "25% OFF",
  },
  
];

const Discounts = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="discounts-page">
      <h2 className="discounts-title">🔥 Special Offers & Discounts 🔥</h2>

      <div className="discounts-grid">
        {discountItems.map((item) => (
          <div className="discount-card" key={item.id}>
            <span className="discount-badge">{item.discount}</span>
            <img src={item.image} alt={item.name} className="discount-img" />
            <h4>{item.name}</h4>
            <p className="old-price">₹{item.originalPrice}</p>
            <p className="new-price">₹{item.discountedPrice}</p>
            <button
              className="buy-btn"
              onClick={() => {
                setSelectedProduct(item);
                setShowModal(true);
              }}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {showModal && selectedProduct && (
        <BuyNowModal
          show={showModal}
          onClose={() => setShowModal(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Discounts;
