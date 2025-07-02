import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TrailerPage() {
  const { id } = useParams();
  const [trailerUrl, setTrailerUrl] = useState('');
  const [movieTitle, setMovieTitle] = useState('');

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/movies/trailer/${id}`);
        const data = await response.json();

        setTrailerUrl(data.trailerUrl || '');
        setMovieTitle(data.title || 'Movie');  // use `data.title` sent from backend
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };

    fetchTrailer();
  }, [id]);

  return (
    <div className="trailer-page">
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
    </div>
  );
}

export default TrailerPage;
