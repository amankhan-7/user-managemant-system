// src/CreateUserModal.jsx
import React, { useState } from 'react';
import './CreateUserModal.css'; // Import modal styles

const CreateUserModal = ({ onCreate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '', // Added for username
    address: { street: '', city: '' },
    company: { name: '' },
    website: '',
  });
  
  const [errors, setErrors] = useState({}); // To hold validation errors

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('address')) {
      const addressField = name.split('.')[1];
      setFormData({ ...formData, address: { ...formData.address, [addressField]: value } });
    } else if (name.includes('company')) {
      const companyField = name.split('.')[1];
      setFormData({ ...formData, company: { ...formData.company, [companyField]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Only update username if the name field is filled
    if (name === "name") {
      const formattedUsername = `USER-${value.split(' ').join('-')}`; // Format username based on name
      setFormData((prevData) => ({ ...prevData, username: formattedUsername }));
    }
  };

  // Handle form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    // Validation logic
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'Name is required and must be at least 3 characters.';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'A valid email is required.';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone is required.';
    }
    // Removed username validation
    if (!formData.address.street) {
      newErrors.street = 'Street address is required.';
    }
    if (!formData.address.city) {
      newErrors.city = 'City is required.';
    }
    if (formData.company.name && formData.company.name.length < 3) {
      newErrors.companyName = 'If provided, company name must be at least 3 characters.';
    }
    if (formData.website && !/^https?:\/\/.+\..+/i.test(formData.website)) {
      newErrors.website = 'If provided, must be a valid URL.';
    }

    // If there are errors, update state and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and create the user
    setErrors({});
    onCreate(formData); // Pass the data to the parent
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input 
              type="text" 
              name="username" 
              value={formData.username} // Use username from state
              readOnly // Make username non-editable
            />
          </div>
          <div className="form-group">
            <label>Address Street:</label>
            <input type="text" name="address.street" value={formData.address.street} onChange={handleChange} required />
            {errors.street && <p className="error">{errors.street}</p>}
          </div>
          <div className="form-group">
            <label>Address City:</label>
            <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} required />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>
          <div className="form-group">
            <label>Company Name (optional):</label>
            <input type="text" name="company.name" value={formData.company.name} onChange={handleChange} />
            {errors.companyName && <p className="error">{errors.companyName}</p>}
          </div>
          <div className="form-group">
            <label>Website (optional):</label>
            <input type="url" name="website" value={formData.website} onChange={handleChange} />
            {errors.website && <p className="error">{errors.website}</p>}
          </div>
          <div className="modal-buttons">
            <button type="submit">Create User</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
