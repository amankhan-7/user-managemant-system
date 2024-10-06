import React from 'react';
import './UserProfile.css'; // Create and import CSS for styling

const UserProfile = ({ user, onClose }) => {
  return (
    <div className="profile-overlay">
      <div className="profile-content">
        <h2>{user.name} Profile</h2>
       
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
          <p><strong>Company:</strong> {user.company.name}</p>
          <p><strong>Website:</strong> {user.website}</p>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
