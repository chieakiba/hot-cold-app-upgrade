var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();

var Storage = {
  add: function(counter) {
    var userGuesses = [];
    var userGuess = {counter: counter};
    this.userGuesses.push(counter);
    return userGuesses;
  }
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.userGuesses = [];
  return storage;
}

var storage = createStorage();

app.get('/fewest-guesses', function(request, response) {
  response.json(storage.userGuesses);
});

app.post('/fewest-guesses', jsonParser, function(request, response) {
  if(!('fewestGuesses' in request.body)) {
    return response.sendStatus(400);
  }
  var userGuess = storage.add(request.body.userGuess);
  response.status(201).json(userGuess);
});

app.listen(process.env.PORT || 8080, process.env.IP);
