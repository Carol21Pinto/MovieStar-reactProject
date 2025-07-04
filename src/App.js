// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import HomePage from './HomePage';
import TrailerPage from './TrailerPage';
import Navbar from './Navbar'; // ✅ import

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <AppContent isAuthenticated={isAuthenticated} />
    </Router>
  );
};

const AppContent = ({ isAuthenticated }) => {
  const location = useLocation();

  // ✅ Only show Navbar on "/home"
  const showNavbar = location.pathname === '/home';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={!isAuthenticated ? <Navigate to="/signup" /> : <Navigate to="/home" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/trailer/:id" element={<TrailerPage />} />
      </Routes>
    </>
  );
};

export default App;
