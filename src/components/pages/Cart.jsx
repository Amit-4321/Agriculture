import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import BuyNowModal from "./BuyNowModal";
import "./Cart.css";

const Cart = () => {
  const { t } = useTranslation();
  const { cart, savedItems, dispatch } = useCart();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showUPIDetails, setShowUPIDetails] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [address, setAddress] = useState({
    fullAddress: "",
    landmark: "",
    pincode: "",
    mobile: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [upiId, setUpiId] = useState("");

  const handleRemove = (id) => {
    if (window.confirm(t('cart.confirmRemove'))) {
      dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
    }
  };

  const handleRemoveFromSaved = (id) => {
    dispatch({ type: "REMOVE_FROM_SAVED", payload: { id } });
  };

  const handleSaveForLater = (item) => {
    dispatch({ type: "SAVE_FOR_LATER", payload: item });
  };

  const handleMoveToCart = (item) => {
    dispatch({ type: "MOVE_TO_CART", payload: item });
  };

  const handleQuantityChange = (id, delta) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, delta } });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalAmount = getTotalPrice() - cart.length * 50 + 3;

  const handlePlaceOrder = () => {
    if(cart.length === 0) {
      alert(t('validation.emptyCart')); 
      return;
    }
    setShowAddressModal(true);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const validateAddress = () => {
    const { fullAddress, landmark, pincode, mobile } = address;
    if (!fullAddress.trim() || !landmark.trim() || !pincode.trim() || !mobile.trim()) {
      alert(t('validation.addressFields'));
      return false;
    }
    if (!/^\d{10}$/.test(mobile)) {
      alert(t('validation.mobile'));
      return false;
    }
    if (!/^\d{6}$/.test(pincode)) {
      alert(t('validation.pincode'));
      return false;
    }
    return true;
  };

  const handleProceedToPayment = () => {
    if (validateAddress()) {
      setShowAddressModal(false);
      setShowPaymentModal(true);
    }
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setShowCardDetails(method === 'card');
    setShowUPIDetails(method === 'upi');
  };

  const validateCardDetails = () => {
    if (!cardDetails.number.trim() || !cardDetails.name.trim() || 
        !cardDetails.expiry.trim() || !cardDetails.cvv.trim()) {
      alert(t('validation.cardDetails'));
      return false;
    }
    if (!/^\d{16}$/.test(cardDetails.number)) {
      alert(t('validation.cardNumber'));
      return false;
    }
    if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
      alert(t('validation.cvv'));
      return false;
    }
    return true;
  };

  const validateUPIDetails = () => {
    if (!upiId.trim()) {
      alert(t('validation.upiId'));
      return false;
    }
    if (!/^[\w.-]+@[\w]+$/.test(upiId)) {
      alert(t('validation.validUpi'));
      return false;
    }
    return true;
  };

  const handlePaymentComplete = () => {
    if ((paymentMethod === 'card' && !validateCardDetails()) || 
        (paymentMethod === 'upi' && !validateUPIDetails())) {
      return;
    }
    dispatch({
      type: "PLACE_ORDER",
      payload: {
        items: cart,
        address: address,
        paymentMethod: paymentMethod,
        placeAt: new Date().toLocaleString(),
      }
    });
    
    setShowPaymentModal(false);
    setShowSuccessModal(true);
    dispatch({ type: "CLEAR_CART" });
  };

  const closeAllModals = () => {
    setShowAddressModal(false);
    setShowPaymentModal(false);
    setShowCardDetails(false);
    setShowUPIDetails(false);
    setShowSuccessModal(false);
    setPaymentMethod("");
  };

  return (
    <div className="shopping-cart-container">
      <div className="shopping-left-section">
        <h2 className="shopping-cart-heading">{t('cart.title')} ({cart.length})</h2>
        {cart.length === 0 ? (
          <p className="shopping-empty-message">{t('cart.emptyMessage')}</p>
        ) : (
          cart.map((item) => (
            <div className="shopping-cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="shopping-item-img" />
              <div className="shopping-item-details">
                <h5>{item.name}</h5>
                <p>{item.brand}</p>
                <p>₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</p>
                <div className="shopping-qty-controls">
                  <Button size="sm" onClick={() => handleQuantityChange(item.id, -1)}>-</Button>
                  <span>{item.quantity}</span>
                  <Button size="sm" onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
                </div>
                <div className="shopping-item-buttons">
                  <Button variant="secondary" size="sm" onClick={() => handleSaveForLater(item)}>
                    {t('cart.saveForLater')}
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)}>
                    {t('cart.remove')}
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}

        {savedItems.length > 0 && (
          <div className="shopping-saved-section">
          <h4>{t('cart.savedForLater')} ({savedItems.length})</h4>
            {savedItems.map((item) => (
              <div className="shopping-cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="shopping-item-img" />
                <div className="shopping-item-details">
                  <h5>{item.name}</h5>
                  <p>{item.brand}</p>
                  <p>₹{item.price}</p>
                  <div className="shopping-item-buttons">
                    <Button variant="primary" size="sm" onClick={() => handleMoveToCart(item)}>
                      {t('cart.moveToCart')}
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => {
                      if(window.confirm(t('cart.confirmRemove'))) {
                        handleRemoveFromSaved(item.id);
                      }
                    }}>
                      {t('cart.remove')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="shopping-right-section">
  <Link to="/order-history" className="order-history-link">
    {t('cart.viewOrderHistory')}
  </Link>

  <div className="shopping-price-box">
    <h5 className="shopping-price-heading">{t('cart.priceDetails')}</h5>
    <hr className="shopping-divider" />

    <p className="shopping-price-item">
      <span>{t('cart.price', { count: cart.length })}</span>
      <span>₹{getTotalPrice()}</span>
    </p>

    <p className="shopping-price-item">
      <span>{t('cart.discount')}</span>
      <span>- ₹{cart.length * 50}</span>
    </p>

    {cart.length > 0 ? (
      <p className="shopping-price-item">
        <span>{t('cart.platformFee')}</span>
        <span>₹3</span>
      </p>
    ) : (
      <p className="shopping-price-item">
        <span>{t('cart.platformFee')}</span>
        <span>₹0</span>
      </p>
    )}

    <p className="shopping-price-item">
      <span>{t('cart.deliveryCharges')}</span>
      <span>
        <s>₹40</s> {t('cart.free')}
      </span>
    </p>

    <hr className="shopping-divider" />

    <h6 className="shopping-total-amount">
      <span>{t('cart.totalAmount')}</span>
      <span>
        ₹
        {getTotalPrice() -
          cart.length * 50 +
          (cart.length > 0 ? 3 : 0)}
      </span>
    </h6>

    <p className="shopping-save-msg">
      {t('cart.saveMessage', { amount: cart.length * 50 })}
    </p>

    <Button
      variant="success"
      className="shopping-place-order-btn w-100"
      onClick={handlePlaceOrder}
      disabled={cart.length === 0}
    >
      {t('cart.placeOrder')}
    </Button>
  </div>
</div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>{t('address.title')}</h3>
              <span className="close-btn" onClick={closeAllModals}>&times;</span>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>{t('address.fullAddress')}</label>
                <textarea
                  className="form-control"
                  name="fullAddress"
                  value={address.fullAddress}
                  onChange={handleAddressChange}
                  placeholder={t('address.fullAddressPlaceholder')}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>{t('address.landmark')}</label>
                <input
                  type="text"
                  className="form-control"
                  name="landmark"
                  value={address.landmark}
                  onChange={handleAddressChange}
                  placeholder={t('address.landmarkPlaceholder')}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>{t('address.pincode')}</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleAddressChange}
                    placeholder={t('address.pincodePlaceholder')}
                    maxLength="6"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>{t('address.mobile')}</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="mobile"
                    value={address.mobile}
                    onChange={handleAddressChange}
                    placeholder={t('address.mobilePlaceholder')}
                    maxLength="10"
                    required
                  />
                </div>
              </div>
              
              <div className="order-summary">
                <h4>{t('address.orderSummary')}</h4>
                <p>{cart.length} {t('address.items')}</p>
                <p className="price">{t('address.total')}: ₹{totalAmount}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeAllModals}>{t('address.cancel')}</button>
              <button className="confirm-btn" onClick={handleProceedToPayment}>
                {t('address.proceedToPayment')}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Payment Options Modal */}
     
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>{t('payment.title')}</h3>
              <span className="close-btn" onClick={closeAllModals}>&times;</span>
            </div>
            <div className="modal-body">
              <div className="payment-options">
                {/* Card Option */}
                <div 
                  className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodSelect('card')}
                >
                  <div className="payment-icon">💳</div>
                  <div className="payment-details">
                    <h4>{t('payment.card')}</h4>
                    <p>{t('payment.cardDesc')}</p>
                  </div>
                </div>
                
                {/* UPI Option */}
                <div 
                  className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodSelect('upi')}
                >
                  <div className="payment-icon">📱</div>
                  <div className="payment-details">
                    <h4>{t('payment.upi')}</h4>
                    <p>{t('payment.upiDesc')}</p>
                  </div>
                </div>
                
                {/* COD Option */}
                <div 
                  className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodSelect('cod')}
                >
                  <div className="payment-icon">💰</div>
                  <div className="payment-details">
                    <h4>{t('payment.cod')}</h4>
                    <p>{t('payment.codDesc')}</p>
                  </div>
                </div>
              </div>

              {/* Card Details Form */}
              {showCardDetails && (
                <div className="payment-form">
                  <h4>{t('payment.cardDetails')}</h4>
                  <div className="form-group">
                    <label>{t('payment.cardNumber')}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t('payment.cardNumberPlaceholder')}
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      maxLength="16"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>{t('payment.cardName')}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t('payment.cardNamePlaceholder')}
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('payment.expiry')}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t('payment.expiryPlaceholder')}
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>{t('payment.cvv')}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t('payment.cvvPlaceholder')}
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        maxLength="4"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Details Form */}
              {showUPIDetails && (
                <div className="payment-form">
                  <h4>{t('payment.upiId')}</h4>
                  <div className="form-group">
                    <label>{t('payment.upiId')}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t('payment.upiIdPlaceholder')}
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    <small className="text-muted">{t('payment.upiExample')}</small>
                  </div>
                </div>
              )}

              {/* Address Review Section */}
              <div className="address-review">
                <h4>{t('payment.deliveryTo')}</h4>
                <p>{address.fullAddress}</p>
                <p>{address.landmark}, {address.pincode}</p>
                <p>{t('payment.mobile')}: {address.mobile}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="back-btn" 
                onClick={() => {
                  setShowCardDetails(false);
                  setShowUPIDetails(false);
                  setPaymentMethod("");
                }}
              >
                {t('payment.back')}
              </button>
              
              <button 
                className="confirm-btn" 
                onClick={handlePaymentComplete}
                disabled={
                  !paymentMethod || 
                  (paymentMethod === 'card' && !cardDetails.number) ||
                  (paymentMethod === 'upi' && !upiId)
                }
              >
                {paymentMethod === 'cod' ? t('payment.placeOrder') : `${t('payment.pay')} ₹${totalAmount}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-box success-modal">
            <div className="modal-body">
              <div className="success-icon">✅</div>
              <h3>{t('success.title')}</h3>
              <p>{t('success.thankYou')}</p>
              
              <div className="order-details">
                <h4>{t('success.orderDetails')}</h4>
                <p><strong>{t('success.paymentMethod')}:</strong> {
                  paymentMethod === 'card' ? t('payment.card') : 
                  paymentMethod === 'upi' ? t('payment.upi') : t('payment.cod')
                }</p>
                
                <p><strong>{t('success.amountPaid')}:</strong> ₹{totalAmount}</p>
                
                <div className="delivery-info">
                  <p><strong>{t('success.deliveryAddress')}:</strong></p>
                  <p>{address.fullAddress}</p>
                  <p>{address.landmark}, {address.pincode}</p>
                  <p>{t('payment.mobile')}: {address.mobile}</p>
                </div>
              </div>
              
              <button className="continue-btn" onClick={closeAllModals}>
                {t('success.continueShopping')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;