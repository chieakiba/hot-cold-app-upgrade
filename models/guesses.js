var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');

mongoose.connection.on('error', function(err) {
  console.error('Could not connect. Error:', err);
});

mongoose.connection.once('open', function() {
  var GuessesSchema = new mongoose.Schema({
    session: {
      type: Number,
      count: count,
      required: true
    }
  });
  var Guesses = mongoose.model('Guesses', GuessesSchema);
});


module.exports = Guesses;
