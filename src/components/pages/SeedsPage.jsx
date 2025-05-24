import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./SeedsPage.css";
import { useCart } from "./CartContext";

const seedData = [
  {
    id: "vegetables-seeds",
    name: "Vegetables Seeds",
    brand: "Sagar Seeds",
    price: "100",
    description: "Premium quality vegetables seeds for a healthy and high-yield crop.",
    image: "/veg-seeds.jpeg",
  },
  {
    id: "garden-vegetable-seed",
    name: "Garden flowers Seeds",
    brand: "IFFDC",
    price: "200",
    description: "High-quality flowers seeds for an organic garden.",
    image: "/flowers-seeds.jpeg",
  },
  {
    id: "bio-seeds",
    name: "Fruits Seeds",
    brand: "ABS",
    price: "150",
    description: "Eco-friendly fruits seeds for sustainable farming.",
    image: "/fruits-seed.jpeg",
  },
];

const SeedsPage = () => {
  const { dispatch } = useCart();
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleBuyNow = (seed) => {
    setSelectedSeed(seed);
    setShowModal(true);
  };

  const handleConfirmPurchase = () => {
    setShowModal(false);
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setPaymentSuccess(false);
  };

  const handleProceedToPayment = () => {
    setTimeout(() => {
      setPaymentSuccess(true);
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentSuccess(false);
      }, 3000);
    }, 1000);
  };

  const handleAddToCart = (seed) => {
    dispatch({ type: "ADD_TO_CART", payload: seed });
    alert(`${seed.name} added to cart!`);
  };

  const BuyNowModal = ({ product, onClose }) => (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Buy {product?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Brand:</strong> {product?.brand}</p>
        <p><strong>Price:</strong> ₹{product?.price}</p>
        <p>{product?.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleConfirmPurchase}>Confirm Purchase</Button>
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
              <Button variant="outline-primary" className="mb-2 w-100">Pay with Card</Button>
              <Button variant="outline-success" className="mb-2 w-100">Cash On Delivery (COD)</Button>
              <Button variant="outline-info" className="mb-2 w-100">UPI Payment</Button>
            </div>
            <p>After selecting your payment method, you will be redirected to the payment gateway.</p>
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
      <h2 className="text-center">Online Seed Shop</h2>
      <div className="row">
        {seedData.map((seed) => (
          <div className="col-md-4 mb-3" key={seed.id}>
            <div className="card p-3 text-center shadow">
              <img src={seed.image} alt={seed.name} className="img-fluid seed-image" />
              <h5 className="mt-2">{seed.name}</h5>
              <p>{seed.brand}</p>
              <h6>₹{seed.price}</h6>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleAddToCart(seed)}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleBuyNow(seed)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && <BuyNowModal product={selectedSeed} onClose={() => setShowModal(false)} />}
      {showPaymentModal && <PaymentModal onClose={closePaymentModal} />}
    </div>
  );
};

export default SeedsPage;
