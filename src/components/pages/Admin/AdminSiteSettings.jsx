import React, { useState } from "react";
import "./AdminSiteSettings.css";

const AdminSiteSettings = () => {
  const [siteTitle, setSiteTitle] = useState("AgriKart");
  const [contactEmail, setContactEmail] = useState("support@agrikart.com");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = () => {
    alert("Settings Saved Successfully ✅");
    // Future me: API call karke backend pe save kar sakte ho
  };

  return (
    <div className="container admin-settings-container">
      <h2 className="admin-settings-title text-center mb-4">Site Settings</h2>

      <div className="admin-settings-form p-4">
        <div className="form-group mb-3">
          <label className="admin-settings-label">Site Title:</label>
          <input
            type="text"
            className="form-control admin-settings-input"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label className="admin-settings-label">Contact Email:</label>
          <input
            type="email"
            className="form-control admin-settings-input"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>

        <div className="form-group mb-4">
          <label className="admin-settings-label d-block">Maintenance Mode:</label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="maintenanceSwitch"
              checked={maintenanceMode}
              onChange={() => setMaintenanceMode(!maintenanceMode)}
            />
            <label className="form-check-label" htmlFor="maintenanceSwitch">
              {maintenanceMode ? "Enabled" : "Disabled"}
            </label>
          </div>
        </div>

        <button className="btn btn-primary admin-settings-save-btn" onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default AdminSiteSettings;
