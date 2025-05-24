import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  FaBars, FaTimes, FaChevronDown, FaSearch, FaRupeeSign, FaTags, FaStarHalfAlt, FaStoreAlt, FaShoppingBasket, FaSeedling
} from "react-icons/fa"; // ✅ Indian-style icons
import { GiFertilizerBag, GiChemicalTank } from "react-icons/gi"; // ✅ Agriculture-based icons
import "./Sidebar.css";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [price, setPrice] = useState(5000);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      <button className={`sidebar-toggle ${isOpen ? "move-right" : ""}`} onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
        
        {/* ✅ Search Box */}
        <div className="sidebar-search-box">
          <FaSearch className="sidebar-search-icon" />
          <input type="text" placeholder="Search products..." />
        </div>

        {/* ✅ All Products */}
        <div className="category">
          <button className="category-header">
            <FaShoppingBasket /> <span className="category-text">All Products</span>
          </button>
        </div>

        {/* ✅ Purchase Section */}
        <div className={`category ${openSection === "purchase" ? "open" : ""}`}>
          <button className="category-header" onClick={() => toggleSection("purchase")}>
            <FaShoppingBasket /> <span className="category-text">Purchase</span>
            <FaChevronDown className={`arrow ${openSection === "purchase" ? "open" : ""}`} />
          </button>
          {openSection === "purchase" && (
            <ul className="sub-menu">
              <li><Link to="/seedsPage"><FaSeedling /> <span className="category-text">SeedsPage</span></Link></li>
              <li><Link to="/fertilizersPage"><GiFertilizerBag /> <span className="category-text">Fertilizers</span></Link></li>
              <li><Link to="/pesticides"><GiChemicalTank /> <span className="category-text">Pesticides</span></Link></li>
              <li><Link to="/farmingToolspage"><GiChemicalTank /> <span className="category-text">Tools</span></Link></li>
            </ul>
          )}
        </div>

        {/* ✅ Price Range */}
        <div className="price-range">
          <h3><FaRupeeSign /> Price Range</h3>
          <div className="range-container">
            <span className="range-label">₹0</span>
            <div className="slider-wrapper">
              <span className="tooltip" style={{ left: `${(price / 10000) * 100}%` }}>
                ₹{price}
              </span>
              <input type="range" min="0" max="10000" value={price} onChange={handlePriceChange} />
            </div>
            <span className="range-label">₹10000</span>
          </div>
        </div>

        {/* ✅ Brand Section */}
        <div className={`category ${openSection === "brands" ? "open" : ""}`}>
          <button className="category-header" onClick={() => toggleSection("brands")}>
            <FaStoreAlt /> <span className="category-text">Top Brands</span>
            <FaChevronDown className={`arrow ${openSection === "brands" ? "open" : ""}`} />
          </button>
          {openSection === "brands" && (
            <ul className="sub-menu">
              <li><Link to="/brand1">Brand 1</Link></li>
              <li><Link to="/brand2">Brand 2</Link></li>
              <li><Link to="/brand3">Brand 3</Link></li>
            </ul>
          )}
        </div>

        {/* ✅ Offers Section */}
        <div className={`category ${openSection === "offers" ? "open" : ""}`}>
          <button className="category-header" onClick={() => toggleSection("offers")}>
            <FaTags /> <span className="category-text">Offers</span>
            <FaChevronDown className={`arrow ${openSection === "offers" ? "open" : ""}`} />
          </button>
          {openSection === "offers" && (
            <ul className="sub-menu">
              <li><Link to="/discounts">Discounts</Link></li>
              <li><Link to="/flash-sales">Flash Sales</Link></li>
            </ul>
          )}
        </div>

        {/* ✅ Ratings Section */}
        <div className={`category ${openSection === "ratings" ? "open" : ""}`}>
          <button className="category-header" onClick={() => toggleSection("ratings")}>
            <FaStarHalfAlt /> <span className="category-text">Ratings</span>
            <FaChevronDown className={`arrow ${openSection === "ratings" ? "open" : ""}`} />
          </button>
          {openSection === "ratings" && (
            <ul className="sub-menu">
              <li><Link to="/ratings/4">⭐ 4 & Above</Link></li>
              <li><Link to="/ratings/3">⭐⭐ 3 & Above</Link></li>
              <li><Link to="/ratings/2">⭐⭐⭐ 2 & Above</Link></li>
            </ul>
          )}
        </div>

      </div>
    </>
  );
};

export default Sidebar;
