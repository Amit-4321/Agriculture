import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, savedItems, dispatch} = useCart();
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
    if (window.confirm("Are you sure you want to remove this item?")) {
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

      alert("Please fill all fields"); 
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
      alert("Please fill all address fields");
      return false;
    }
    if (!/^\d{10}$/.test(mobile)) {
      alert("Please enter valid 10-digit mobile number");
      return false;
    }
    if (!/^\d{6}$/.test(pincode)) {
      alert("Please enter valid 6-digit pincode");
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
      alert("Please fill all card details");
      return false;
    }
    if (!/^\d{16}$/.test(cardDetails.number)) {
      alert("Please enter valid 16-digit card number");
      return false;
    }
    if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
      alert("Please enter valid CVV");
      return false;
    }
    return true;
  };

  const validateUPIDetails = () => {
    if (!upiId.trim()) {
      alert("Please enter UPI ID");
      return false;
    }
    if (!/^[\w.-]+@[\w]+$/.test(upiId)) {
      alert("Please enter valid UPI ID (e.g. name@upi)");
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
        <h2 className="shopping-cart-heading">🛒 Your Cart ({cart.length})</h2>
        {cart.length === 0 ? (
          <p className="shopping-empty-message">Your cart is empty.</p>
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
                    Save for Later
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}

        {savedItems.length > 0 && (
          <div className="shopping-saved-section">
            <h4>Saved For Later ({savedItems.length})</h4>
            {savedItems.map((item) => (
              <div className="shopping-cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="shopping-item-img" />
                <div className="shopping-item-details">
                  <h5>{item.name}</h5>
                  <p>{item.brand}</p>
                  <p>₹{item.price}</p>
                  <div className="shopping-item-buttons">
                    <Button variant="primary" size="sm" onClick={() => handleMoveToCart(item)}>
                      Move to Cart
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => {
                      if(window.confirm("Are you sure you want to remove this item?")) {
                        handleRemoveFromSaved(item.id);
                      }
                    }}>
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="shopping-right-section">
        <Link to="/order-history" className="order-history-link">View Order History</Link>

        <div className="shopping-price-box">
          <h5 className="shopping-price-heading">PRICE DETAILS</h5>
          <hr className="shopping-divider" />
          <p className="shopping-price-item">
            <span>Price ({cart.length} items)</span>
            <span>₹{getTotalPrice()}</span>
          </p>
          <p className="shopping-price-item">
            <span>Discount</span>
            <span>- ₹{cart.length * 50}</span>
          </p>
          <p className="shopping-price-item">
            <span>Platform Fee</span>
            <span>₹3</span>
          </p>
          <p className="shopping-price-item">
            <span>Delivery Charges</span>
            <span><s>₹40</s> Free</span>
          </p>
          <hr className="shopping-divider" />
          <h6 className="shopping-total-amount">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </h6>
          <p className="shopping-save-msg">
            You will save ₹{cart.length * 50} on this order
          </p>
          <Button 
            variant="success" 
            className="shopping-place-order-btn w-100"
            onClick={handlePlaceOrder}
            disabled={cart.length === 0}
          >
            Place Order
          </Button>
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Delivery Address</h3>
              <span className="close-btn" onClick={closeAllModals}>&times;</span>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Full Address*</label>
                <textarea
                  className="form-control"
                  name="fullAddress"
                  value={address.fullAddress}
                  onChange={handleAddressChange}
                  placeholder="House no, Building, Street, Area"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Landmark*</label>
                <input
                  type="text"
                  className="form-control"
                  name="landmark"
                  value={address.landmark}
                  onChange={handleAddressChange}
                  placeholder="Nearby famous place"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Pincode*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleAddressChange}
                    placeholder="6-digit pincode"
                    maxLength="6"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Mobile Number*</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="mobile"
                    value={address.mobile}
                    onChange={handleAddressChange}
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    required
                  />
                </div>
              </div>
              
              <div className="order-summary">
                <h4>Order Summary</h4>
                <p>{cart.length} Item{cart.length !== 1 ? 's' : ''}</p>
                <p className="price">Total: ₹{totalAmount}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeAllModals}>Cancel</button>
              <button className="confirm-btn" onClick={handleProceedToPayment}>
                Proceed to Payment
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
              <h3>Select Payment Method</h3>
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
                    <h4>Credit/Debit Card</h4>
                    <p>Pay using Visa, Mastercard, etc.</p>
                  </div>
                </div>
                
                {/* UPI Option */}
                <div 
                  className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodSelect('upi')}
                >
                  <div className="payment-icon">📱</div>
                  <div className="payment-details">
                    <h4>UPI Payment</h4>
                    <p>Pay using any UPI app</p>
                  </div>
                </div>
                
                {/* COD Option */}
                <div 
                  className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodSelect('cod')}
                >
                  <div className="payment-icon">💰</div>
                  <div className="payment-details">
                    <h4>Cash on Delivery</h4>
                    <p>Pay when you receive your order</p>
                  </div>
                </div>
              </div>

              {/* Card Details Form */}
              {showCardDetails && (
                <div className="payment-form">
                  <h4>Card Details</h4>
                  <div className="form-group">
                    <label>Card Number*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="16-digit card number"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      maxLength="16"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Name on Card*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="As printed on card"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>CVV*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="3 or 4 digits"
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
                  <h4>UPI Details</h4>
                  <div className="form-group">
                    <label>UPI ID*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    <small className="text-muted">e.g. 9876543210@ybl or name@oksbi</small>
                  </div>
                </div>
              )}

              {/* Address Review Section */}
              <div className="address-review">
                <h4>Delivery To:</h4>
                <p>{address.fullAddress}</p>
                <p>{address.landmark}, {address.pincode}</p>
                <p>Mobile: {address.mobile}</p>
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
                Back
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
                {paymentMethod === 'cod' ? 'Place Order' : `Pay ₹${totalAmount}`}
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
              <h3>Order Placed Successfully!</h3>
              <p>Thank you for shopping with us</p>
              
              <div className="order-details">
                <h4>Order Details</h4>
                <p><strong>Payment Method:</strong> {
                  paymentMethod === 'card' ? 'Credit/Debit Card' : 
                  paymentMethod === 'upi' ? 'UPI Payment' : 'Cash on Delivery'
                }</p>
                
                <p><strong>Amount Paid:</strong> ₹{totalAmount}</p>
                
                <div className="delivery-info">
                  <p><strong>Delivery Address:</strong></p>
                  <p>{address.fullAddress}</p>
                  <p>{address.landmark}, {address.pincode}</p>
                  <p>Mobile: {address.mobile}</p>
                </div>
              </div>
              
              <button className="continue-btn" onClick={closeAllModals}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;