var mongoose = require('mongoose');

var guessesSchema = mongoose.Schema({
  bestScore: {type: Number, required: true}
});

var Guesses = mongoose.model('Guesses', guessesSchema);

module.exports = Guesses;
