var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.use(express.static('build'));

var Guesses = require('./models/guesses');
var bestScore;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost', bestScore);

app.get('/', function (req, res) {
  Guesses.findOne({guess: guess}, {counter: counter}, function (err, bestScore) {
    if (err || !bestScore) {
      console.error("Could not read bestScore", guess, counter);
      mongoose.disconnect();
      return;
    }
    console.log("Read bestScore", bestScore.guess, bestScore.counter);
    mongoose.disconnect();
  });
});

// app.post('/', jsonParser, function (req, res) {
//   if () {
//
//   }
//   res.status(201).json();
// });

app.listen(process.env.PORT || 8080, process.env.IP);
