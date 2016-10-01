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
var fetchFewestGuessesSuccess = function(guesses, bestScore) {
  return {
    type: FETCH_FEWEST_GUESSES_SUCCESS,
    guesses: guesses,
    bestScore: bestScore
  };
};

var FETCH_FEWEST_GUESSES_ERROR = 'FETCH_FEWEST_GUESSES_ERROR';
var fetchFewestGuessesError = function(guesses, bestScore, error) {
  return {
    type: FETCH_FEWEST_GUESSES_ERROR,
    guesses: guesses,
    bestScore: bestScore,
    error: error
  };
};

var SAVE_FEWEST_GUESSES = 'SAVE_FEWEST_GUESSES';
var saveFewestGuesses = function(guesses, bestScore) {
  return {
    type: SAVE_FEWEST_GUESSES,
    guesses: guesses,
    bestScore: bestScore
  };
};

var fetchGuesses = function (guesses, bestScore) {
  return function (dispatch) {
    var url = 'http://localhost:8080/';
    return fetch(url).then(function(res) {
      if (res.status < 200 || res.status >= 300) {
        var error = new Error(res.statusText);
        error.res = res;
        throw error;
      }
      return res;
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var guesses = data.guesses;
      var bestScore = data.bestScore;
      return
      dispatch(fetchFewestGuessesSuccess(guesses, bestScore));
    })
    .catch(function (error) {
      return
      dispatch(fetchFewestGuessesError(guesses, bestScore, error));
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
exports.SAVE_FEWEST_GUESSES = SAVE_FEWEST_GUESSES;
exports.saveFewestGuesses = saveFewestGuesses;
exports.fetchGuesses = fetchGuesses;
