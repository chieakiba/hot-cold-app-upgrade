var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.createConnection('mongodb://localhost/');

mongoose.connection.on('error', function (err) {
  console.error('Could not connect. Error:', err);
});

var BestScoreSchema = mongoose.Schema({
  counter: {type: String},
  guess: {type: String}
});

var BestScore = mongoose.model('BestScore', BestScoreSchema);

mongoose.connection.once('open', function () {

  var create = function (counter, guess) {
    var bestScore = {
      counter: counter,
      guess: guess
    };
    BestScore.create(session, function (err, bestScore) {
      if (err || !bestScore) {
        console.error("Could not create bestScore", counter);
        mongoose.disconnect();
        return;
      }
      console.log("Created bestScore", session, counter);
      mongoose.disconnect();
    });
  };

  var read = function (counter, guess) {
    BestScore.findOne({counter: counter}, {guess: guess}, function (err, bestScore) {
      if (!bestScore || err) {
        console.error("Could not read bestScore", counter);
        mongoose.disconnect();
        return;
      }
      console.log("Read bestScore", bestScore.counter);
      console.log(bestScore.counter, bestScore.guess);
      mongoose.disconnect();
    });
  };

  var update = function (counter, guess) {
    BestScore.findOneAndUpdate({counter: counter}, {guess: guess}, function (err, bestScore) {
      if (!bestScore || err) {
        console.error("Could not update bestScore", counter);
        mongoose.disconnect();
        return;
      }
      console.log("Updated bestScore", bestScore.counter);
      mongoose.connect();
    });
  };

  var del = function (counter, guess) {
    BestScore.findOneAndRemove({counter: counter}, {guess: guess}, function (err, bestScore) {
      var bestScore = result.value;
      if (!bestScore || err) {
        console.error("Could not delete bestScore", counter);
        mongoose.disconnect();
        return;
      }
      console.log("Deleted bestScore", bestScore.counter);
      mongoose.disconnect();
    });
  };

  var main = function() {
    if (process.argv[2] == 'create') {
      create(process.argv[3], process.argv[4]);
    } else if (process.argv[2] == 'read') {
      read(process.argv[3]);
    } else if (process.argv[2] == 'update') {
      update(process.argv[3], process.argv[4]);
    } else if (process.argv[2] == 'delete') {
      del (process.argv[3]);
    } else {
      console.error('Command not recognized');
      mongoose.disconnect();
    }
  };
  main();
});

module.exports = BestScore;
