import React, { useState, useEffect, useRef } from 'react';
import './BuyNowModal.css';

const BuyNowModal = ({ show, onClose, product }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
        setStep(1);
        setPaymentMethod('card');
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [show]);

  if (!show) return null;

  const handleConfirm = () => {
    setStep(3); // Show success message
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box" ref={modalRef}>
        {step === 1 && (
          <>
            <div className="modal-header">
              <h2>Buy Now - {product.name}</h2>
              <span className="close-btn" onClick={onClose}>&times;</span>
            </div>
            <div className="modal-content">
              <img src={product.image} alt={product.name} className="modal-product-img" />
              <p className="modal-price">{product.price}</p>
              <div className="modal-footer">
                <button className="close-btn-alt" onClick={onClose}>Cancel</button>
                <button className="confirm-btn" onClick={() => setStep(2)}>Proceed to Payment</button>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="modal-header">
              <h2>Enter Payment Details</h2>
              <span className="close-btn" onClick={onClose}>&times;</span>
            </div>
            <div className="modal-content">
              <div className="payment-options">
                <label>
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Card
                </label>
                <label>
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Cash on Delivery
                </label>
                <label>
                  <input
                    type="radio"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  PayPal
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="payment-form">
                  <input type="text" placeholder="Card Number" />
                  <input type="text" placeholder="Name on Card" />
                  <div className="card-details">
                    <input type="text" placeholder="MM/YY" />
                    <input type="text" placeholder="CVV" />
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="payment-form">
                  <input type="email" placeholder="PayPal Email" />
                </div>
              )}

              {paymentMethod === 'cod' && (
                <p className="cod-note">You will pay cash upon delivery.</p>
              )}

              <div className="modal-footer">
                <button className="close-btn-alt" onClick={() => setStep(1)}>Back</button>
                <button className="confirm-btn" onClick={handleConfirm}>Confirm Payment</button>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="modal-header">
              <h2 style={{ color: 'green' }}>✅ Transaction Successful</h2>
              <span className="close-btn" onClick={onClose}>&times;</span>
            </div>
            <div className="modal-content">
              <p>Thank you for shopping with us!</p>
              <p>Your order for <strong>{product.name}</strong> has been placed successfully.</p>
              <div className="modal-footer">
                <button className="confirm-btn" onClick={onClose}>Close</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BuyNowModal;
