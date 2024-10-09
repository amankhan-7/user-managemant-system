import React, { useEffect, useState } from 'react';
import CreateUserModal from './CreateUserModal';
import UserProfile from './UserProfile';
import SkeletonScreen from './SkeletonScreen'; // Import the SkeletonScreen component
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading as true
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users from localStorage or from the API
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
      setTimeout(() => {
        setLoading(false); // Stop loading after 0.5 seconds delay even with local storage
      }, 500);
    } else {
      fetchUsers(); // Fetch from API if no users in localStorage
    }
  }, []);

  // Save users to localStorage whenever the users state changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  const fetchUsers = async () => {
    setLoading(true); // Start loading when fetching users
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();

      // Add a 0.5 second delay to show the SkeletonScreen
      setTimeout(() => {
        setUsers(data);
        setLoading(false); // Stop loading after the delay
      }, 300); // 0.5 second hold
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false); // Stop loading if there is an error
    }
  };

  const handleCreateUser = (newUser) => {
    const createdUser = { ...newUser, id: Date.now() }; // Simulate unique ID
    setUsers([...users, createdUser]);
    setShowModal(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setShowModal(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
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
        <SkeletonScreen />  // Display the SkeletonScreen while loading
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

      <div className='footer'>
        <p>
          All rights reserved <a className='link' href='https://www.linkedin.com/in/amankhan7/'>©amankhan</a>
        </p>
      </div>
    </div>
  );
};

export default Home;
