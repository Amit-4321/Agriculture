// pages/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import AddEditProduct from '../AddEditProduct';

const dummyProducts = [
  { id: 1, name: 'Wheat Seeds', price: '₹200', category: 'Seeds' },
  { id: 2, name: 'Urea Fertilizer', price: '₹150', category: 'Fertilizers' },
  { id: 3, name: 'Organic Pesticide', price: '₹180', category: 'Pesticides' },
];

const ProductList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(dummyProducts); // <-- add this too

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSaveProduct = (newProduct) => {
    if (selectedProduct) {
      const updatedList = products.map((p) =>
        p.id === selectedProduct.id ? { ...p, ...newProduct } : p
      );
      setProducts(updatedList);
    } else {
      const newId = products.length + 1;
      setProducts([...products, { ...newProduct, id: newId }]);
    }
  };

  const handleDeleteProduct = (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      const updatedList = products.filter((product) => product.id !== productId);
      setProducts(updatedList);
    }
  };
  

  return (
    <div className="product-list-container">
      <h2>Product Management</h2>
      <Button variant="success" onClick={handleAddProduct} className="mb-3">
        + Add Product
      </Button>

      <table className="table table-bordered table-hover text-center">
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleEditProduct(product)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product.id)}> Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddEditProduct
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSave={handleSaveProduct}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default ProductList;
