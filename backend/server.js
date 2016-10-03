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
  Guesses.create({
    fewestGuesses: req.body.fewestGuesses
  },
  function (err, fewestGuesses) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.json(fewestGuesses);
    console.log(fewestGuesses);
  });
});

// app.post('/fewest-guesses', function(req, res) {
//   Guesses.create({
//     bestScore: req.body.bestScore
//   }, function (err, bestScore) {
//     if (err) {
//       return res.status(500).json({
//         message: 'Internal Server Error'
//       });
//     }
//     console.log(bestScore);
//     res.status(201).json(bestScore);
//   });
// });

app.post('/fewest-guesses', function (req, res) {
  Guesses.find({"fewestGuesses": fewestGuesses}, function(err, fewestGuesses) {
    console.log('what is fewestGuesses', fewestGuesses);
    console.log('what is req.body', req.body);
    if (parseInt(fewestGuesses.fewestGuesses) > parseInt(req.body.currentUserScore)) {
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
        console.log('what is fewestGuesses first one', fewestGuesses);
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
