import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TrailerPage.css';

function TrailerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trailerUrl, setTrailerUrl] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/movies/trailer/${id}`);
        const data = await response.json();

        setTrailerUrl(data.trailerUrl || '');
        setMovieTitle(data.title || 'Movie');
        setOverview(data.overview || '');
        setCast(data.cast || []);
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };

    fetchTrailer();
  }, [id]);

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="trailer-page">
      {/* ✅ Home Button */}
      <button className="home-button" onClick={goToHome}>
        ⬅ Home
      </button>

      <h1>{movieTitle}</h1>

      {trailerUrl ? (
        <iframe
          width="1100"
          height="600"
          src={trailerUrl.replace('watch?v=', 'embed/')}
          title="Movie Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Trailer not available.</p>
      )}

      <div className="overview">
        <h2>Overview</h2>
        <p>{overview}</p>
      </div>

      <div className="cast-section">
        <h2>Cast</h2>
        <div className="cast-grid">
          {cast.map((actor, index) => (
            <div key={index} className="cast-card">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : 'https://via.placeholder.com/150x225?text=No+Image'
                }
                alt={actor.name}
              />
              <p>{actor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrailerPage;
