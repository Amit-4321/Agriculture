// import React from 'react';
import React, { useState } from 'react';
// import "./AdminSidebar.css";

import { Link } from 'react-router-dom';
<li><Link to="/admin/manage-purchase">Manage Purchase</Link></li>



const AdminSidebar = () => {

;

  return (
    
    <div className="admin-sidebar p-3 bg-light" style={{ marginTop: "80px" }}>
      <h3 className="text-center mb-4">Admin Panel</h3>
      <ul className="sidebar-list list-unstyled">
        <li><Link to="">Dashboard</Link></li>
        <li><Link to="/admin/productlist">Manage Products</Link></li>
        <li><Link to="orders">Manage Orders</Link></li>
        <li><Link to="users">Manage Users</Link></li>
        <li><Link to="reviews">Manage Reviews</Link></li>
      <li> <a href="/admin/categories">Manage Categories</a> </li>
      <li><Link to="/admin-manage-purchase">Manage Purchase</Link> </li> 
      <li><Link to="/admin-rentals">Manage Rental</Link> </li> 
      <li><Link to="/admin-payment">Manage Payments</Link> </li> 
      <li><Link to="/admin-sales-reports">Manage Sales Reports</Link> </li> 
      <li><Link to="/admin-sites-setting">Setting</Link> </li> 
      </ul>
   
      
    </div>
    
    
  );
};

export default AdminSidebar;
