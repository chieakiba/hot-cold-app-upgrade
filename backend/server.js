var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fewest-guesses'); // Always connect using this "kind" of url

app.use(bodyParser.json());
app.use(express.static('build'));

var Guesses = require('./models/guesses');

app.get('/fewest-guesses', function (req, res) {
  Guesses.find(function (err, bestScore) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.json(bestScore);
    console.log(bestScore);
  });
});

app.post('/fewest-guesses', function (req, res) {
  Guesses.findOne(function(err, bestScore) {
    if (parseInt(bestScore) > parseInt(req.body.currentUserScore)) {
      Guesses.update({
        bestScore: req.body.currentUserScore
      },
      function (err, bestScore) {
        if (err) {
          return res.status(500).json({
            message: 'Internal Server Error'
          });
        }
        res.status(201).json(bestScore);
      });
    } else {
      res.status(201).json(bestScore);
    }
  });
});

app.use('*', function (req, res) {
  res.status(404).json({
    message: 'Not Found'
  });
});

app.listen(process.env.PORT || 8080, process.env.IP);
