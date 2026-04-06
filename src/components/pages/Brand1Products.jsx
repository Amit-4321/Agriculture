import React, { useState } from 'react';
import BuyNowModal from './BuyNowModal';
import './BrandProducts.css';
import { useTranslation } from 'react-i18next';

const Brand1Products = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const products = t('brandproduct1.products', { returnObjects: true });

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="product-page">
      <h2 className="product-title">{t('brandproduct1.pageTitle')}</h2>
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
                {t('brandproduct1.buyNow')}
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
