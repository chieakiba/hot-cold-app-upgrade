var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost/fewest-guesses', function (err, db) {
  if (err) {
    console.error(err);
    db.close();
    return;
  }

  var collection = db.collection('fewestGuesses');

  var create = function (session, counter, guess) {
    var score = {
      session: session,
      counter: counter,
      guess: guess
    };
    collection.insert(session, function (err, result) {
      if (err) {
        console.error("Could not create session", counter);
        db.close();
        return;
      }
      console.log("Created session", session, counter);
      db.close();
    });
  };

  var read = function (counter) {
    var query = {
      counter: counter
    };
    collection.findOne(query, function (err, score) {
      if (!score || err) {
        console.error("Could not read session", counter);
        db.close();
        return;
      }
      console.log("Read session", score.session);
      console.log(score.counter);
      db.close();
    });
  };

  var update = function (session, counter, guess) {
    var query = {
      session: session
    };

    var update = {
      $set: {
        counter: counter,
        guess: guess
      }
    };

    collection.findAndModify(query, null, update, function (err, result) {
      var score = result.value;
      if (!score || err) {
        console.error("Could not update score", counter);
        db.close();
        return;
      }
      console.log("Updated score", score.counter);
      db.close();
    });
  };

  var del = function (session, counter, guess) {
    var query = {
      session: session
    };

    collection.findAndRemove(query, function (err, result) {
      var score = result.value;
      if (!score || err) {
        console.error("Could not delete score", counter);
        db.close();
        return;
      }
      console.log("Deleted score", score.counter);
      db.close();
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
