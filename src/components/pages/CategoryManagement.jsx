// pages/CategoryManagement.jsx

import React, { useState } from 'react';
import './CategoryManagement.css';
import { CSVLink } from "react-csv";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Seeds' },
    { id: 2, name: 'Fertilizers' },
    { id: 3, name: 'Pesticides' }
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() === '') return;
    const newEntry = {
      id: categories.length + 1,
      name: newCategory
    };
    setCategories([...categories, newEntry]);
    setNewCategory('');
  };

  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditValue(name);
  };

  const handleUpdate = (id) => {
    const updated = categories.map((cat) =>
      cat.id === id ? { ...cat, name: editValue } : cat
    );
    setCategories(updated);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      const filtered = categories.filter((cat) => cat.id !== id);
      setCategories(filtered);
    }
  };
  
  return (
    <div className="category-management">
      <h2>Category Management</h2>
      <div className="add-category mb-3">
        <input
          type="text"
          value={newCategory}
          placeholder="Enter category name"
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>
                {editingId === cat.id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                ) : (
                  cat.name
                )}
              </td>
              <td>
                {editingId === cat.id ? (
                  <button onClick={() => handleUpdate(cat.id)}>Update</button>
                ) : (
                  <button onClick={() => handleEdit(cat.id, cat.name)}>Edit</button>
                )}
                <button onClick={() => handleDelete(cat.id)}>Delete</button>

                <CSVLink 
  data={categories} 
  filename={"categories-report.csv"} 
  className="btn btn-success mb-3"
>
  Download CSV
</CSVLink>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManagement;
