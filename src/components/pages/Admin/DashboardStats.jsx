import React from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import './DashboardStats.css';

const DashboardStats = () => {
  const productData = [
    { name: 'Seeds', value: 40 },
    { name: 'Fertilizers', value: 30 },
    { name: 'Pesticides', value: 20 },
    { name: 'Others', value: 10 },
  ];

  const orderData = [
    { month: 'Jan', orders: 20 },
    { month: 'Feb', orders: 35 },
    { month: 'Mar', orders: 50 },
    { month: 'Apr', orders: 70 },
  ];

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="dashboard-stats">
      <h3>Analytics Overview</h3>
      
      <div className="charts-container">
        {/* Pie Chart for Product Categories */}
        <div className="chart-box">
          <h5>Products by Category</h5>
          <PieChart width={300} height={300}>
            <Pie data={productData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {productData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Bar Chart for Orders */}
        <div className="chart-box">
          <h5>Monthly Orders</h5>
          <BarChart width={400} height={300} data={orderData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
