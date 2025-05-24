import React, { useState } from 'react';
import BuyNowModal from './BuyNowModal';
import './BrandProducts.css';

const products = [
  {
    name: "Mahyco Hybrid Tomato Seeds",
    image: "./Brands/tomato-seeds.jpeg",
    price: "₹250",
  },
  {
    name: "Mahyco Hybrid Okra Seeds",
    image: "./Brands/okra-seeds.jpeg",
    price: "₹180",
  },
  {
    name: "Mahyco Bt Cotton Seeds",
    image: "./Brands/cotton-seeds.jpeg",
    price: "₹400",
  },
  {
    name: "Mahyco Hybrid Chili Seeds",
    image: "./Brands/chilly-seeds.jpeg",
    price: "₹220",
  },
  {
    name: "Mahyco Corn Hybrid Seeds",
    image: "./Brands/corn-seeds.jpeg",
    price: "₹300",
  },
  {
    name: "Mahyco Spinach Seeds",
    image: "./Brands/palakh-seeds.jpeg",
    price: "₹300",
  },
];

const Brand1Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="product-page">
      <h2 className="product-title">Mahyco Products</h2>
      <div className="product-grid">
        {products.map((item, index) => (
          <div 
            className="product-card" 
            key={index} 
            onClick={() => handleBuyNow(item)}
          >
            <img src={item.image} alt={item.name} className="product-img" />
            <div className="product-info">
              <h3 className="product-name">{item.name}</h3>
              <p className="price">{item.price}</p>
              <button className="buy-btn" onClick={(e) => { e.stopPropagation(); handleBuyNow(item); }}>
                Buy Now
              </button>
            </div>
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

export default Brand1Products;
