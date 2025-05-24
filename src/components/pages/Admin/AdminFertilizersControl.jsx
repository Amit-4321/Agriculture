import React, { useState } from "react";
import "./AdminFertilizersControl.css";

const fertilizerData = [
  {
    id: "organic-fertilizer",
    name: "Organic Fertilizer",
    brand: "AgriGrow",
    price: "₹150",
    description: "High-quality organic fertilizer for sustainable farming.",
    image: "/images/organic-fertilizer.jpg",
  },
  {
    id: "nitrogen-fertilizer",
    name: "Nitrogen Fertilizer",
    brand: "GreenBoost",
    price: "₹199",
    description: "Essential nitrogen-based fertilizer for plant growth.",
    image: "/images/nitrogen-fertilizer.jpg",
  },
  {
    id: "compost-fertilizer",
    name: "Compost Fertilizer",
    brand: "EcoFarm",
    price: "₹299",
    description: "Nutrient-rich compost fertilizer to enhance soil fertility.",
    image: "/images/compost-fertilizer.jpg",
  },
];

const AdminFertilizersControl = () => {
  const [showFertilizers, setShowFertilizers] = useState(false);
  const [products, setProducts] = useState(fertilizerData);

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      const updatedProducts = products.filter(item => item.id !== id);
      setProducts(updatedProducts);
    }
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for fertilizer ID: ${id} will be implemented soon!`);
  };

  return (
    <div className="admin-fertilizer-container">
      <h2 className="admin-fertilizer-text-center admin-fertilizer-mb-4">Admin: Manage Fertilizers</h2>

      {!showFertilizers ? (
        <div className="admin-fertilizer-center-wrapper">
          <div className="admin-fertilizer-card admin-fertilizer-shadow admin-fertilizer-p-4 admin-fertilizer-hover-card">
            <img src="/fertilizers.jpeg" alt="Fertilizers" className="admin-img-fluid" />
            <h4 className="admin-fertilizer-mt-3 admin-fertilizer-text-center">Fertilizers</h4>
            <button
              className="admin-fertilizer-btn admin-fertilizer-btn-success admin-fertilizer-mt-2"
              onClick={() => setShowFertilizers(true)}
            >
              Open
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h4 className="admin-fertilizer-text-center admin-fertilizer-mb-3">All Fertilizer Products</h4>
          <div className="admin-fertilizer-row">
            {products.map((item) => (
              <div className="admin-fertilizer-col-md-4 admin-fertilizer-mb-4" key={item.id}>
                <div className="admin-fertilizer-card admin-fertilizer-shadow admin-fertilizer-p-3 admin-fertilizer-hover-card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="admin-fertilizer-img-fluid admin-fertilizer-mb-2"
                  />
                  <h5>{item.name}</h5>
                  <p><strong>Brand:</strong> {item.brand}</p>
                  <p><strong>Price:</strong> {item.price}</p>
                  <p>{item.description}</p>
                  <div className="admin-fertilizer-d-flex admin-fertilizer-justify-content-between">
                    <button
                      className="admin-fertilizer-btn admin-fertilizer-btn-warning"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="admin-fertilizer-btn admin-fertilizer-btn-danger"
                      onClick={() => handleDelete(item.id, item.name)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFertilizersControl;
