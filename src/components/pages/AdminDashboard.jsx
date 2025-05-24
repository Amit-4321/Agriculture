import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../AdminSidebar';
import AdminNavbar from '../AdminNavbar';
import OrderManagement from './OrderManagement';
import ProductList from './ProductList';
import UserManagement from './UserManagement';
import ReviewManagement from './ReviewManagement';
import DashboardStats from './Admin/DashboardStats';
import CategoryManagement from './CategoryManagement';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isAdminLoggedIn) {
      navigate('/admin-login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin-login');
  };
  return (
    <div className="admin-dashboard d-flex">
      <AdminSidebar />
      <div className="admin-main-content flex-grow-1">
        <AdminNavbar  onLogout={handleLogout} />

        <div className="dashboard-content p-3">
          <Routes>
            <Route path="/" element={<DashboardStats />} /> {/* Default route */}
            <Route path="productlist" element={<ProductList />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="reviews" element={<ReviewManagement />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
        
        
          </Routes>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
