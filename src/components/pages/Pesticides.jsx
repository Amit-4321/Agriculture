import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import "./Pesticides.css"; // Custom styles

const pesticidesData = [
  {
    id: 1,
    name: "Bayer Insecticide",
    brand: "AgriTech",
    price: "₹450",
    description: "High-quality insecticide for crop protection.",
    image: "babyer.png",
  },
  {
    id: 2,
    name: "Syngenta Pesticide",
    brand: "FarmCare",
    price: "₹550",
    description: "Powerful pesticide for pest control.",
    image: "pesti1.png",
  },
  {
    id: 3,
    name: "Organic Pest Killer",
    brand: "OrganicGrow",
    price: "₹380",
    description: "Eco-friendly pest killer for organic farming.",
    image: "/images/organic pest.jpg",
  },
  {
    id: 4,
    name: "Fast-Action Pesticide",
    brand: "GreenShield",
    price: "₹620",
    description: "Fast-action formula for immediate protection.",
    image: "/images/fast action.jpg",
  },
];

const Pesticides = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // ✅ new
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleShowConfirm = (product) => {
    setSelectedProduct(product);
    setShowConfirmModal(true);
  };

  const handleCloseConfirm = () => {
    setShowConfirmModal(false);
    setSelectedProduct(null);
  };

  const handleConfirmPurchase = () => {
    setShowConfirmModal(false);
    setShowPaymentModal(true);
  };

  const handleClosePayment = () => {
    setShowPaymentModal(false);
  };

  // ✅ Payment Done -> Show Success Modal
  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setShowSuccessModal(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
  };

  return (
    <Container className="pesticides-container">
      <h2 className="section-title"> Pesticides & Insecticides</h2>
      <Row className="justify-content-center">
        {pesticidesData.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="pesticide-card" onClick={() => handleShowConfirm(item)}>
              <div className="image-container">
                <Card.Img variant="top" src={item.image} className="product-image" />
              </div>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text className="price">{item.price}</Card.Text>
                <Button
                  className="buy-now-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShowConfirm(item);
                  }}
                >
                  Buy Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Confirm Purchase Modal */}
      <Modal show={showConfirmModal} onHide={handleCloseConfirm} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#8BC34A", color: "white" }}>
          <Modal.Title>Buy {selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5><b>Brand:</b> {selectedProduct?.brand}</h5>
          <h5><b>Price:</b> {selectedProduct?.price}</h5>
          <p>{selectedProduct?.description}</p>
          <Button variant="success" onClick={handleCloseConfirm} className="modal-btn">
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmPurchase} className="modal-btn">
            Confirm Purchase
          </Button>
        </Modal.Body>
      </Modal>

      {/* Payment Modal */}
      <Modal show={showPaymentModal} onHide={handleClosePayment} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Choose a payment method to complete your purchase:</p>
          <Button variant="success" className="modal-btn" onClick={handlePaymentSuccess}>
            💳 Pay with Card
          </Button>
          <Button variant="warning" className="modal-btn" onClick={handlePaymentSuccess}>
            📦 Cash on Delivery
          </Button>
          <Button variant="primary" className="modal-btn" onClick={handlePaymentSuccess}>
            🔄 UPI Payment
          </Button>
        </Modal.Body>
      </Modal>

      {/* ✅ Payment Successful Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccess} centered>
  <Modal.Header closeButton style={{ backgroundColor: "#4CAF50", color: "white" }}>
    <Modal.Title>Payment Successful!</Modal.Title>
  </Modal.Header>
  <Modal.Body className="text-center">
    {/* ✅ Tick Mark Animation */}
    <div className="success-animation">
      <div className="checkmark">&#10004;</div>
    </div>
    <h5 className="mt-3">Thank you for your purchase! 🎉</h5>
    <Button variant="success" onClick={handleCloseSuccess} className="modal-btn mt-3">
      Close
    </Button>
  </Modal.Body>
</Modal>
    </Container>
  );
};

export default Pesticides;
