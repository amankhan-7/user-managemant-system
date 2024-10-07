<<<<<<< HEAD:src/Components/CreateUserModal.jsx
import React, { useState, useEffect } from 'react';
import './CreateUserModal.css';
=======
import React, { useState } from 'react';
import './CreateUserModal.css'; // Import modal styles
>>>>>>> 5dbb47deebb821ab679b006c1040ff0b5bb9cb83:src/CreateUserModal.jsx

const CreateUserModal = ({ onCreate, onCancel, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    email: '',
    phone: '',
<<<<<<< HEAD:src/Components/CreateUserModal.jsx
    username: '',
=======
    username: '', 
>>>>>>> 5dbb47deebb821ab679b006c1040ff0b5bb9cb83:src/CreateUserModal.jsx
    address: { street: '', city: '' },
    company: { name: '' },
    website: '',
  });
<<<<<<< HEAD:src/Components/CreateUserModal.jsx
=======

  const [errors, setErrors] = useState({});
>>>>>>> 5dbb47deebb821ab679b006c1040ff0b5bb9cb83:src/CreateUserModal.jsx

  const [errors, setErrors] = useState({});

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

<<<<<<< HEAD:src/Components/CreateUserModal.jsx
=======
    // Validation logic
>>>>>>> 5dbb47deebb821ab679b006c1040ff0b5bb9cb83:src/CreateUserModal.jsx
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'Name is required and must be at least 3 characters.';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'A valid email is required.';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone is required.';
    }
    if (!formData.username) {
      newErrors.username = 'Username is required.';
    }
    if (!formData.address.street) {
      newErrors.street = 'Street address is required.';
    }
    if (!formData.address.city) {
      newErrors.city = 'City is required.';
    }
    if (formData.company.name && formData.company.name.length < 3) {
      newErrors.companyName = 'If provided, company name must be at least 3 characters.';
    }
<<<<<<< HEAD:src/Components/CreateUserModal.jsx
=======

    // Website validation
    if (formData.website) {
      const urlPattern = /^(https?:\/\/)?(www\.)?([\w-]+(\.[\w-]+)+)([\/\w.-]*)*\/?$/;
      if (!urlPattern.test(formData.website)) {
        newErrors.website = 'Must be a valid URL (e.g., http://example.com, https://example.com, or example.com).';
      }
    }
>>>>>>> 5dbb47deebb821ab679b006c1040ff0b5bb9cb83:src/CreateUserModal.jsx

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onCreate(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
<<<<<<< HEAD:src/Components/CreateUserModal.jsx
        <h2>Create/Edit User</h2>
        <form onSubmit={handleSubmit}>
=======
        <h2>Create New User</h2>
        <form className='form' onSubmit={handleSubmit}>
>>>>>>> 5dbb47deebb821ab679b006c1040ff0b5bb9cb83:src/CreateUserModal.jsx
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
          <div className="form-group">
            <label>Username:</label>
<<<<<<< HEAD:src/Components/CreateUserModal.jsx
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
=======
            <input 
              type="text" 
              name="username" 
              value={formData.username || `USER-${formData.name.split(' ').join('-')}`} 
              onChange={handleChange} 
              required 
              readOnly 
>>>>>>> 5dbb47deebb821ab679b006c1040ff0b5bb9cb83:src/CreateUserModal.jsx
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label>Street:</label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              required
            />
            {errors.street && <p className="error">{errors.street}</p>}
          </div>
          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              required
            />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>
          <div className="form-group">
            <label>Company Name (optional):</label>
            <input
              type="text"
              name="company.name"
              value={formData.company.name}
              onChange={handleChange}
            />
            {errors.companyName && <p className="error">{errors.companyName}</p>}
          </div>
          <div className="form-group">
            <label>Website (optional):</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
            {errors.website && <p className="error">{errors.website}</p>}
          </div>
          <div className="modal-buttons">
<<<<<<< HEAD:src/Components/CreateUserModal.jsx
            <button type="submit">Save User</button>
=======
            <button type="submit">Update User</button>
>>>>>>> 5dbb47deebb821ab679b006c1040ff0b5bb9cb83:src/CreateUserModal.jsx
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
