const express = require('express');
const router = express.Router();
const {
  getMovies,
  getSortedMovies,
  searchMovies,
  addMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.get('/', getMovies);
router.get('/sorted', getSortedMovies);
router.get('/search', searchMovies);
router.post('/', protect, admin, addMovie);
router.put('/:id', protect, admin, updateMovie);
router.delete('/:id', protect, admin, deleteMovie);

module.exports = router;
