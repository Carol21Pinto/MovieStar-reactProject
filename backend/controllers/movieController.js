const axios = require('axios');

const searchMovies = async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: query
      }
    });

    const movies = response.data.results;
    res.json(movies);
  } catch (error) {
    console.error('TMDb API error:', error.message);
    res.status(500).json({ message: 'Failed to fetch movies' });
  }
};


// GET Trailer by Movie ID
const getMovieTrailer = async (req, res) => {
  const movieId = req.params.id;

  if (!movieId) {
    return res.status(400).json({ message: 'Movie ID is required' });
  }

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
      params: {
        api_key: process.env.TMDB_API_KEY
      }
    });

    const videos = response.data.results;

    // Find a YouTube trailer
    const trailer = videos.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );

    if (trailer) {
      res.json({ trailerUrl: `https://www.youtube.com/watch?v=${trailer.key}` });
    } else {
      res.status(404).json({ message: 'Trailer not found' });
    }
  } catch (error) {
    console.error('Error fetching trailer:', error.message);
    res.status(500).json({ message: 'Failed to fetch trailer' });
  }
};

module.exports = {
  searchMovies,
  getMovieTrailer, // 👈 Add this
};
