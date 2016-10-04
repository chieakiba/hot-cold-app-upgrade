var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hot-cold-app'); // Always connect using this "kind" of url

app.use(bodyParser.json());
app.use(express.static('build'));

var Guesses = require('./models/guesses');
var fewestGuesses;

app.get('/fewest-guesses', function (req, res) {
  console.log('am I fetching');
  console.log(req.body.fewestGuesses);
  Guesses.find(function (err, fewestGuesses) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.json(fewestGuesses);
  });
});

app.post('/update-best-guess-score', function (req, res) {
  console.log('am I posting');
  console.log('what is req', req);
  Guesses.find(function (err, currentUserScore) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.json(currentUserScore);
  });
});

app.use('*', function (req, res) {
  res.status(404).json({
    message: 'Not Found'
  });
});

app.listen(process.env.PORT || 8080, process.env.IP);
