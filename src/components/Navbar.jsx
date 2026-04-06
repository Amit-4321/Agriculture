import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "./pages/CartContext";

import LoginButton from "./pages/Login";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { cart } = useCart();

  const getActiveItem = () => hoveredItem || selectedItem;

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.classList.add("menu-open");
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.body.classList.remove("menu-open");
    }
  };

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <nav className="navbar expand-lg fixed-top">
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <span className="logo">AgriStore</span>
        </Link>

        {/* <div className="search-container">
          <input
            type="text"
            placeholder="Search for products..."
            className="search-input"
          />
          <i className="fa fa-search search-icon"></i>
        </div> */}
</div>
        <ul className="nav-links-desktop">
          <li>
            <div
              className="dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="dropdown-btn">Categories ▼</button>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li onClick={() => navigate("/seedsPage")}>Seeds</li>
                  <li onClick={() => navigate("/fertilizersPage")}>
                    Fertilizers
                  </li>
                  <li onClick={() => navigate("/Pesticides")}>Pesticides</li>
                  <li onClick={() => navigate("/farmingtoolspage")}>Tools</li>
                </ul>
              )}
            </div>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/crop">Crop</Link>
          </li>
          <li>
            <Link to="/purchase">Purchase</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <div className="menu-container">
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart className="cart-icon-img" />
            <span className="cart-count">{cart.length}</span>
          </Link>

          <LoginButton />
          <div className="d-flex align-items-center ">
            <select
              onChange={handleLanguageChange}
              value={i18n.language}
              className="form-select language-select "
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>

          <div className="menu-icon" onClick={toggleMenu}>
            {isOpen ? "✖" : "☰"}
          </div>
        </div>
      </nav>

      <ul className={`nav-links-mobile ${isOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>
        </li>
        <li>
          <Link to="/crop" onClick={() => setIsOpen(false)}>
            Crop
          </Link>
        </li>
        <li>
          <Link to="/blogs" onClick={() => setIsOpen(false)}>
            Blogs
          </Link>
        </li>
        <li>
          <Link to="/purchase" onClick={() => setIsOpen(false)}>
            Purchase
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </li>
      </ul>

      <div className={`content ${isOpen ? "menu-open" : ""}`}></div>
    </>
  );
}

export default Navbar;
