import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BuyNowModal from './BuyNowModal';
import './BrandProducts.css';

const Brand3Products = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const products = t("brandproduct3.products", { returnObjects: true });

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="product-page">
      <h2 className="product-title">{t("brandproduct3.pageTitle")}</h2>
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
            <button className="buy-btn" onClick={(e) => { e.stopPropagation(); handleBuyNow(item); }}>
              {t("brandproduct3.buyNow")}
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

export default Brand3Products;
