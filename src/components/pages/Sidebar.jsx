import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars, FaTimes, FaChevronDown, FaSearch, FaRupeeSign, FaTags,
  FaStarHalfAlt, FaStoreAlt, FaShoppingBasket, FaSeedling
} from "react-icons/fa";
import { GiFertilizerBag, GiChemicalTank } from "react-icons/gi";
import "./Sidebar.css";

const allProducts = [
  { id: 1, name: "Vegetables Seeds", path: "/seedsPage" },
  { id: 2, name: "Garden flowers Seeds", path: "/seedsPage" },
  { id: 3, name: "Fruits Seeds", path: "/seedsPage" },
  { id: 4, name: "Organic Fertilizer", path: "/fertilizersPage" },
  { id: 5, name: "Nitrogen Fertilizer", path: "/fertilizersPage" },
  { id: 6, name: "Compost Fertilizer", path: "/fertilizersPage" },
  { id: 7, name: "Bayer Insecticide", path: "/pesticides" },
  { id: 8, name: "Syngenta Pesticide", path: "/pesticides" },
  { id: 9, name: "Organic Pest Killer", path: "/pesticides" },
  { id: 10, name: "Plow Tool", path: "/farmingToolspage" },
  { id: 11, name: "Harrow Tool", path: "/farmingToolspage" },
  { id: 12, name: "Sprayer Tool", path: "/farmingToolspage" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [price, setPrice] = useState(5000);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const sidebarRef = useRef(null);
  const resultsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
        setSuggestions([]);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (suggestions.length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [suggestions]);

  const handlePriceChange = (e) => setPrice(e.target.value);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSection = (section) => setOpenSection(openSection === section ? null : section);

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 0) {
      const filtered = allProducts.filter((item) =>
        item.name.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (item) => {
    navigate(item.path);
    setQuery("");
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <>
      <button className={`sidebar-toggle ${isOpen ? "move-right" : ""}`} onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-search-box-wrapper">
          <div className="sidebar-search-box">
            <FaSearch className="sidebar-search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={handleSearch}
            />
              {query && (
    <span className="sidebar-clear-icon" onClick={() => {
      setQuery("");
      setSuggestions([]);
    }}>
      &times;
    </span>
  )}
          </div>

          {suggestions.length > 0 && (
            <>
            <ul className="sidebar-search-results" ref={resultsRef}>
              {suggestions.map((item) => (
                <li key={item.id} onClick={() => handleSuggestionClick(item)}>
                  {item.name}
                </li>
              ))}
            </ul>
            <div id="scroll-anchor" style={{ height: "1px" }} ref={resultsRef}></div>
            </>
          )}
        </div>

        <div className="category">
          <button className="category-header">
            <FaShoppingBasket /> <span className="category-text">All Products</span>
          </button>
        </div>

        <div className={`category ${openSection === "purchase" ? "open" : ""}`}>
          <button className="category-header" onClick={() => toggleSection("purchase")}>
            <FaShoppingBasket /> <span className="category-text">Purchase</span>
            <FaChevronDown className={`arrow ${openSection === "purchase" ? "open" : ""}`} />
          </button>
          {openSection === "purchase" && (
            <ul className="sub-menu">
              <li><Link to="/seedsPage"><FaSeedling /> Seeds</Link></li>
              <li><Link to="/fertilizersPage"><GiFertilizerBag /> Fertilizers</Link></li>
              <li><Link to="/pesticides"><GiChemicalTank /> Pesticides</Link></li>
              <li><Link to="/farmingToolspage"><GiChemicalTank /> Tools</Link></li>
            </ul>
          )}
        </div>

        <div className="price-range">
          <h3><FaRupeeSign /> Price Range</h3>
          <div className="range-container">
            <span className="range-label">₹0</span>
            <div className="slider-wrapper">
              <span className="tooltip" style={{ left: `${(price / 10000) * 100}%` }}>₹{price}</span>
              <input type="range" min="0" max="10000" value={price} onChange={handlePriceChange} />
            </div>
            <span className="range-label">₹10000</span>
          </div>
        </div>

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
