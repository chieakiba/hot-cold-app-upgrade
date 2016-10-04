var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hot-cold-app');
app.use(bodyParser.json());
app.use(express.static('build'));

var Guesses = require('./models/guesses');
var fewestGuesses;

app.get('/fewest-guesses', function (req, res) {
  console.log('what is fewestGuesses', fewestGuesses);
  console.log('req.body in app.get', req.body);
  Guesses.find(function (err, fewestGuesses) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.json(fewestGuesses);
  });
});

app.post('/update-best-score', function (req, res) {
  console.log('I am posting');
  console.log('what is req.body', req.body);
  Guesses.update({
    fewestGuesses: req.body.currentUserScore
  }, function (err, currentUserScore) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.status(201).json(currentUserScore);
  });
});

app.use('*', function (req, res) {
  res.status(404).json({
    message: 'Not Found'
  });
});

app.listen(process.env.PORT || 8080, process.env.IP);
