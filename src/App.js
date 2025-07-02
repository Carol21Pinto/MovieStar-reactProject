import React, { useState } from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrailerPage from './TrailerPage';
import HomePage from './HomePage';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  // Handle search input from Navbar
  const handleSearch = async (value) => {
    setQuery(value);

    if (!value) {
      setMovies([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/movies/search?query=${value}`);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
  <Router>
  <div className="App">
    <Routes>
      <Route path="/" element={
        <>
          <Navbar onSearch={handleSearch} />
          <HomePage query={query} movies={movies} />
        </>
      } />
      <Route path="/trailer/:id" element={<TrailerPage />} />
    </Routes>
  </div>
</Router>

  );
}

export default App;
