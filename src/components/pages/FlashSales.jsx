import React, { useState, useEffect } from 'react';
import './FlashSales.css';
import BuyNowModal from './BuyNowModal';
import { useTranslation } from 'react-i18next';

const FlashSales = () => {
  const { t } = useTranslation();
  const flashProducts = t('flash.products', { returnObjects: true });

  const [timers, setTimers] = useState(() =>
    flashProducts.reduce((acc, product) => {
      acc[product.id] = product.saleEndsIn;
      return acc;
    }, {})
  );

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((id) => {
          if (updated[id] > 0) updated[id] -= 1;
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="flash-sales-container">
      <h2 className="flash-heading">{t('flash.title')}</h2>
      <div className="flash-grid">
        {flashProducts.map((product) => {
          const remaining = timers[product.id];
          const isSaleActive = remaining > 0;

          return (
            <div className="flash-card" key={product.id}>
              <div className="sale-badge">{t('flash.sale')}</div>
              <img src={product.image} alt={product.name} className="flash-img" />
              <h4>{product.name}</h4>

              <p className="price-section">
                {isSaleActive ? (
                  <>
                    <span className="original-price" style={{ textDecoration: 'line-through', color: '#888', marginRight: '8px' }}>
                      {product.originalPrice}
                    </span>
                    <span className="discounted-price" style={{ color: '#d32f2f', fontWeight: 'bold' }}>
                      {product.discountedPrice}
                    </span>
                  </>
                ) : (
                  <span className="expired-price" style={{ color: '#444', fontWeight: 'bold' }}>
                    {product.originalPrice}
                  </span>
                )}
              </p>

              {isSaleActive && <p className="limited-time">{t('flash.limited')}</p>}

              <p className="timer">
                {isSaleActive ? (
                  <>⏳ {t('flash.endsIn')} {formatTime(remaining)}</>
                ) : (
                  <span className="ended">⚠️ {t('flash.ended')}</span>
                )}
              </p>

              <button
                className="buy-btn"
                disabled={!isSaleActive}
                onClick={() => handleBuyNow(product)}
              >
                {isSaleActive ? t('flash.buyNow') : t('flash.ended')}
              </button>
            </div>
          );
        })}
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

export default FlashSales;
