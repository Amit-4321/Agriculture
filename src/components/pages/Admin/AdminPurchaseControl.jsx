import React from "react";
import { Link } from "react-router-dom";
import "./AdminPurchaseControl.css";

const AdminPurchaseControl = () => {
  return (
    <div className="admin-purchase-container">
      <h2 className="admin-title">Admin: Manage Purchase Items</h2>

      <div className="admin-purchase-cards">
        <Link to="/admin-seeds" className="admin-purchase-tile">
          <img src="/seeds.jpeg" alt="Seeds" />
          <h5 className="mt-2">Seeds</h5>
          <button className="admin-open-btn">Open</button>
        </Link>

        <Link to="/admin-fertilizers" className="admin-purchase-tile">
          <img src="/fertilizers.jpeg" alt="Fertilizers" />
          <h5 className="mt-2">Fertilizers</h5>
          <button className="admin-open-btn">Open</button>
        </Link>

        <Link to="/admin-tools" className="admin-purchase-tile">
          <img src="/tools.jpeg" alt="Tools" />
          <h5 className="mt-2">Tools</h5>
          <button className="admin-open-btn">Open</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPurchaseControl;
