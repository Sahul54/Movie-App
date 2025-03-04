
const Movie = require('../models/Movie');
const movieQueue = require('../queue/movieQueue');

exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

exports.getSortedMovies = async (req, res, next) => {
  try {
    const { sortBy, order } = req.query;
    const sortCriteria = {};
    sortCriteria[sortBy] = order === 'desc' ? -1 : 1;
    const movies = await Movie.find().sort(sortCriteria);
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

exports.searchMovies = async (req, res, next) => {
  try {
    const { query } = req.query;
    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

exports.addMovie = async (req, res, next) => {
  try {
    const movieData = req.body;
    // Instead of inserting directly, add movie data to the queue
    await movieQueue.addToQueue(movieData);
    res.status(202).json({ message: 'Movie is being added' });
  } catch (err) {
    next(err);
  }
};

exports.updateMovie = async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, { new: true });
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(updatedMovie);
  } catch (err) {
    next(err);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findByIdAndDelete(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    next(err);
  }
};
