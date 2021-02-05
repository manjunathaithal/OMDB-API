const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  genres: mongoose.Schema.Types.Array,
});
const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
