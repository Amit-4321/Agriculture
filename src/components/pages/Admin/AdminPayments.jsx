import React from "react";
import "./AdminPayments.css"; // optional custom css ke liye

const AdminPayments = () => {
  return (
    <div className="container admin-payment-container">
      <h2 className="admin-payment-title mb-4 text-center">Manage Payments</h2>

      <div className="table-responsive">
        <table className="table table-striped table-bordered admin-payment-table">
          <thead className="thead-dark">
            <tr>
              <th className="admin-payment-th">User</th>
              <th className="admin-payment-th">Product</th>
              <th className="admin-payment-th">Amount</th>
              <th className="admin-payment-th">Date</th>
              <th className="admin-payment-th">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy payment row */}
            <tr className="admin-payment-tr text-center">
              <td className="admin-payment-td">Alice</td>
              <td className="admin-payment-td">Seeder</td>
              <td className="admin-payment-td">₹2000</td>
              <td className="admin-payment-td">2025-04-25</td>
              <td className="admin-payment-td">
                <span className="badge badge-success">Success</span>
              </td>
            </tr>

            {/* More payments map se laa sakte hai future me */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPayments;
