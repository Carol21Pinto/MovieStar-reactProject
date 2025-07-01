import React, { useState } from 'react';
import Navbar from './Navbar';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  // Handle search from Navbar
  const handleSearch = async (value) => {
    setQuery(value);

    if (!value) {
      setMovies([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/movies/search?query=${value}`);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Handle trailer request
  const handleWatchTrailer = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/movies/trailer/${movieId}`);
      const data = await response.json();

      if (data.trailerUrl) {
        window.open(data.trailerUrl, '_blank');
      } else {
        alert('Trailer not available.');
      }
    } catch (error) {
      console.error('Failed to fetch trailer:', error);
      alert('Error fetching trailer.');
    }
  };

  return (
    <div className="App">
      <Navbar onSearch={handleSearch} />

      <div className="movie-results">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : 'https://via.placeholder.com/200x300?text=No+Image'
                }
                alt={movie.title}
              />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>Release Date: {movie.release_date || 'N/A'}</p>
                <p>Rating: {movie.vote_average || 'N/A'}</p>

                <button onClick={() => handleWatchTrailer(movie.id)}>
                  Watch Trailer
                </button>
              </div>
            </div>
          ))
        ) : (
          query && <p style={{ textAlign: 'center' }}>No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
