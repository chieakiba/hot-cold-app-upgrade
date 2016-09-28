var mongoose = require('mongoose');

var guessesSchema = mongoose.Schema({
  guess: Number,
  counter: Number
});

var Guesses = mongoose.model('Guesses', guessesSchema);

module.exports = Guesses;
