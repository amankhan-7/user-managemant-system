import React, { useEffect, useState } from 'react';
import CreateUserModal from './CreateUserModal';
import UserProfile from './UserProfile';
import SkeletonScreen from './SkeletonScreen'; // Import SkeletonScreen
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  const handleCreateUser = async (newUser) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const createdUser = await response.json();
    setUsers([...users, createdUser]);
    setShowModal(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleUpdateUser = async (updatedUser) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setShowModal(false);
    setEditingUser(null);
  };

  const handleDeleteUser = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    });
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
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className='btn3' onClick={() => setShowModal(true)}>Create User</button>
      </div>
      {loading ? ( // Show SkeletonScreen while loading
        <SkeletonScreen />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} onClick={() => handleViewProfile(user)}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button className='btn' onClick={(e) => { e.stopPropagation(); handleEditUser(user); }}>Edit</button>
                  <button className='btn1' onClick={(e) => { e.stopPropagation(); handleDeleteUser(user.id); }}>Delete</button>
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
          initialData={editingUser} // Pass existing user data for editing
        />
      )}
      {showProfile && selectedUser && (
        <UserProfile
          user={selectedUser}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};

export default Home;
