var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');

mongoose.connection.on('error', function (err) {
  console.error('Could not connect. Error:', err);
});

mongoose.connection.once('open', function () {
  var scoreSchema = mongoose.Schema({
    session: {type: String, unique: true},
    counter: String,
    guess: String
  });

  var Score = mongoose.model('Score', scoreSchema);

    var create = function (session, counter, guess) {
      var score = {
        session: session,
        counter: counter,
        guess: guess
      };
      Score.create(session, function (err, score) {
        if (err || !score) {
          console.error("Could not create session", counter);
          mongoose.disconnect();
          return;
        }
        console.log("Created session", session, counter);
        mongoose.disconnect();
      });
    };

    var read = function (session, counter, guess) {
      Score.findOne({session: session}, {counter: counter}, {guess: guess}, function (err, score) {
        if (!score || err) {
          console.error("Could not read session", counter);
          mongoose.disconnect();
          return;
        }
        console.log("Read session", score.session);
        console.log(score.counter);
        mongoose.disconnect();
      });
    };

    var update = function (session, counter, guess) {
      Score.findOneAndUpdate({session: session}, {counter: counter}, {guess: guess}, function (err, score) {
        if (!score || err) {
          console.error("Could not update score", counter);
          mongoose.disconnect();
          return;
        }
        console.log("Updated score", score.counter);
        mongoose.connect();
      });
    };

    var del = function (session, counter, guess) {
      Score.findOneAndRemove({session: session}, {counter: counter}, {guess: guess}, function (err, score) {
        var score = result.value;
        if (!score || err) {
          console.error("Could not delete score", counter);
          mongoose.disconnect();
          return;
        }
        console.log("Deleted score", score.counter);
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
        db.close();
      }
    };
    main();
  });
});
