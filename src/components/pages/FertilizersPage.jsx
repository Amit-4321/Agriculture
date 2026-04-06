import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useCart } from "./CartContext";
import { useTranslation } from "react-i18next";
import BuyNowModal from "./BuyNowModal";
import "./fertilizersPage.css";

const FertilizersPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFertilizer, setSelectedFertilizer] = useState(null);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const { dispatch } = useCart();

  const translatedProducts = t("fertilizers.products", { returnObjects: true });
  const fertilizerData = [
    { ...translatedProducts[0], image: "/images/nitrogen-fertilizer.jpg" },
    { ...translatedProducts[1], image: "/images/organic-fertilizer.jpg" },
    { ...translatedProducts[2], image: "/images/compost-fertilizer.jpg" }
  ];

  const filteredFertilizers = fertilizerData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuyNow = (fertilizer) => {
    setSelectedFertilizer(fertilizer);
    setShowBuyModal(true);
  };

  const handleAddToCart = (fertilizer, e) => {
    e.stopPropagation();
    const confirmAdd = window.confirm(
      t("fertilizers.modals.addToCartConfirm", { name: fertilizer.name })
    );
    if (confirmAdd) {
      dispatch({ type: "ADD_TO_CART", payload: fertilizer });
    }
  };

  const handleCardClick = (fertilizer) => {
    setSelectedDetails(fertilizer);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedDetails(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">{t("fertilizers.pageTitle")}</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder={t("fertilizers.searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredFertilizers.length > 0 ? (
          filteredFertilizers.map((fertilizer) => (
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
                  {t("fertilizers.buttons.buyNow")}
                </button>
                <button
                  className="btn btn-warning mt-2"
                  onClick={(e) => handleAddToCart(fertilizer, e)}
                >
                  {t("fertilizers.buttons.addToCart")}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">{t("fertilizers.noResults")}</p>
        )}
      </div>

      {/* Reusable Buy Now Modal */}
      <BuyNowModal
  show={showBuyModal}
  onClose={() => setShowBuyModal(false)}
  product={selectedFertilizer}
  t={t}
/>

      {/* Product Details Modal */}
      {selectedDetails && showDetailsModal && (
        <div className="custom-modal-backdrop">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h5>{selectedDetails.name}</h5>
              <button
                className="close-btn"
                onClick={closeDetailsModal}
              >
                &times;
              </button>
            </div>
            <div className="custom-modal-body">
              <img
                src={selectedDetails.image}
                alt={selectedDetails.name}
                className="img-fluid mb-3"
              />
              <p><strong>{t("fertilizers.brand")}:</strong> {selectedDetails.brand}</p>
              <p><strong>{t("fertilizers.price")}:</strong> {selectedDetails.price}</p>
              <p>{selectedDetails.description}</p>
            </div>
            <div className="custom-modal-footer">
              <button className="btn btn-secondary" onClick={closeDetailsModal}>
                {t("fertilizers.buttons.close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilizersPage;
