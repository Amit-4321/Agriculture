import React from 'react';
import './ProductManagement.css'; 

const ProductManagement = () => {
  return (
    <div className="admin-product-management">
      <h2 className="section-title">Manage Products</h2>
      <button className="add-btn">+ Add Product</button>

      <table className="product-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample Row */}
          <tr>
            <td>1</td>
            <td>Wheat Seeds</td>
            <td>Seeds</td>
            <td>₹250</td>
            <td>120</td>
            <td>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
