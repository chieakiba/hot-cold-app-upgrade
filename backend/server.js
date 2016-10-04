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
  Guesses.find(function (err, fewestGuesses) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    console.log(fewestGuesses);
    res.json(fewestGuesses);
  });
});

app.post('/update-best-score', function (req, res) {
  console.log('what is req.body', req.body);
  Guesses.update({
    fewestGuesses: req.body.currentUserScore
  }, function (err, fewestGuesses) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.status(201).json(fewestGuesses);
  });
});

app.use('*', function (req, res) {
  res.status(404).json({
    message: 'Not Found'
  });
});

app.listen(process.env.PORT || 8080, process.env.IP);
