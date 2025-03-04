const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
  releaseDate: {
    type: Date,
  },
  duration: {
    type: Number,
  }, // in minutes
});

module.exports = mongoose.model("Movie", MovieSchema);
