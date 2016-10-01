//Actions.js is what I want to happen when a user clicks the components on the page. This doesn't have any logic in it so it won't be able to do anything. It will send that it's been fired up to the reducers and the reducers will handle the logic (what to do) from there.
import fetch from 'isomorphic-fetch';

var ON_SUBMIT = 'ON_SUBMIT';
var onSubmit = function (guess, counter) {
  return {
    type: ON_SUBMIT,
    guess: guess,
    counter: counter
  }
};

var NEW_GAME = 'NEW_GAME';
var newGame = function (bestScore) {
  return {
    type: NEW_GAME,
    game: game,
    bestScore: bestScore
  }
};

var FETCH_FEWEST_GUESSES_SUCCESS = 'FETCH_FEWEST_GUESSES_SUCCESS';
var fetchFewestGuessesSuccess = function(fewestUserGuesses) {
  return {
    type: FETCH_FEWEST_GUESSES_SUCCESS,
    fewestUserGuesses: fewestUserGuesses
  };
};

var FETCH_FEWEST_GUESSES_ERROR = 'FETCH_FEWEST_GUESSES_ERROR';
var fetchFewestGuessesError = function(fewestUserGuesses, error) {
  return {
    type: FETCH_FEWEST_GUESSES_ERROR,
    fewestUserGuesses: fewestUserGuesses,
    error: error
  };
};

var fetchGuesses = function (fewestUserGuesses) {
  return function (dispatch) {
    var url = 'http://localhost:8080/fewest-guesses';
    return fetch(url).then(function(res) {
      if (res.status < 200 || res.status >= 300) {
        var error = new Error(res.statusText);
        error.res = res;
        throw error;
      }
      return res.json(fewestUserGuesses);
    })
    .then(function (data) {
      var fewestUserGuesses = data[0].bestScore;
      return dispatch(fetchFewestGuessesSuccess(fewestUserGuesses));
    })
    .catch(function (error) {
      return dispatch(fetchFewestGuessesError(fewestUserGuesses, error));
    });
  }
};

var POST_FEWEST_GUESSES_SUCCESS = 'POST_FEWEST_GUESSES_SUCCESS';
var postFewestGuessesSuccess = function(newScore) {
  return {
    type: POST_FEWEST_GUESSES_SUCCESS,
    newScore: newScore
  };
};

var POST_FEWEST_GUESSES_ERROR = 'POST_FEWEST_GUESSES_ERROR';
var postFewestGuessesError = function(newScore, error) {
  return {
    type: POST_FEWEST_GUESSES_ERROR,
    newScore: newScore,
    error: error
  };
};

var postGuesses = function(currentUserScore) {
  return function(dispatch) {
    var url = 'http://localhost:8080/fewest-guesses';
    return fetch(url, {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({currentUserScore})
    })
    .then(function(res) {
      if (res.status < 200 || res.status >= 300) {
        var error = new Error(res.statusText);
        error.res = res;
        throw error;
      }
      return res.json({currentUserScore});
    })
    .then(function(data) {
      return dispatch(postFewestGuessesSuccess(currentUserScore));
    })
    .catch(function (error) {
      return dispatch(postFewestGuessesError(currentUserScore, error));
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
exports.POST_FEWEST_GUESSES_SUCCESS = POST_FEWEST_GUESSES_SUCCESS;
exports.postFewestGuessesSuccess;
exports.POST_FEWEST_GUESSES_ERROR = POST_FEWEST_GUESSES_ERROR;
exports.postFewestGuessesError = postFewestGuessesError;
exports.postGuesses = postGuesses;
