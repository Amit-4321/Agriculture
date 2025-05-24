import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddEditProduct = ({ show, handleClose, onSave, selectedProduct }) => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    category: ''
  });

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    } else {
      setProductData({ name: '', price: '', category: '' });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = () => {
    if (!productData.name || !productData.price || !productData.category) {
      alert("Please fill all fields!");
      return;
    }
    onSave(productData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{selectedProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter price"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              name="category"
              value={productData.category}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="success" onClick={handleSubmit}>
          {selectedProduct ? 'Update' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditProduct;
