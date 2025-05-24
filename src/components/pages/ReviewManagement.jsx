import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ReviewManagement = () => {
  // Dummy data
  const reviews = [
    { id: 1, product: 'Wheat Seeds', user: 'Amit Saini', rating: 5, comment: 'Very good quality!' },
    { id: 2, product: 'Urea Fertilizer', user: 'Ravi Kumar', rating: 4, comment: 'Worked well on my crops.' },
  ];

  return (
    <div>
      <h2 className="mb-1"style={{ marginTop: "80px" }}>Review Management</h2>
      <Table striped bordered hover>
        <thead className="table-warning">
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>User</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.product}</td>
              <td>{review.user}</td>
              <td>{review.rating}</td>
              <td>{review.comment}</td>
              <td>
                <Button variant="danger" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ReviewManagement;
