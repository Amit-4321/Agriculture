import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useCart } from "./CartContext";
import "./fertilizersPage.css";

const fertilizerData = [
  {
    id: "organic-fertilizer",
    name: "Organic Fertilizer",
    brand: "AgriGrow",
    price: "₹150",
    description: "High-quality organic fertilizer for sustainable farming.",
    image: "/images/organic-fertilizer.jpg",
  },
  {
    id: "nitrogen-fertilizer",
    name: "Nitrogen Fertilizer",
    brand: "GreenBoost",
    price: "₹199",
    description: "Essential nitrogen-based fertilizer for plant growth.",
    image: "/images/nitrogen-fertilizer.jpg",
  },
  {
    id: "compost-fertilizer",
    name: "Compost Fertilizer",
    brand: "EcoFarm",
    price: "₹299",
    description: "Nutrient-rich compost fertilizer to enhance soil fertility.",
    image: "/images/compost-fertilizer.jpg",
  },
];

const FertilizersPage = () => {
  const [selectedFertilizer, setSelectedFertilizer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [paypalID, setPaypalID] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);

  const { dispatch } = useCart();

  const handleBuyNow = (fertilizer) => {
    setSelectedFertilizer(fertilizer);
    setShowModal(true);
  };

  const handleConfirmPurchase = () => {
    setShowModal(false);
    setShowPaymentModal(true);
  };

  const handleAddToCart = (fertilizer) => {
    const confirmAdd = window.confirm(
      `Kya aap "${fertilizer.name}" ko cart mein add karna chahte hain?`
    );
    if (confirmAdd) {
      dispatch({ type: "ADD_TO_CART", payload: fertilizer });
    }
  };

  const handleCardClick = (fertilizer) => {
    setSelectedDetails(fertilizer);
    setShowDetailsModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setPaymentSuccess(false);
    setPaymentMethod(null);
    setPaypalID("");
  };

  const handleProceedToPayment = () => {
    if (paymentMethod === "paypal" && !paypalID.trim()) {
      alert("Please enter a valid PayPal ID");
      return;
    }
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    // Simulate payment
    setTimeout(() => {
      setPaymentSuccess(true);
      setTimeout(() => closePaymentModal(), 3000);
    }, 1000);
  };

  const BuyNowModal = ({ product, onClose }) => (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Buy {product?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Brand:</strong> {product?.brand}</p>
        <p><strong>Price:</strong> {product?.price}</p>
        <p>{product?.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleConfirmPurchase}>Confirm Purchase</Button>
      </Modal.Footer>
    </Modal>
  );

  const DetailsModal = ({ product, onClose }) => (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Details: {product?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Brand:</strong> {product?.brand}</p>
        <p><strong>Price:</strong> {product?.price}</p>
        <p>{product?.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );

  const PaymentModal = ({ onClose }) => (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{paymentSuccess ? "Payment Successful" : "Payment Options"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {paymentSuccess ? (
          <div className="text-center py-4">
            <div className="payment-success-icon mb-3">
              <svg width="64" height="64" viewBox="0 0 24 24">
                <path fill="#28a745" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h5 className="text-success">Payment Successful!</h5>
            <p>Thank you for your purchase.</p>
          </div>
        ) : (
          <>
            <h5>Choose your payment method:</h5>
            <div>
              <Button
                variant="outline-primary"
                className="mb-2 w-100"
                onClick={() => setPaymentMethod("card")}
              >
                Pay with Card
              </Button>
              <Button
                variant="outline-success"
                className="mb-2 w-100"
                onClick={() => setPaymentMethod("paypal")}
              >
                Pay with PayPal
              </Button>
              <Button variant="outline-info" className="mb-2 w-100" onClick={() => setPaymentMethod("cod")}>
                Cash On Delivery
              </Button>
            </div>

            {/* card details */}

            {
              paymentMethod === "card" && (
  <div className="mt-3">
    <label>Card Holder Name:</label>
    <input type="text" className="form-control mb-2" placeholder="Name" />

    <label>Card Number:</label>
    <input type="text" className="form-control mb-2" placeholder="1234 5678 9012 3456" />

    <label>Expiry Date:</label>
    <input type="text" className="form-control mb-2" placeholder="MM/YY" />

    <label>CVV:</label>
    <input type="password" className="form-control mb-2" placeholder="123" />
  </div>
)}

         { /* paypal details */}

            {
              paymentMethod === "paypal" && (
              <div className="mt-3">
                <label htmlFor="paypal-id">Enter PayPal ID:</label>
                <input
                  type="email"
                  id="paypal-id"
                  className="form-control"
                  placeholder="your@email.com"
                  value={paypalID}
                  onChange={(e) => setPaypalID(e.target.value)}
                />
              </div>
            )}
            <p className="mt-3 text-muted">
              After selecting your payment method, click Proceed to complete your order.
            </p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!paymentSuccess && (
          <>
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Button variant="primary" onClick={handleProceedToPayment}>Proceed to Payment</Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center">Fertilizers</h2>
      <div className="row">
        {fertilizerData.map((fertilizer) => (
          <div className="col-md-4 mb-3" key={fertilizer.id}>
            <div
              className="card p-3 text-center shadow"
              onClick={() => handleCardClick(fertilizer)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={fertilizer.image}
                alt={fertilizer.name}
                className="img-fluid fertilizer-image"
              />
              <h5 className="mt-2">{fertilizer.name}</h5>
              <p>{fertilizer.brand}</p>
              <h6>{fertilizer.price}</h6>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyNow(fertilizer);
                }}
              >
                Buy Now
              </button>
              <button
                className="btn btn-warning mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(fertilizer);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showModal && <BuyNowModal product={selectedFertilizer} onClose={() => setShowModal(false)} />}
      {showPaymentModal && <PaymentModal onClose={closePaymentModal} />}
      {showDetailsModal && (
        <DetailsModal
          product={selectedDetails}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default FertilizersPage;
