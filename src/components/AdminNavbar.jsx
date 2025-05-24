import React, { useState } from 'react';
// import './AdminNavbar.css';

const AdminNavbar = ({ onLogout }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    setDarkMode(!darkMode);
  };
  return (
    <nav className="admin-navbar d-flex justify-content-between align-items-center p-2 px-4 shadow-sm"
         style={{
           background: '#34495e',
           color: 'white',
           padding: '15px 20px',
         }}>
      <h3 style={{ margin: 0 }}>Admin Panel</h3>
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-outline-secondary" onClick={toggleDarkMode}>
        <i className={`bi ${darkMode ? 'bi-brightness-high' : 'bi-moon'} me-1`}></i>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      <button
        className="btn btn-outline-light"
        onClick={onLogout}
        style={{
          background: '#e74c3c',
          color: 'white',
          border: 'none',
          padding: '5px 12px',
          borderRadius: '4px',
          fontWeight: 'bold'
        }}
      >
        <i className="bi bi-box-arrow-right me-2"></i> Logout
      </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
