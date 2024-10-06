// src/ConfirmDeleteModal.jsx
import React from 'react';
import './ConfirmDeleteModal.css'; // Import modal styles

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this user?</p>
        <button onClick={onConfirm} className="confirm-btn">Yes, Delete</button>
        <button onClick={onCancel} className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
