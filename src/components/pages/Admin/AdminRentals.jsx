import React from "react";
import "./AdminRentals.css"; // (agar extra custom css chahiye future me)

const AdminRentals = () => {
  return (
    <div className="container admin-rent-container">
      <h2 className="admin-rent-title mb-4 text-center">Manage Rentals</h2>

      <div className="table-responsive">
        <table className="table table-striped table-bordered admin-rent-table">
          <thead className="thead-dark">
            <tr>
              <th className="admin-rent-th">User</th>
              <th className="admin-rent-th">Tool/Fertilizer</th>
              <th className="admin-rent-th">Duration</th>
              <th className="admin-rent-th">Status</th>
              <th className="admin-rent-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy Rental Row */}
            <tr className="admin-rent-tr text-center">
              <td className="admin-rent-td">John Doe</td>
              <td className="admin-rent-td">Tractor</td>
              <td className="admin-rent-td">2 Weeks</td>
              <td className="admin-rent-td">
                <span className="badge badge-warning">Pending</span>
              </td>
              <td className="admin-rent-td">
                <button className="btn btn-success btn-sm mr-2 admin-rent-approve-btn">
                  Approve
                </button>
                <button className="btn btn-danger btn-sm admin-rent-reject-btn">
                  Reject
                </button>
              </td>
            </tr>

            {/* You can map more rentals here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRentals;
