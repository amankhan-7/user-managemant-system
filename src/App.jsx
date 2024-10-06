// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import './App.css';

function App() {
  return (
    <div>
        <h1 className='apph'>User Management Application</h1>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </div>
   
  );
}

export default App;
