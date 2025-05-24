// Brand2Products.jsx
import React, { useState } from 'react';
import BuyNowModal from './BuyNowModal';
import './BrandProducts.css';

const products = [
  {
    name: "Nuziveedu Tomato Seeds",
    image: "./Brands/tomato-seeds.jpeg ",
    price: "₹250",
  },
  {
    name: "Nuziveedu Okra Seeds",
    image: "./Brands/okra-seeds.jpeg",
    price: "₹180",
  },
  {
    name: "Nuziveedu Cotton Seeds",
    image: "./Brands/cotton-seeds.jpeg",
    price: "₹400",
  },
  {
    name: "Nuziveedu Chili Seeds",
    image: "./Brands/chilly-seeds.jpeg",
    price: "₹220",
  },
  {
    name: "Nuziveedu Corn Hybrid Seeds",
    image: "./Brands/corn-seeds.jpeg",
    price: "₹300",
  },
  {
    name: "Nuziveedu Palakh Hybrid Seeds",
    image: "./Brands/palakh-seeds.jpeg",
    price: "₹300",
  },
];

const Brand2Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="product-page">
      <h2 className="product-title">Nuziveedu Products</h2>
      <div className="product-grid">
        {products.map((item, index) => (
          <div 
            className="product-card" 
            key={index} 
            onClick={() => handleBuyNow(item)}
            style={{ cursor: 'pointer' }}
          >
            <img src={item.image} alt={item.name} className="product-img" />
            <h3>{item.name}</h3>
            <p className="price">{item.price}</p>
            {/* You can optionally remove this button OR keep it just for visuals */}
            <button className="buy-btn" onClick={(e) => { e.stopPropagation(); handleBuyNow(item); }}>
              Buy Now
            </button>
          </div>
        ))}
      </div>

      <BuyNowModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        product={selectedProduct} 
      />
    </div>
  );
};

export default Brand2Products;
