var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());
app.use(express.static('build'));

var BestScore = require('./models/guesses');
var bestScore;

app.get('/fewest-guesses', function (req, res) {
  BestScore.find(function (err, bestScore) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.json(bestScore);
  });
});

app.post('/fewest-guesses', function (req, res) {
  BestScore.create({
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
    BestScore.update({
      $set: {bestScore: req.body.currentUserScore}
    }, function (err, bestScore) {
      if (err) {
        return res.status(500).json({
          message: 'Internal Server Error'
        });
      } else {
        res.status(201).json(bestScore);
      }
    });
  }
});

app.delete('/fewest-guesses', function (req, res) {
  BestScore.findOneAndRemove({
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
