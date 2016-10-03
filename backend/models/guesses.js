var mongoose = require('mongoose');

var GuessesSchema = new mongoose.Schema({
  fewestGuesses: {type: Number, required: true}
});

var Guesses = mongoose.model('Guesses', GuessesSchema);

module.exports = Guesses;
