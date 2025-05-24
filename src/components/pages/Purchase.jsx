
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Purchase.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";

import SeedsPage from "./SeedsPage";
import FarmingToolsPage from "./FarmingToolsPage";
import FertilizersPage from "./FertilizersPage";

function Purchase() {
  const navigate = useNavigate();
  const handleBuyNow = () => {
    navigate("/seeds");
  };

  return (
    <>
    <div className="container my-1 text-center">
      <h2 className="mb-4 pt-5">Purchase Agricultural Products</h2>
      <p>Find the best agricultural products, fertilizers, tools, and seeds here.</p>

      <div className="row">
        {/* Quality Seeds Section */}
        <div className="col-md-4 mb-4">
  {/* <div className="purchase-card" onClick={handleBuyNow}> */}
  <div className="purchase-card" onClick={() => navigate("/SeedsPage")}>
    <div className="purchase-card-img-container">
      <img src="seeds.jpeg" className="purchase-card-img" alt="Quality Seeds" />
    </div>
    <div className="purchase-card-body">
      <h5 className="purchase-card-title">
      quality Seeds</h5>
      <p className="purchase-card-text">Get the best Quality Seeds for your crops.</p>
      <button className="purchase-btn">Buy Now</button>
      {/* <button className="rent-btn" onClick={() => navigate("/rent")}>Rent Now</button> */}
    </div>
  </div>
</div>

        {/* Farming Tools Section */}
       
        <div className="col-md-4 mb-4">
  {/* <div className="purchase-card" onClick={handleBuyNow}> */}
  <div className="purchase-card" onClick={() => navigate("/FarmingToolsPage")}>
    <div className="purchase-card-img-container">
      <img src="tools.jpeg" className="purchase-card-img" alt="Organic Tools" />
    </div>
    <div className="purchase-card-body">
      <h5 className="purchase-card-title">Get Tools</h5>
      <p className="purchase-card-text">Get the best tools for your crops.</p>
      <button className="purchase-btn">Buy Now</button>
      <button className="rent-btn">Rent Now</button>
    </div>
  </div>
</div>


        {/* Organic Fertilizers Section */}
        
        <div className="col-md-4 mb-4">
  {/* <div className="purchase-card" onClick={handleBuyNow}> */}
  <div className="purchase-card" onClick={() => navigate("/FertilizersPage")}>
    <div className="purchase-card-img-container">
      <img src="fertilizers.jpeg" className="purchase-card-img" alt="Organic fertilizers" />
    </div>
    <div className="purchase-card-body">
      <h5 className="purchase-card-title">Get Fertilizers</h5>
      <p className="purchase-card-text">Get the best Fertilizers for your crops.</p>
      <button className="purchase-btn">Buy Now</button>
      <button className="rent-btn">Rent Now</button>
    </div>
  </div>
</div>

      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Purchase;

  