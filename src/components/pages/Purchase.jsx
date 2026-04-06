import React from "react";
import { useNavigate } from "react-router-dom";
import "./Purchase.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";

function Purchase() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div className="container my-1 text-center">
        <h2 className="mb-4 pt-5">{t("purchase.title")}</h2>
        <p>{t("purchase.subtitle")}</p>

        <div className="row">
          {/* Quality Seeds Section */}
          <div className="col-md-4 mb-4">
            <div className="purchase-card" onClick={() => navigate("/SeedsPage")}>
              <div className="purchase-card-img-container">
                <img src="seeds.jpeg" className="purchase-card-img" alt={t("Purchase.seeds.title")} />
              </div>
              <div className="purchase-card-body">
                <h5 className="purchase-card-title">{t("purchase.seeds.title")}</h5>
                <p className="purchase-card-text">{t("purchase.seeds.description")}</p>
                <button className="purchase-btn">{t("purchase.buttons.buy")}</button>
              </div>
            </div>
          </div>

          {/* Farming Tools Section */}
          <div className="col-md-4 mb-4">
            <div className="purchase-card" onClick={() => navigate("/FarmingToolsPage")}>
              <div className="purchase-card-img-container">
                <img src="tools.jpeg" className="purchase-card-img" alt={t("Purchase.tools.title")} />
              </div>
              <div className="purchase-card-body">
                <h5 className="purchase-card-title">{t("purchase.tools.title")}</h5>
                <p className="purchase-card-text">{t("purchase.tools.description")}</p>
                <button className="purchase-btn">{t("purchase.buttons.buy")}</button>
                <button className="rent-btn">{t("purchase.buttons.rent")}</button>
              </div>
            </div>
          </div>

          {/* Organic Fertilizers Section */}
          <div className="col-md-4 mb-4">
            <div className="purchase-card" onClick={() => navigate("/FertilizersPage")}>
              <div className="purchase-card-img-container">
                <img src="fertilizers.jpeg" className="purchase-card-img" alt={t("Purchase.fertilizers.title")} />
              </div>
              <div className="purchase-card-body">
                <h5 className="purchase-card-title">{t("purchase.fertilizers.title")}</h5>
                <p className="purchase-card-text">{t("purchase.fertilizers.description")}</p>
                <button className="purchase-btn">{t("purchase.buttons.buy")}</button>
                <button className="rent-btn">{t("purchase.buttons.rent")}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Purchase;