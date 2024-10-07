import React, { useEffect, useState } from 'react';
import CreateUserModal from './CreateUserModal';
import UserProfile from './UserProfile';
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState(() => {
    // Load users from localStorage or set an empty array if no data exists
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users only if localStorage is empty
  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, []);

  // Save users to localStorage whenever the user state changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  const handleCreateUser = async (newUser) => {
    // Simulate server response, as we're handling local state for now
    const createdUser = { ...newUser, id: Date.now() }; // Add unique ID based on timestamp
    setUsers([...users, createdUser]);
    setShowModal(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleUpdateUser = async (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setShowModal(false);
    setEditingUser(null);
  };

  const handleDeleteUser = async (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowProfile(true);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className='btn3' onClick={() => setShowModal(true)}>Create New User</button>
      </div>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th className='firstchild'>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th className='lastchild'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} onClick={() => handleViewProfile(user)}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button
                    className="btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditUser(user);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUser(user.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <CreateUserModal
          onCreate={editingUser ? handleUpdateUser : handleCreateUser}
          onCancel={() => {
            setShowModal(false);
            setEditingUser(null);
          }}
          initialData={editingUser}
        />
      )}
      {showProfile && selectedUser && (
        <UserProfile
          user={selectedUser}
          onClose={() => setShowProfile(false)}
        />
      )}
      <div className='footer'
      ><p>All rights reserved <a className='link' href='https://www.linkedin.com/in/amankhan7/'>©amankhan</a> </p></div>
    </div>
  );
};

export default Home;
