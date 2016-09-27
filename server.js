var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();
app.use(bodyParser.json());
app.use(express.static('build'));

var runServer = function (callback) {
  console.log(config.DATABASE_URL, "URL ::::::");
  mongoose.connect(config.DATABASE_URL, function (err) {
    if (err) {
      return callback(err);
    }

    app.listen(config.PORT, function () {
      console.log('Listening on localhost:' + config.PORT);
      if (callback) {
        callback();
      }
    });
  });
};

if (require.main === module) {
  runServer(function (err) {
    if (err) {
      console.error(err);
    }
  });
};

var Guesses = require('./models/guesses');
var bestScore;

app.get('/fewest-guesses', function (req, res) {
  Guesses.find(function (err, bestScore) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.json(bestScore);
  });
});

app.post('/fewest-guesses', function (req, res) {
  Guesses.create({
    bestScore: {
      counter: req.body.counter,
      guess: req.body.guess
    }
  },
  function (err, bestScore) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.status(201).json(score)
  }
);
});

app.put('/fewest-guesses', function (req, res) {
  if (parseInt(bestScore.bestScore) > parseInt(req.body.currentUserScore)) {
    Guesses.update({
      $set: {bestScore: req.body.currentUserScore}
    }, function (err, bestScore) {
      if (err) {
        return res.status(500).json({
          message: 'Internal Server Error'
        });
      }
      res.status(201).json(bestScore);
      else {
        res.status(200).json(bestScore);
      }
    });
  }
});

app.delete('/fewest-guesses', function (req, res) {
  Guesses.findOneAndRemove({
    _bestScore: bestScore
  }, function (err, bestScore) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.status(201).json(bestScore);
  });
});

app.use('*', function (req, res) {
  res.status(404).json({
    message: 'Not Found'
  });
});

app.listen(process.env.PORT || 8080, process.env.IP);
