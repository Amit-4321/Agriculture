import React, { useState } from "react";
import "./OrderHistory.css";
import { useCart } from "./CartContext";
import { useTranslation } from "react-i18next";

const OrderHistory = () => {
  const { t } = useTranslation();
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
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");

  const allOrders = orders || [];

  const getPaymentIcon = (method) => {
    switch (method) {
      case t("orderHistory.card"): return "💳";
      case t("orderHistory.upi"): return "📲";
      case t("orderHistory.cod"): return "💵";
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
    alert(t("orderHistory.alerts.orderSuccess"));
  };

  const validateAddress = () => {
    if (!address.fullAddress || !address.pincode || !address.mobile) {
      alert(t("orderHistory.alerts.fillRequiredAddress"));
      return false;
    }
    if (!/^\d{6}$/.test(address.pincode)) {
      alert(t("orderHistory.alerts.invalidPincode"));
      return false;
    }
    if (!/^\d{10}$/.test(address.mobile)) {
      alert(t("orderHistory.alerts.invalidMobile"));
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    if (!paymentMethod) {
      alert(t("orderHistory.alerts.selectPayment"));
      return false;
    }
    if (paymentMethod === t("orderHistory.card")) {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        alert(t("orderHistory.alerts.fillCardDetails"));
        return false;
      }
      if (!/^\d{16}$/.test(cardDetails.number)) {
        alert(t("orderHistory.alerts.invalidCardNumber"));
        return false;
      }
      if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        alert(t("orderHistory.alerts.invalidCVV"));
        return false;
      }
    }
    if (paymentMethod === t("orderHistory.upi") && !upiId) {
      alert(t("orderHistory.alerts.enterUpiId"));
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
      <h2>{t("orderHistory.title")}</h2>

      {allOrders.length === 0 ? (
        <p>{t("orderHistory.noOrders")}</p>
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
                <h4 className="order-number">
                  {t("orderHistory.order")} #{index + 1}
                </h4>
                {order.placedAt && (
                  <p>
                    <strong>{t("orderHistory.placedAt")}:</strong> {formattedDate}
                  </p>
                )}
                <p>
                  <strong>{t("orderHistory.address")}:</strong> {order.address.fullAddress}, {order.address.landmark},{" "}
                  {order.address.pincode}, {order.address.mobile}
                </p>
                <p>
                  <strong>{t("orderHistory.paymentMethod")}:</strong>{" "}
                  {getPaymentIcon(order.paymentMethod)} {order.paymentMethod}
                </p>
                <div className="order-items">
                  {order.items.map((item, i) => (
                    <div key={i} className="order-item">
                      <p><strong>{item.name}</strong></p>
                      <p>{t("orderHistory.qty")}: {item.quantity}</p>
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

                <button className="buy-again-btn" onClick={() => handleBuyNowAgain(order.items)}>
                  {t("orderHistory.buyNowAgain")}
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
        {/* Header with Cancel Icon */}
        <div className="popup-header">
          <h3>{t("orderHistory.deliveryAddressTitle")}</h3>
          <span
            className="cancel-icon"
            onClick={() => setShowBuyNowAgain(false)}
            title={t("orderHistory.cancel")}
          >
            ❌
          </span>
        </div>

        <input
          type="text"
          placeholder={t("orderHistory.fullAddress")}
          value={address.fullAddress}
          onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}
        />
        <input
          type="text"
          placeholder={t("orderHistory.landmark")}
          value={address.landmark}
          onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
        />
        <input
          type="text"
          placeholder={t("orderHistory.pincode")}
          value={address.pincode}
          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
          maxLength="6"
        />
        <input
          type="text"
          placeholder={t("orderHistory.mobile")}
          value={address.mobile}
          onChange={(e) => setAddress({ ...address, mobile: e.target.value })}
          maxLength="10"
        />
        <button
          onClick={() => {
            if (validateAddress()) {
              setCurrentStep(2);
            }
          }}
        >
          {t("orderHistory.continueToPayment")}
        </button>
      </div>
    )}

          {currentStep === 2 && (
            <div>
              <h3>{t("orderHistory.selectPaymentMethod")}</h3>
              <select
                value={paymentMethod}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setCardDetails({ number: "", expiry: "", cvv: "" });
                  setUpiId("");
                }}
              >
                <option value="">{t("orderHistory.selectOption")}</option>
                <option value={t("orderHistory.card")}>{t("orderHistory.card")}</option>
                <option value={t("orderHistory.upi")}>{t("orderHistory.upi")}</option>
                <option value={t("orderHistory.cod")}>{t("orderHistory.cod")}</option>
              </select>

              {paymentMethod === t("orderHistory.card") && (
                <div>
                  <input
                    type="text"
                    placeholder={t("orderHistory.cardNumber")}
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    maxLength="16"
                  />
                  <input
                    type="text"
                    placeholder={t("orderHistory.expiry")}
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder={t("orderHistory.cvv")}
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    maxLength="4"
                  />
                </div>
              )}

              {paymentMethod === t("orderHistory.upi") && (
                <div>
                  <input
                    type="text"
                    placeholder={t("orderHistory.upiId")}
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              )}

              <button onClick={handlePayment}>
                {t("orderHistory.payAndPlaceOrder")}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
