import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from react-bootstrap
import "./AdminSeedsControl.css"

const seedData = [
  {
    id: "vegetables-seeds",
    name: "Vegetables Seeds",
    brand: "Sagar Seeds",
    price: "100",
    description: "Premium quality vegetables seeds for a healthy and high-yield crop.",
    image: "/veg-seeds.jpeg",
  },
  {
    id: "garden-vegetable-seed",
    name: "Garden flowers Seeds",
    brand: "IFFDC",
    price: "200",
    description: "High-quality flowers seeds for an organic garden.",
    image: "/flowers-seeds.jpeg",
  },
  {
    id: "bio-seeds",
    name: "Fruits Seeds",
    brand: "ABS",
    price: "150",
    description: "Eco-friendly fruits seeds for sustainable farming.",
    image: "/fruits-seed.jpeg",
  },
];

const AdminSeedsControl = () => {
  const [showSeeds, setShowSeeds] = useState(false);
  const [products, setProducts] = useState(seedData);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    const product = products.find(item => item.id === id);
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updated = products.filter((item) => item.id !== productToDelete.id);
    setProducts(updated);
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for product ID: ${id} will be added soon!`);
    // Later you can implement a modal form to update the product
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Admin: Manage Seed Products</h2>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productToDelete && (
            <>
              <p>Are you sure you want to delete this product?</p>
              <h5>{productToDelete.name}</h5>
              <p>Brand: {productToDelete.brand}</p>
              <p>This action cannot be undone.</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {!showSeeds ? (
        <div className="text-center">
          <div className="card shadow p-4 d-inline-block" style={{ width: "300px" }}>
            <img src="/seeds.jpeg" alt="Seeds" className="img-fluid" />
            <h4 className="mt-3">Seeds</h4>
            <button className="btn btn-success mt-2" onClick={() => setShowSeeds(true)}>Open</button>
          </div>
        </div>
      ) : (
        <div>
          <h4 className="text-center mb-3">All Seed Products</h4>
          <div className="row">
            {products.map((item) => (
              <div className="col-md-4 mb-4" key={item.id}>
                <div className="card shadow p-3">
                  <img src={item.image} alt={item.name} className="img-fluid mb-2" />
                  <h5>{item.name}</h5>
                  <p><strong>Brand:</strong> {item.brand}</p>
                  <p><strong>Price:</strong> ₹{item.price}</p>
                  <p>{item.description}</p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-warning" onClick={() => handleEdit(item.id)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteClick(item.id)}>Delete</button>
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

export default AdminSeedsControl;