import React, { useState } from "react";
import { FaHammer, FaTrash, FaEdit, FaWrench, FaTractor, FaSeedling } from "react-icons/fa";
import "./AdminToolsControl.css";

const initialTools = [
  { id: 1, name: "Hammer", icon: <FaHammer /> },
  { id: 2, name: "Wrench", icon: <FaWrench /> },
  { id: 3, name: "Tractor", icon: <FaTractor /> },
  { id: 4, name: "Seeder", icon: <FaSeedling /> },
];

const AdminToolsControl = () => {
  const [showTools, setShowTools] = useState(false);
  const [tools, setTools] = useState(initialTools);
  const [toolToDelete, setToolToDelete] = useState(null);
  const [editingToolId, setEditingToolId] = useState(null);
  const [editedName, setEditedName] = useState("");

  const confirmDelete = () => {
    setTools(tools.filter((tool) => tool.id !== toolToDelete));
    setToolToDelete(null);
  };

  const handleEdit = (id, currentName) => {
    setEditingToolId(id);
    setEditedName(currentName);
  };

  const handleSave = (id) => {
    const updatedTools = tools.map((tool) =>
      tool.id === id ? { ...tool, name: editedName } : tool
    );
    setTools(updatedTools);
    setEditingToolId(null);
    setEditedName("");
  };

  return (
    <div className="admin-tools-container-pro">
      <h2 className="admin-title-pro"> Admin: Manage Farming Tools</h2>

      {!showTools ? (
        <div className="admin-open-card-pro">
          <div className="admin-glass-card" onClick={() => setShowTools(true)}>
            <img src="/tools.jpeg" alt="Farming Tools" className="img-fluid rounded" />
            <button className=" admin-view-button mt-3">Click to View Tools</button>
          </div>
        </div>
      ) : (
        <>
          <h4 className="admin-sub-pro">Available Tools</h4>
          <div className="admin-tool-grid">
            {tools.map((tool) => (
              <div className="admin-tool-glass" key={tool.id}>
                <div className="admin-icon-circle">{tool.icon}</div>

                {editingToolId === tool.id ? (
                  <>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      onKeyDown={(e) =>{
                        if (e.key === "Enter")
                        {
                        handleSave(tool.id);
                        }
                      }}
                      className="form-control mt-2"
                    />
                    <button
                      className="btn btn-success btn-sm mt-2"
                      onClick={() => handleSave(tool.id)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <h5>{tool.name}</h5>
                )}

                <div className="admin-btn-row mt-3">
                  <button
                    className="admin-edit-btn"
                    onClick={() => handleEdit(tool.id, tool.name)}
                  >
                    <FaEdit style={{ color: "#1f2937" }} /> Edit
                  </button>
                  <button
                    className="admin-delete-btn"
                    onClick={() => setToolToDelete(tool.id)}
                  >
                    <FaTrash className="admin-delete-icon" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {toolToDelete !== null && (
        <div className="admin-confirm-overlay-pro">
          <div className="admin-confirm-modal-pro">
            <h5>Confirm Delete?</h5>
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-secondary" onClick={() => setToolToDelete(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminToolsControl;
