import React, { useState, useEffect, useRef } from 'react'; 
import './BuyNowModal.css';

const BuyNowModal = ({ show, onClose, product }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    pincode: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    paypalEmail: ''
  });
  const [errors, setErrors] = useState({});
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [show]);

  const handleClose = () => {
    setStep(1);
    setPaymentMethod('card');
    setFormData({
      fullName: '',
      address: '',
      city: '',
      pincode: '',
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvv: '',
      paypalEmail: ''
    });
    setErrors({});
    onClose();
  };

  const validateAddress = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim() || !/^[0-9]{6}$/.test(formData.pincode)) newErrors.pincode = 'Enter valid 6-digit pincode';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const newErrors = {};
    if (paymentMethod === 'card') {
      if (!formData.cardNumber || formData.cardNumber.length !== 16 || !/^[0-9]+$/.test(formData.cardNumber)) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
      if (!formData.expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/)) {
        newErrors.expiry = 'Expiry should be in MM/YY format';
      }
      if (!formData.cvv || formData.cvv.length !== 3 || !/^[0-9]+$/.test(formData.cvv)) {
        newErrors.cvv = 'Enter a valid 3-digit CVV';
      }
    } else if (paymentMethod === 'paypal') {
      if (!formData.paypalEmail) {
        newErrors.paypalEmail = 'PayPal email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.paypalEmail)) {
        newErrors.paypalEmail = 'Invalid email format';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (!validateForm()) return;
    setStep(4);
    console.log('Payment data:', {
      product,
      paymentMethod,
      ...formData
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box" ref={modalRef}>
        {step === 1 && (
          <>
            <div className="modal-header">
              <h2>Buy Now - {product.name}</h2>
              <span className="close-btn" onClick={handleClose}>&times;</span>
            </div>
            <div className="modal-content">
              <img src={product.image} alt={product.name} className="modal-product-img" />
              <p className="modal-price">{product.price}</p>
              <div className="modal-footer">
                <button className="close-btn-alt" onClick={handleClose}>Cancel</button>
                <button className="confirm-btn" onClick={() => setStep(2)}>Continue</button>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="modal-header">
              <h2>Shipping Address</h2>
              <span className="close-btn" onClick={handleClose}>&times;</span>
            </div>
            <div className="modal-content">
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} />
              {errors.fullName && <span className="error">{errors.fullName}</span>}
              <input type="text" name="address" placeholder="Full Address" value={formData.address} onChange={handleInputChange} />
              {errors.address && <span className="error">{errors.address}</span>}
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} />
              {errors.city && <span className="error">{errors.city}</span>}
              <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} />
              {errors.pincode && <span className="error">{errors.pincode}</span>}
              <div className="modal-footer">
                <button className="close-btn-alt" onClick={() => setStep(1)}>Back</button>
                <button className="confirm-btn" onClick={() => {
                  if (validateAddress()) setStep(3);
                }}>
                  Proceed to Payment
                </button>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="modal-header">
              <h2>Enter Payment Details</h2>
              <span className="close-btn" onClick={handleClose}>&times;</span>
            </div>
            <div className="modal-content">
              <div className="payment-options">
                <label>
                  <input type="radio" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} /> Credit/Debit Card
                </label>
                <label>
                  <input type="radio" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} /> Cash on Delivery
                </label>
                <label>
                  <input type="radio" value="paypal" checked={paymentMethod === 'paypal'} onChange={(e) => setPaymentMethod(e.target.value)} /> PayPal
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="payment-form">
                  <input type="text" name="cardNumber" placeholder="Enter your 16-digit card number" value={formData.cardNumber} onChange={handleInputChange} />
                  {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
                  <input type="text" name="cardName" placeholder="Enter name on card" value={formData.cardName} onChange={handleInputChange} />
                  {errors.cardName && <span className="error">{errors.cardName}</span>}
                  <div className="card-details">
                    <input type="text" name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} />
                    <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} />
                  </div>
                  {errors.expiry && <span className="error">{errors.expiry}</span>}
                  {errors.cvv && <span className="error">{errors.cvv}</span>}
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="payment-form">
                  <input type="email" name="paypalEmail" placeholder="Enter your PayPal email" value={formData.paypalEmail} onChange={handleInputChange} />
                  {errors.paypalEmail && <span className="error">{errors.paypalEmail}</span>}
                  <p className="info-note">You will be redirected to PayPal for payment confirmation</p>
                </div>
              )}

              {paymentMethod === 'cod' && <p className="cod-note">You will pay cash upon delivery.</p>}

              <div className="modal-footer">
                <button className="close-btn-alt" onClick={() => setStep(2)}>Back</button>
                <button className="confirm-btn" onClick={handleConfirm}>{paymentMethod === 'paypal' ? 'Proceed to PayPal' : 'Confirm Payment'}</button>
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className="modal-header">
              <h2 style={{ color: 'green' }}>✅ Transaction Successful</h2>
              <span className="close-btn" onClick={handleClose}>&times;</span>
            </div>
            <div className="modal-content">
              <p>Thank you for shopping with us!</p>
              <p>Your order for <strong>{product.name}</strong> has been placed successfully.</p>
              <p>It will be delivered to: {formData.address}, {formData.city} - {formData.pincode}</p>
              {paymentMethod === 'paypal' && <p>A confirmation has been sent to {formData.paypalEmail}</p>}
              <div className="modal-footer">
                <button className="confirm-btn" onClick={handleClose}>Close</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BuyNowModal;
