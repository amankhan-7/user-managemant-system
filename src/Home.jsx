import React, { useEffect, useState } from 'react';
import CreateUserModal from './CreateUserModal';
import UserProfile from './UserProfile';
import SkeletonScreen from './SkeletonScreen';
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // State to manage editing user
  const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user for profile view
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

  // Handle creating new user
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

  // Handle editing user (this opens the modal with the existing user data)
  const handleEditUser = (user) => {
    setEditingUser(user); // Pass the user data to the modal
    setShowModal(true);
  };

  // Handle updating user
  const handleUpdateUser = async (updatedUser) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    // Update the users state with the modified user
    setUsers(users.map(user => (user.id === data.id ? data : user)));
    setShowModal(false);
    setEditingUser(null); // Reset editingUser after successful update
  };

  // Handle deleting user
  const handleDeleteUser = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    });
    setUsers(users.filter(user => user.id !== id));
  };

  // Handle profile view
  const handleViewProfile = (user) => {
    setSelectedUser(user);
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
      {loading ? (
        <SkeletonScreen /> // Skeleton screen to show loading state
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
          initialData={editingUser} // Pass the selected user for editing
        />
      )}
      {selectedUser && (
        <UserProfile
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default Home;
