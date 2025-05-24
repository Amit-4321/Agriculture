import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'animate.css';

import Sidebar from "./components/pages/Sidebar"; 
import SeedsPage from "./components/pages/SeedsPage";
import FertilizersPage from "./components/pages/FertilizersPage";
import Pesticides from "./components/pages/Pesticides";
import ProductListing from "./components/pages/ProductListing";
import FarmingToolsPage from "./components/pages/FarmingToolsPage";
import SeedDetails from "./components/pages/SeedDetails";

import Brand1 from "./components/pages/Brand1";
import Brand1Products from "./components/pages/Brand1Products";

import Brand2 from "./components/pages/Brand2";
import Brand2Products from "./components/pages/Brand2Products";

import Brand3 from "./components/pages/Brand3";
import Brand3Products from "./components/pages/Brand3Products";
import Discounts from "./components/pages/Discounts";
import FlashSales from "./components/pages/FlashSales";
import Ratings from "./components/pages/Ratings";

import Navbar from "./components/Navbar";
import Cart from "./components/pages/Cart";
import './components/Navbar.css';

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Crop from "./components/pages/Crop";
import Purchase from "./components/pages/Purchase";
import MarketPrice from "./components/pages/MarketPrice";

// import RentNow from "./components/pages/RentNow";

import Agriculturists from "./components/pages/Agriculturists";
import Blogs from "./components/pages/Blogs";
import Contact from "./components/pages/Contact";
import Login from "./components/pages/Login";
import SeasonWise from "./components/pages/SeasonWise";
import SoilType from "./components/pages/SoilType";

 // admin section
 import AdminDashboard from "./components/pages/AdminDashboard";
import AdminSidebar from "./components/AdminSidebar";
import AdminNavbar from "./components/AdminNavbar";
import ProductManagement from "./components/pages/Admin/ProductManagement";
import ProductList from "./components/pages/ProductList";
import UserManagement from "./components/pages/UserManagement";
import ReviewManagement from "./components/pages/ReviewManagement";
import OrderManagement from "./components/pages/OrderManagement";
import DashboardStats from "./components/pages/Admin/DashboardStats";
import AdminLogin from "./components/pages/Admin/AdminLogin";
import AdminPurchase from "./components/pages/Admin/AdminPurchase";
import AdminSeedsControl from "./components/pages/Admin/AdminSeedsControl";
import AdminFertilizersControl from "./components/pages/Admin/AdminFertilizersControl";
import AdminToolsControl from "./components/pages/Admin/AdminToolsControl";
import AdminPurchaseControl from "./components/pages/Admin/AdminPurchaseControl";
import AdminRentals from "./components/pages/Admin/AdminRentals";
import AdminPayments from "./components/pages/Admin/AdminPayments";
import AdminSalesReport from "./components/pages/Admin/AdminSalesReports";
import AdminSiteSettings from "./components/pages/Admin/AdminSiteSettings";
import { CartProvider } from "./components/pages/CartContext";
import OrderHistory from "./components/pages/OrderHistory";

function App() {
  return (
  <CartProvider>

    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/seedsPage" element={<SeedsPage />} />
        <Route path="/seedsDetails" element={<SeedDetails />} />
        <Route path="/fertilizersPage" element={<FertilizersPage />} />
        <Route path="/pesticides" element={<Pesticides />} />
        <Route path="/farmingToolsPage" element={<FarmingToolsPage />} />
        <Route path="/productListing" element={<ProductListing />} />
        <Route path="/brand1" element={<Brand1 />} />
        <Route path="/brand1-products" element={<Brand1Products />} />
        <Route path="/brand2-products" element={<Brand2Products />} />
        <Route path="/brand3-products" element={<Brand3Products />} />

         <Route path="/brand2" element={<Brand2 />} />
         <Route path="/brand3" element={<Brand3 />} />
         <Route path="/discounts" element={<Discounts />} />
         <Route path="/flash-sales" element={<FlashSales />} />
         <Route path="/ratings" element={<Ratings />} />
         <Route path="/ratings/:filterRating?" element={<Ratings />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/crop" element={<Crop />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/market-price" element={<MarketPrice />} />
       

        {/* <Route path="/rent" element={<RentNow />} /> */}
      
        <Route path="/agriculturists" element={<Agriculturists />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/season-wise" element={<SeasonWise />} />  {/* ✅ New Route */}
        <Route path="/soil-type" element={<SoilType />} />  
        <Route path="/order-history" element={<OrderHistory />} />  
      


       {/* admin section */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/admin-sidebar" element={<AdminSidebar />} />
        <Route path="/adminNavbar" element={<AdminNavbar />} />
        <Route path="/admin/product-management" element={<ProductManagement />} />
        <Route path="/admin/productlist" element={<ProductList />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/reviews" element={<ReviewManagement />} />
        <Route path="/admin/orders" element={<OrderManagement />} />
        <Route path="/admin/dashboard-stats" element={<DashboardStats />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/admin-login" element={<AdminLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-purchase" element={<AdminPurchase />} />
        <Route path="/admin-seeds" element={<AdminSeedsControl />} />
        <Route path="/admin-fertilizers" element={<AdminFertilizersControl />} />
        <Route path="/admin-tools" element={<AdminToolsControl />} />
        <Route path="/admin-manage-purchase" element={<AdminPurchaseControl />} />
        <Route path="/admin-rentals" element={<AdminRentals />} />
        <Route path="/admin-payment" element={<AdminPayments />} />
        <Route path="/admin-sales-reports" element={<AdminSalesReport />} />
        <Route path="/admin-sites-setting" element={<AdminSiteSettings />} />

      
      
      </Routes>
    </Router>
  </CartProvider>
    
  );
}

export default App;
