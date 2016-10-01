var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fewest-guesses'); // Always connect using this "kind" of url
app.use(express.static('build'));

var Guesses = require('./models/guesses');

app.get('/fewest-guesses', function (req, res) {
  Guesses.find(function (err, guesses, bestScore) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    console.log(guesses, bestScore);
    res.json(guesses, bestScore);
  });
});

app.post('/fewest-guesses', function (req, res) {
  if (parseInt(req.body,bestScore) < parseInt(data.bestScore)) {
    Guesses.create({
      bestScore: req.body.bestScore,
      guesses: req.body.guesses
    },
    function (err, guesses, bestScore) {
      if (err) {
        return res.status(500).json({
          message: 'Internal Server Error'
        });
      }
      res.status(201).json(guesses, bestScore);
    });
  }
});

app.listen(process.env.PORT || 8080, process.env.IP);
