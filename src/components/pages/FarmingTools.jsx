import React, { useState } from "react";
import { FaTools, FaChevronDown, FaChevronUp, FaHammer, FaWrench, FaTractor, FaSeedling } from "react-icons/fa";
import "./FarmingTools.css"; // Updated CSS file

const FarmingTools = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="farming-tools">
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={toggleList}>
        <FaTools className="icon" /> Farming Tools
        {isOpen ? <FaChevronUp className="arrow" /> : <FaChevronDown className="arrow" />}
      </button>

      {/* Expandable List */}
      {isOpen && (
        <ul className="tool-list">
          <li><FaHammer className="tool-icon" /> <span>Hammer</span></li>
          <li><FaWrench className="tool-icon" /> <span>Wrench</span></li>
          <li><FaTractor className="tool-icon" /> <span>Tractor</span></li>
          <li><FaSeedling className="tool-icon" /> <span>Seeder</span></li>
        </ul>
      )}
    </div>
  );
};

export default FarmingTools;
