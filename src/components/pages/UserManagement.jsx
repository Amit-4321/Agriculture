import React from 'react';
import { Table, Button } from 'react-bootstrap';

const UserManagement = () => {
  // Dummy data
  const users = [
    { id: 1, name: 'Amit Saini', email: 'amit@example.com', role: 'Admin' },
    { id: 2, name: 'Ravi Kumar', email: 'ravi@example.com', role: 'Customer' },
    { id: 3, name: 'Sneha Verma', email: 'sneha@example.com', role: 'Customer' },
  ];

  return (
    <div>
      <h2 className="mb-4"style={{ marginTop: "80px" }}>User Management</h2>
      <Table striped bordered hover>
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2">Edit</Button>
                <Button variant="danger" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManagement;
