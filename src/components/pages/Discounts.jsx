import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Discounts.css';
import BuyNowModal from './BuyNowModal';

const Discounts = () => {
  const { t } = useTranslation();
  const discountItems = t('discounts.items', { returnObjects: true });

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="discounts-page">
      <h2 className="discounts-title">{t('discounts.title')}</h2>

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
              {t('discounts.buyNow')}
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
