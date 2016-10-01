var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hot_cold_upgrade'); // Always connect using this "kind" of url
app.use(express.static('build'));
app.use(bodyParser.urlencoded({ extended: false }))

var Guesses = require('./models/guesses');
var guesses = [];
var bestScore;

app.get('/fewest-guesses', function (req, res) {
  Guesses.find(function (err, guess, bestScore) {
    console.log(guess, guesses, bestScore);
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    else {
      guesses.push(guess);
    }
    res.json(bestScore);
  });
});

// app.post('/fewest-guesses', function (req, res) {
//   if (parseInt(bestScore) < parseInt(req.body.bestScore)) {
//     Guesses.create({
//       bestScore: req.body.bestScore,
//       guess: req.body.guess
//     },
//     function (err, guess, bestScore) {
//       if (err) {
//         return res.status(500).json({
//           message: 'Internal Server Error'
//         });
//       }
//       res.status(201).json(guess, bestScore);
//     });
//   }
// });

app.listen(process.env.PORT || 8080, process.env.IP);
