import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useCart } from "./CartContext";
import { useTranslation } from "react-i18next";
import "./farmingToolsPage.css";

const FarmingToolsPage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRentModal, setShowRentModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [rentDuration, setRentDuration] = useState(1);
  const [rentPrice, setRentPrice] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { dispatch } = useCart();

  const tools = t("tools.items", { returnObjects: true });

  const filteredTools = tools.filter((tool) => {
    const query = searchQuery.toLowerCase();
    return (
      tool.name.toLowerCase().includes(query) ||
      tool.brand.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query)
    );
  });

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

  const handleAddToCart = (tool) => {
    const confirmAdd = window.confirm(
      t("tools.alerts.confirmAdd", { name: tool.name })
    );
    if (confirmAdd) {
      dispatch({ type: "ADD_TO_CART", payload: tool });
    }
  };

  const handleProceedToPayment = () => {
    setTimeout(() => {
      setPaymentSuccess(true);
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentSuccess(false);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">{t("tools.title")}</h2>

      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder={t("tools.search")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </Form>

      <div className="row">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <div className="col-md-4 mb-3" key={tool.id}>
              <div className="card p-3 text-center shadow">
                <img src={tool.image} alt={tool.name} className="img-fluid tool-image" />
                <h5 className="mt-2">{tool.name}</h5>
                <p>{tool.brand}</p>
                <h6>₹{tool.price}</h6>
                <div className="d-grid gap-2">
                  <Button variant="primary" onClick={() => handleBuyNow(tool)}>
                    {t("tools.buyNow")}
                  </Button>
                  <Button variant="success" onClick={() => handleRentNow(tool)}>
                    {t("tools.rentNow")}
                  </Button>
                  <Button variant="warning" onClick={() => handleAddToCart(tool)}>
                    {t("tools.addToCart")}
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center my-4">
            <div className="alert alert-warning">
              {t("tools.noMatch", { query: searchQuery })}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("tools.buyNow")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>{t("tools.brand")}:</strong> {selectedTool?.brand}</p>
          <p><strong>{t("tools.price")}:</strong> ₹{selectedTool?.price}</p>
          <p>{selectedTool?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>{t("tools.close")}</Button>
          <Button variant="primary" onClick={handleConfirmPurchase}>{t("tools.confirmPurchase")}</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRentModal} onHide={() => setShowRentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("tools.rentNow")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>{t("tools.brand")}:</strong> {selectedTool?.brand}</p>
          <p><strong>{t("tools.baseRent")}:</strong> ₹{(selectedTool?.price * 0.1).toFixed(0)}</p>
          <Form.Label>{t("tools.duration")}</Form.Label>
          <Form.Select
            className="my-2"
            value={rentDuration}
            onChange={(e) => {
              const weeks = parseInt(e.target.value);
              setRentDuration(weeks);
              setRentPrice((selectedTool?.price * 0.1 * weeks).toFixed(0));
            }}
          >
            <option value={1}>1 week</option>
            <option value={2}>2 weeks</option>
            <option value={3}>3 weeks</option>
          </Form.Select>
          <p><strong>{t("tools.totalRent")}:</strong> ₹{rentPrice}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRentModal(false)}>{t("tools.close")}</Button>
          <Button variant="success" onClick={handleRentConfirm}>{t("tools.confirmRent")}</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPaymentModal} onHide={closePaymentModal}>
        <Modal.Header closeButton>
          <Modal.Title>{paymentSuccess ? t("tools.paymentSuccess") : t("tools.payment")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {paymentSuccess ? (
            <div className="text-success text-center py-3">
              <h4>{t("tools.successMsg")}</h4>
            </div>
          ) : (
            <>
              <h5>{t("tools.choosePayment")}</h5>
              <Button className="w-100 my-2" variant="outline-primary">{t("tools.card")}</Button>
              <Button className="w-100 my-2" variant="outline-success">{t("tools.cod")}</Button>
              <Button className="w-100 my-2" variant="outline-info">{t("tools.upi")}</Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!paymentSuccess && (
            <>
              <Button variant="secondary" onClick={closePaymentModal}>{t("tools.close")}</Button>
              <Button variant="primary" onClick={handleProceedToPayment}>{t("tools.proceed")}</Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FarmingToolsPage;
