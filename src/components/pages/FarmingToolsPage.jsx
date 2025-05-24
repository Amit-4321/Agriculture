import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useCart } from "./CartContext";

import "./farmingToolsPage.css";

const farmingToolsData = [
  {
    id: "plow-tool",
    name: "Plow Tool",
    brand: "AgriTech",
    price: "499",
    description: "Durable plow tool for effective soil tilling.",
    image: "/images/plow tools.jpeg",
  },
  {
    id: "harrow-tool",
    name: "Harrow Tool",
    brand: "FarmMate",
    price: "399",
    description: "Heavy-duty harrow tool for soil aeration.",
    image: "/images/harrow tool.jpeg",
  },
  {
    id: "sprayer-tool",
    name: "Sprayer Tool",
    brand: "SprayMaster",
    price: "299",
    description: "Efficient sprayer tool for uniform pesticide application.",
    image: "/images/sprayer-tool.jpeg",
  },
];

const FarmingToolsPage = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRentModal, setShowRentModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [rentDuration, setRentDuration] = useState(1);
  const [rentPrice, setRentPrice] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleBuyNow = (tool) => {
    setSelectedTool(tool);
    setShowModal(true);
  };

  const handleConfirmPurchase = () => {
    setShowModal(false);
    setShowPaymentModal(true);
  };

  const handleRentNow = (tool) => {
    const baseRent = Number(tool.price) * 0.1;
    setSelectedTool(tool);
    setRentDuration(1);
    setRentPrice(baseRent.toFixed(0));
    setShowRentModal(true);
  };

  const handleRentConfirm = () => {
    setShowRentModal(false);
    setShowPaymentModal(true);
  };

  

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setPaymentSuccess(false);
  };

  // add to cart
  const { dispatch } = useCart();
  const handleAddToCart = (tool) => {
    const confirmAdd = window.confirm(`Kya aap "${tool.name}" ko cart mein add karna chahte hain?`);
    if (confirmAdd) {
      dispatch({ type: 'ADD_TO_CART', payload: tool });
    }
  };

  const handleProceedToPayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
      
      // Close modal after 3 seconds
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentSuccess(false);
      }, 2000);
    }, 1000);
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

  const RentModal = ({ product, onClose }) => {
    const baseRent = Number(product?.price) * 0.1;

    return (
      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rent {product?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Brand:</strong> {product?.brand}</p>
          <p><strong>Base Rent/Week:</strong> ₹{baseRent.toFixed(0)}</p>
          <label>Duration (weeks):</label>
          <select
            className="form-select my-2"
            value={rentDuration}
            onChange={(e) => {
              const weeks = parseInt(e.target.value);
              setRentDuration(weeks);
              setRentPrice((baseRent * weeks).toFixed(0));
            }}
          >
            <option value={1}>1 week</option>
            <option value={2}>2 weeks</option>
            <option value={3}>3 weeks</option>
          </select>
          <p><strong>Total Rent:</strong> ₹{rentPrice}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button variant="success" onClick={handleRentConfirm}>Confirm Rent</Button>
        </Modal.Footer>
      </Modal>
    );
  };

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
      <h2 className="text-center">Farming Tools</h2>
      <div className="row">
        {farmingToolsData.map((tool) => (
          <div className="col-md-4 mb-3" key={tool.id}>
            <div className="card p-3 text-center shadow">
              <img
                src={tool.image}
                alt={tool.name}
                className="img-fluid tool-image"
              />
              <h5 className="mt-2">{tool.name}</h5>
              <p>{tool.brand}</p>
              <h6>₹{tool.price}</h6>
              <button className="btn btn-primary" onClick={() => handleBuyNow(tool)}>Buy Now</button>
              <button className="btn btn-success mt-2" onClick={() => handleRentNow(tool)}>Rent Now</button>
              <button className="btn btn-warning mt-2" onClick={() => handleAddToCart(tool)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && <BuyNowModal product={selectedTool} onClose={() => setShowModal(false)} />}
      {showRentModal && <RentModal product={selectedTool} onClose={() => setShowRentModal(false)} />}
      {showPaymentModal && <PaymentModal onClose={closePaymentModal} />}
    </div>
  );
};

export default FarmingToolsPage;