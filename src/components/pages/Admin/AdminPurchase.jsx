import React from "react";
import "./AdminPurchase.css";

const AdminPurchase = () => {
  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center pt-4">Manage Purchase Section</h2>

      <div className="row">
        {/* Seeds Card */}
        <div className="col-md-4 mb-4">
          <div className="admin-card">
            <img src="seeds.jpeg" alt="Seeds" className="admin-card-img" />
            <h5 className="admin-card-title">Quality Seeds</h5>
            <p className="admin-card-text">Best seeds for farming.</p>
            <div className="admin-card-actions">
              <button className="btn btn-sm btn-primary">Edit</button>
              <button className="btn btn-sm btn-danger ms-2">Delete</button>
            </div>
          </div>
        </div>

        {/* Tools Card */}
        <div className="col-md-4 mb-4">
          <div className="admin-card">
            <img src="tools.jpeg" alt="Tools" className="admin-card-img" />
            <h5 className="admin-card-title">Farming Tools</h5>
            <p className="admin-card-text">Top-quality tools.</p>
            <div className="admin-card-actions">
              <button className="btn btn-sm btn-primary">Edit</button>
              <button className="btn btn-sm btn-danger ms-2">Delete</button>
            </div>
          </div>
        </div>

        {/* Fertilizers Card */}
        <div className="col-md-4 mb-4">
          <div className="admin-card">
            <img src="fertilizers.jpeg" alt="Fertilizers" className="admin-card-img" />
            <h5 className="admin-card-title">Organic Fertilizers</h5>
            <p className="admin-card-text">High yield fertilizers.</p>
            <div className="admin-card-actions">
              <button className="btn btn-sm btn-primary">Edit</button>
              <button className="btn btn-sm btn-danger ms-2">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPurchase;
