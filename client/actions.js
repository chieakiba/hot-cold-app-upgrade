//Actions.js is what I want to happen when a user clicks the components on the page. This doesn't have any logic in it so it won't be able to do anything. It will send that it's been fired up to the reducers and the reducers will handle the logic (what to do) from there.
require('isomorphic-fetch');

var ON_SUBMIT = 'ON_SUBMIT';
var onSubmit = function (guess, counter) {
  return {
    type: ON_SUBMIT,
    guess: guess,
    counter: counter
  }
};

var NEW_GAME = 'NEW_GAME';
var newGame = function (game) {
  return {
    type: NEW_GAME,
    game: game
  }
};

var FETCH_FEWEST_GUESSES_SUCCESS = 'FETCH_FEWEST_GUESSES_SUCCESS';
var fetchFewestGuessesSuccess = function(guess, counter) {
  return {
    type: FETCH_FEWEST_GUESSES_SUCCESS,
    guess: guess,
    counter: counter
  };
};

var FETCH_FEWEST_GUESSES_ERROR = 'FETCH_FEWEST_GUESSES_ERROR';
var fetchFewestGuessesError = function(guess, counter, error) {
  return {
    type: FETCH_FEWEST_GUESSES_ERROR,
    guess: guess,
    counter: counter,
    error: error
  };
};

var fetchGuesses = function (guess, counter) {
  return function (dispatch) {
    var url = 'https://localhost:8080/';
    return fetch(url).then(function(res) {
      if (res.status < 200 || res.status >= 300) {
        var error = new
        Error(res.statusText)
        error.res = res
        throw error;
      }
      return res;
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var guess = data.guess;
      var counter = data.counter;
      return
      dispatch(fetchFewestGuessesSuccess(guess, counter));
    })
    .catch(function (error) {
      return
      dispatch(fetchFewestGuessesError(guess, counter, error));
    });
  }
};

exports.ON_SUBMIT = ON_SUBMIT;
exports.onSubmit = onSubmit;
exports.NEW_GAME = NEW_GAME;
exports.newGame = newGame;
exports.FETCH_FEWEST_GUESSES_SUCCESS = FETCH_FEWEST_GUESSES_SUCCESS;
exports.fetchFewestGuessesSuccess = fetchFewestGuessesSuccess;
exports.FETCH_FEWEST_GUESSES_ERROR = FETCH_FEWEST_GUESSES_ERROR;
exports.fetchFewestGuessesError = fetchFewestGuessesError;
exports.fetchGuesses = fetchGuesses;
