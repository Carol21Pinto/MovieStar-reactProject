import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import './App.css';

const HomePage = ({ query, movies }) => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      fetchTrendingMovies();
      fetchUpcomingMovies();
    }
  }, [query]);

  const fetchTrendingMovies = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/movies/trending');
      const data = await res.json();
      setTrending(data.results);
    } catch (err) {
      console.error('Error fetching trending movies:', err);
      setTrending([]);
    }
  };

  const fetchUpcomingMovies = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/movies/upcoming');
      const data = await res.json();
      setUpcoming(data.results);
    } catch (err) {
      console.error('Error fetching upcoming movies:', err);
      setUpcoming([]);
    }
  };

  const handleWatchTrailer = (movieId) => {
    navigate(`/trailer/${movieId}`);
  };

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const renderMovieList = (movies) => {
    if (!movies || movies.length === 0) {
      return <p style={{ textAlign: 'center' }}>No movies found.</p>;
    }

    return movies.map((movie) => (
      <div key={movie.id} className="movie-card">
        <div className="poster-container">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : 'https://via.placeholder.com/200x300?text=No+Image'
            }
            alt={movie.title}
          />
          <div className="hover-overlay">
            <p>📅 {movie.release_date || 'N/A'}</p>
            <p>⭐ {movie.vote_average || 'N/A'}</p>
          </div>
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <button onClick={() => handleWatchTrailer(movie.id)}>Watch Trailer</button>
        </div>
      </div>
    ));
  };

  return (
    <div>
      {/* ✅ Logout button on top right */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {query ? (
        <>
          <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>
            🔍 Search Results for "{query}"
          </h2>
          <div className="movie-results">{renderMovieList(movies)}</div>
        </>
      ) : (
        <>
          <h2 className="TrendingName" style={{ textAlign: 'center', marginTop: '1rem' }}>
            🔥 Trending Movies
          </h2>
          <div className="movie-results">{renderMovieList(trending)}</div>

          <h2 className="UpcomingName" style={{ textAlign: 'center', marginTop: '2rem' }}>
            🎬 Upcoming Movies
          </h2>
          <div className="movie-results">{renderMovieList(upcoming)}</div>
        </>
      )}
    </div>
  );
};

export default HomePage;
