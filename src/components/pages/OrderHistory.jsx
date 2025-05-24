import React, { useState } from "react";
import "./OrderHistory.css";
import { useCart } from "./CartContext";

const OrderHistory = () => {
  const { orders, dispatch } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [showBuyNowAgain, setShowBuyNowAgain] = useState(false);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const [address, setAddress] = useState({
    fullAddress: "",
    landmark: "",
    pincode: "",
    mobile: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({ 
    number: "", 
    expiry: "", 
    cvv: "" 
  });
  const [upiId, setUpiId] = useState("");

  const allOrders = orders || [];

  const getPaymentIcon = (method) => {
    switch (method) {
      case "Card": return "💳";
      case "UPI": return "📲";
      case "Cash on Delivery": return "💵";
      default: return "🧾";
    }
  };

  const handleBuyNowAgain = (items) => {
    setSelectedOrderItems(items);
    setShowBuyNowAgain(true);
    setCurrentStep(1);
    setAddress({ fullAddress: "", landmark: "", pincode: "", mobile: "" });
    setPaymentMethod("");
    setCardDetails({ number: "", expiry: "", cvv: "" });
    setUpiId("");
  };

  const placeNewOrder = () => {
    const newOrder = {
      items: selectedOrderItems,
      address,
      paymentMethod,
      placedAt: new Date().toLocaleString(),
    };
    dispatch({ type: "PLACE_ORDER", payload: newOrder });
    setShowBuyNowAgain(false);
    alert("Order placed successfully!");
  };

  const validateAddress = () => {
    if (!address.fullAddress || !address.pincode || !address.mobile) {
      alert("Please fill all required address fields");
      return false;
    }
    if (!/^\d{6}$/.test(address.pincode)) {
      alert("Please enter valid 6-digit pincode");
      return false;
    }
    if (!/^\d{10}$/.test(address.mobile)) {
      alert("Please enter valid 10-digit mobile number");
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return false;
    }
    if (paymentMethod === "Card") {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
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
    }
    if (paymentMethod === "UPI" && !upiId) {
      alert("Please enter UPI ID");
      return false;
    }
    return true;
  };

  const handlePayment = () => {
    if (validatePayment()) {
      placeNewOrder();
    }
  };

  return (
    <div className="order-history-container">
      <h2>Your Order History</h2>

      {allOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {allOrders.map((order, index) => {
            const date = new Date(order.placedAt);
            const formattedDate = date.toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            
            return (
              <div key={index} className="order-card">
                <h4 className="order-number">Order #{index + 1}</h4>
                {order.placedAt && (
                  <p>
                    <strong>Placed At:</strong> {formattedDate}
                  </p>
                )}
                <p>
                  <strong>Address:</strong> {order.address.fullAddress}, {order.address.landmark},{" "}
                  {order.address.pincode}, {order.address.mobile}
                </p>
                <p>
                  <strong>Payment Method:</strong> {getPaymentIcon(order.paymentMethod)}{" "}
                  {order.paymentMethod}
                </p>
                <div className="order-items">
                  {order.items.map((item, i) => (
                    <div key={i} className="order-item">
                      <p><strong>{item.name}</strong></p>
                      <p>Qty: {item.quantity}</p>
                      <p>₹{item.price}</p>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="buy-again-btn"
                  onClick={() => handleBuyNowAgain(order.items)}
                >
                  Buy Now Again
                </button>
              </div>
            );
          })}
        </div>
      )}

      {showBuyNowAgain && (
        <div className="popup-order-window">
          {currentStep === 1 && (
            <div>
              <h3>Enter Delivery Address</h3>
              <input
                type="text"
                placeholder="Full Address*"
                value={address.fullAddress}
                onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Landmark"
                value={address.landmark}
                onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
              />
              <input
                type="text"
                placeholder="Pincode*"
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                maxLength="6"
                required
              />
              <input
                type="text"
                placeholder="Mobile*"
                value={address.mobile}
                onChange={(e) => setAddress({ ...address, mobile: e.target.value })}
                maxLength="10"
                required
              />
              <button onClick={() => {
                if (validateAddress()) {
                  setCurrentStep(2);
                }
              }}>
                Continue to Payment
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3>Select Payment Method</h3>
              <select
                value={paymentMethod}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setCardDetails({ number: "", expiry: "", cvv: "" });
                  setUpiId("");
                }}
              >
                <option value="">-- Select Payment Method --</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>

              {paymentMethod === "Card" && (
                <div>
                  <input
                    type="text"
                    placeholder="Card Number*"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    maxLength="16"
                  />
                  <input
                    type="text"
                    placeholder="Expiry Date (MM/YY)*"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="CVV*"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    maxLength="4"
                  />
                </div>
              )}

              {paymentMethod === "UPI" && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter UPI ID*"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              )}

              <button onClick={handlePayment}>
                Pay & Place Order
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;