var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hot-cold-app'); // Always connect using this "kind" of url

app.use(bodyParser.json());
app.use(express.static('build'));

var Guesses = require('./models/guesses');
var bestScore;

app.get('/fewest-guesses', function (req, res) {
  Guesses.create({
    bestScore: req.body.bestScore
  }, function (err, bestScore) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.json(bestScore);
    console.log(bestScore);
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
  Guesses.find({"bestScore": bestScore}, function(err, bestScore) {
    console.log('what is bestScore', bestScore);
    console.log('what is req.body', req.body);
    if (parseInt(bestScore.bestScore) > parseInt(req.body.currentUserScore)) {
      Guesses.update({
        $set: {bestScore: req.body.currentUserScore}
      },
      function (err, bestScore) {
        if (err) {
          return res.status(500).json({
            message: 'Internal Server Error'
          });
        }
        res.status(201).json(bestScore);
        console.log('what is best score first one', bestScore);
      });
    } else {
      res.status(201).json(bestScore);
      console.log('what is best score second one', bestScore);
    }
  });
});

app.use('*', function (req, res) {
  res.status(404).json({
    message: 'Not Found'
  });
});

app.listen(process.env.PORT || 8080, process.env.IP);
