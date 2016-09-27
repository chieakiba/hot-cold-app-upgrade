var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
app.use(bodyParser.json());
app.use(express.static('build'));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/8080');

var Guesses = require('./models/guesses');
var bestScore;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/fewest-guesses', function (req, res) {
  Guesses.find(function (err, bestScore) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.json({best});
  });
});

app.post('/fewest-guesses', function (req, res) {

  Guesses.findOne(function(err, bestScore) {
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
      });
    } else {
      res.status(200).json(bestScore);
    }
  });
});

app.use('*', function (req, res) {
  res.status(404).json({
    message: 'Not Found'
  });
});

app.listen(process.env.PORT || 8080, process.env.IP);
