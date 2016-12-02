var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hot-cold-app');
app.use(bodyParser.json());
app.use(express.static('build'));

var Guesses = require('./models/guesses');
var bestScore;

//Gets the best score
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

//Once the user gets the correct random number and if the number of guesses it took that person is less than the previous, the best score will update to the new best score
app.post('/update-best-score', function (req, res) {
  Guesses.update({
    bestScore: req.body.newBestScore
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
