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

app.post('/fewest-guesses', function(req, res) {
  console.log('am I posting');
  console.log('what is req.body', req.body);
  console.log('what is req.body.currentUserScore', req.body.currentUserScore);
  Guesses.create({
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

app.put('/fewest-guesses/:id', function (req, res) {
  console.log('what is fewestGuesses', fewestGuesses);
  console.log('what is fewestGuesses.fewestGuesses', fewestGuesses.fewestGuesses);
  Guesses.findByIdAndUpdate({_id: req.params.id}, {fewestGuesses: req.body.fewestGuesses}, function(err, fewestGuesses) {
    if (parseInt(currentUserScore) < parseInt(req.body.fewestGuesses)) {
      Guesses.update({
        $set: {fewestGuesses: req.body.currentUserScore}
      },
      function (err, fewestGuesses) {
        if (err) {
          return res.status(500).json({
            message: 'Internal Server Error'
          });
        }
        res.status(201).json(fewestGuesses);
      });
    } else {
      res.status(201).json(fewestGuesses);
      console.log('what is fewestGuesses second one', fewestGuesses);
    }
  });
});

app.use('*', function (req, res) {
  res.status(404).json({
    message: 'Not Found'
  });
});

app.listen(process.env.PORT || 8080, process.env.IP);
