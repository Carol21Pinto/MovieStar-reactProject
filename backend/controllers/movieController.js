const axios = require('axios');

// Search movies
const searchMovies = async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: query,
      },
    });
    res.json({ results: response.data.results }); // ✅ wrapped
  } catch (error) {
    console.error('TMDb API error:', error.message);
    res.status(500).json({ message: 'Failed to fetch movies' });
  }
};

// Get trailer, title, overview, and cast
const getMovieTrailer = async (req, res) => {
  const movieId = req.params.id;
  if (!movieId) return res.status(400).json({ message: 'Movie ID is required' });

  try {
    // Trailer
    const videoRes = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
      params: { api_key: process.env.TMDB_API_KEY },
    });

    // Movie Details
    const detailRes = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
      params: { api_key: process.env.TMDB_API_KEY },
    });

    // Cast
    const creditsRes = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
      params: { api_key: process.env.TMDB_API_KEY },
    });

    const videos = videoRes.data.results;
    const details = detailRes.data;
    const cast = creditsRes.data.cast.slice(0, 8); // top 8 cast members

    const trailer = videos.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );

    if (trailer) {
      res.json({
        trailerUrl: `https://www.youtube.com/watch?v=${trailer.key}`,
        title: details.title,
        overview: details.overview,
        cast: cast.map(actor => ({
          name: actor.name,
          profile_path: actor.profile_path,
        })),
      });
    } else {
      res.status(404).json({ message: 'Trailer not found' });
    }
  } catch (error) {
    console.error('Error fetching trailer:', error.message);
    res.status(500).json({ message: 'Failed to fetch trailer' });
  }
};


// Trending movies
const getTrendingMovies = async (req, res) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
      params: { api_key: process.env.TMDB_API_KEY }
    });
    res.json({ results: response.data.results }); // ✅ wrapped in { results }
  } catch (error) {
    console.error('Failed to fetch trending movies:', error.message);
    res.status(500).json({ message: 'Failed to fetch trending movies' });
  }
};

// Upcoming movies
const getUpcomingMovies = async (req, res) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming', {
      params: { api_key: process.env.TMDB_API_KEY }
    });
    res.json({ results: response.data.results }); // ✅ wrapped in { results }
  } catch (error) {
    console.error('Failed to fetch upcoming movies:', error.message);
    res.status(500).json({ message: 'Failed to fetch upcoming movies' });
  }
};

module.exports = {
  searchMovies,
  getMovieTrailer,
  getTrendingMovies,
  getUpcomingMovies
};
