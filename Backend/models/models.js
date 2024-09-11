const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  name: String,
  genre: String,
  authorId: String,
});

const AuthorSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Book = mongoose.model("Book", BookSchema);
const Author = mongoose.model("Author", AuthorSchema);
module.exports = { Book, Author };
