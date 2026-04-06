import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./SeedsPage.css";
import { useCart } from "./CartContext";
import { useTranslation } from "react-i18next";



const SeedsPage = () => {
  const { t } = useTranslation();
  const { dispatch } = useCart();
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get translated seed data
  const translatedSeeds = t("seeds.products", { returnObjects: true });
  
  // Combine with static image imports
  const seedData = translatedSeeds.map((seed, index) => {
    let image;
    switch(index) {
      case 0: image = "/veg-seeds.jpeg"; break;
      case 1: image = "/flowers-seeds.jpeg"; break;
      case 2: image ="/fruits-seed.jpeg"; break;
      default: image = "";
    }
    return { ...seed, image };
  });

  const handleBuyNow = (seed) => {
    setSelectedSeed(seed);
    setShowModal(true);
  };

  const handleAddToCart = (seed) => {
    dispatch({ type: "ADD_TO_CART", payload: seed });
    alert(`${seed.name} ${t("seeds.addedToCartAlert")}`);
  };

  const handleConfirmPurchase = () => {
    dispatch({ type: "ADD_TO_CART", payload: selectedSeed });
    alert(`${selectedSeed.name} ${t("seeds.addedToCartAlert")}`);
    setShowModal(false);
  };

  const filteredSeeds = seedData.filter(
    (seed) =>
      seed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seed.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seed.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center">{t("seeds.pageTitle")}</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder={t("seeds.searchPlaceholder")}
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredSeeds.length > 0 ? (
          filteredSeeds.map((seed) => (
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
                    {t("seeds.buttons.addToCart")}
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleBuyNow(seed)}
                  >
                    {t("seeds.buttons.buyNow")}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted w-100">{t("seeds.noResults")}</p>
        )}
      </div>

      <BuyNowModal
        show={showModal}
        onClose={() => setShowModal(false)}
        product={selectedSeed}
        onConfirm={handleConfirmPurchase}
        t={t}
      />
    </div>
  );
};

const BuyNowModal = ({ show, onClose, product, onConfirm, t }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("seeds.buttons.buyNow")} {product?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>{t("seeds.brandLabel")}</strong> {product?.brand}</p>
        <p><strong>{t("seeds.priceLabel")}</strong> ₹{product?.price}</p>
        <p>{product?.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>{t("seeds.buttons.close")}</Button>
        <Button variant="primary" onClick={onConfirm}>{t("seeds.buttons.addtocart")}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SeedsPage;