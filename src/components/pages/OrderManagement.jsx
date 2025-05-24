// pages/OrderManagement.jsx
import React, { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';

const initialOrders = [
  { id: 1, customer: 'Amit Kumar', product: 'Wheat Seeds', status: 'Pending' },
  { id: 2, customer: 'Raj Verma', product: 'Urea Fertilizer', status: 'Shipped' },
  { id: 3, customer: 'Priya Singh', product: 'Organic Pesticide', status: 'Delivered' },
];

const OrderManagement = () => {
  const [orders, setOrders] = useState(initialOrders);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const handleDeleteOrder = (orderId) => {
    const filteredOrders = orders.filter(order => order.id !== orderId);
    setOrders(filteredOrders);
  };

  return (
    <div className="container mt-4">
      <h2>Order Management</h2>
      <table className="table table-bordered table-hover text-center">
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Status</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.status}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle size="sm" variant="info">Change</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleStatusChange(order.id, 'Pending')}>Pending</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusChange(order.id, 'Shipped')}>Shipped</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusChange(order.id, 'Delivered')}>Delivered</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDeleteOrder(order.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
