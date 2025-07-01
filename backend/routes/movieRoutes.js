const express = require('express');
const router = express.Router();
const { searchMovies, getMovieTrailer } = require('../controllers/movieController');

// Movie search route
router.get('/search', searchMovies);

// Trailer route
router.get('/trailer/:id', getMovieTrailer);

module.exports = router;
