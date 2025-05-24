import React from "react";
import "./AdminSalesReport.css"; // optional custom css ke liye

const AdminSalesReport = () => {
  return (
    <div className="container admin-sales-container">
      <h2 className="admin-sales-title mb-4 text-center">Sales Reports</h2>

      <div className="table-responsive">
        <table className="table table-striped table-bordered admin-sales-table">
          <thead className="thead-dark">
            <tr>
              <th className="admin-sales-th">Date</th>
              <th className="admin-sales-th">Product</th>
              <th className="admin-sales-th">Quantity Sold</th>
              <th className="admin-sales-th">Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy Sales Row */}
            <tr className="admin-sales-tr text-center">
              <td className="admin-sales-td">2025-04-25</td>
              <td className="admin-sales-td">Fertilizer Pack</td>
              <td className="admin-sales-td">10</td>
              <td className="admin-sales-td">₹15,000</td>
            </tr>

            {/* Future me map se dynamic data la sakte ho */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSalesReport;
