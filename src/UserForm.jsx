// src/UserForm.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate
import axios from 'axios';

const UserForm = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const navigate = useNavigate(); // For navigation after form submission
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        address: { street: '', city: '' },
        company: { name: '', },
        website: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                setUser(response.data);
                setIsEditing(true);
            };

            fetchUser();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('address')) {
            const addressField = name.split('.')[1]; // Get the field after "address."
            setUser({ ...user, address: { ...user.address, [addressField]: value } });
        } else if (name.includes('company')) {
            const companyField = name.split('.')[1]; // Get the field after "company."
            setUser({ ...user, company: { ...user.company, [companyField]: value } });
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            // Update existing user
            await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
            setMessage('User updated successfully!');
        } else {
            // Create new user
            await axios.post('https://jsonplaceholder.typicode.com/users', user);
            setMessage('User created successfully!');
        }
        navigate('/'); // Redirect to user list
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit User' : 'Create User'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={user.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="tel" name="phone" value={user.phone} onChange={handleChange} required />
                </div>
                <div>
                    <label>Address Street:</label>
                    <input type="text" name="address.street" value={user.address.street} onChange={handleChange} required />
                </div>
                <div>
                    <label>Address City:</label>
                    <input type="text" name="address.city" value={user.address.city} onChange={handleChange} required />
                </div>
                <div>
                    <label>Company Name:</label>
                    <input type="text" name="company.name" value={user.company.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Website:</label>
                    <input type="url" name="website" value={user.website} onChange={handleChange} />
                </div>
                <button type="submit">{isEditing ? 'Update User' : 'Create User'}</button>
            </form>
            {message && <p>{message}</p>} {/* Display success message */}
        </div>
    );
};

export default UserForm;
