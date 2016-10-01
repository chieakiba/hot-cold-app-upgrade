var mongoose = require('mongoose');

var guessesSchema = mongoose.Schema({
  guess: {type: Number, unique: true},
  bestScore: {type: Number}
});

var Guesses = mongoose.model('Guesses', guessesSchema);

module.exports = Guesses;
