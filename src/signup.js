import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate(); // ✅ used for redirecting
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Signup successful! Redirecting to login...');
        setFormData({ name: '', email: '', password: '' });
        setTimeout(() => navigate('/login'), 1000); // Redirect after 1 sec
      } else {
        setMessage(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setMessage('An error occurred during signup.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 characters)"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        {message && <p className="signup-message">{message}</p>}
      </form>
      <p className="signup-login-link">
        Already have an account? <Link to="/login">Login here</Link>
        </p>

    </div>
  );
};

export default Signup;
