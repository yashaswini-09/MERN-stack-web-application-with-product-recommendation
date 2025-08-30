// backend/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String
});

module.exports = mongoose.model('Book', bookSchema);
