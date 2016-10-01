var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fewest-guesses'); // Always connect using this "kind" of url

app.use(bodyParser.json());
app.use(express.static('build'));

var Guesses = require('./models/guesses');

app.get('/fewest-guesses', function (req, res) {
  Guesses.find(function (err, fewestGuesses) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.json(fewestGuesses);
    console.log(fewestGuesses);
  });
});

app.post('/fewest-guesses', function (req, res) {
  Guesses.findOne(function(err, fewestGuesses) {
    if (parseInt(fewestGuesses) > parseInt(req.body.currentUserScore)) {
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
        console.log('what is best score', fewestGuesses);
      });
    } else {
      res.status(201).json(fewestGuesses);
      console.log('what is best score', fewestGuesses);
    }
  });
});

app.use('*', function (req, res) {
  res.status(404).json({
    message: 'Not Found'
  });
});

app.listen(process.env.PORT || 8080, process.env.IP);
