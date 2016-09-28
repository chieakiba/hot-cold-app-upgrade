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
var fetchFewestGuessesSuccess = function (fewestGuesses) {
  return {
    type: FETCH_FEWEST_GUESSES_SUCCESS,
    fewestGuesses: fewestGuesses
  };
};

var FETCH_FEWEST_GUESSES_ERROR = 'FETCH_FEWEST_GUESSES_ERROR';
var fetchFewestGuessesError = function (fewestGuesses, error) {
  return {
    type: FETCH_FEWEST_GUESSES_ERROR,
    fewestGuesses: fewestGuesses,
    error: error
  };
};

var fetchGuesses = function(fewestGuesses) {
    return function(dispatch) {
        var url = 'http://localhost:8080/fewest-guesses';
        return fetch(url).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText)
               error.response = response
               throw error;
           }
           return response.json();
       })
       .then(function(data) {
           var fewestGuesses = data[0].bestScore;
           return dispatch(
               fetchFewestGuessesSuccess(fewestGuesses)
           )
       })
       .catch(function(error) {
           return dispatch(
               fetchFewestGuessesError(fewestGuesses, error)
           )
       })
    }
};

var POST_FEWEST_GUESSES_SUCCESS = 'POST_FEWEST_GUESSES_SUCCESS';
var postFewestGuessesSuccess = function(currentUserScore) {
  return {
    type: POST_FEWEST_GUESSES_SUCCESS,
    currentUserScore: currentUserScore
  };
};

var POST_FEWEST_GUESSES_ERROR = 'POST_FEWEST_GUESSES_ERROR';
var postFewestGuessesError = function(currentUserScore, error) {
  return {
    type: POST_FEWEST_GUESSES_ERROR,
    currentUserScore: currentUserScore,
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
    }).then(function(response) {
      if (response.status < 200 || response.status >= 300) {
        var error = new Error(response.statusText)
        error.response = response
        throw error;
      }
      return response.json({});
    })
    .then(function(data) {
      return dispatch(postFewestGuessesSuccess(currentUserScore))
    })
    .catch(function(error) {
      return dispatch(postFewestGuessesError(currentUserScore, error));
    });
  }
};

exports.ON_SUBMIT = ON_SUBMIT;
exports.onSubmit = onSubmit;
exports.ADD_FEWEST_GUESSES_SUCCESS = FETCH_FEWEST_GUESSES_SUCCESS;
exports.addFewestGuessesSuccess = fetchFewestGuessesSuccess;
exports.fetchGuesses = fetchGuesses;
exports.POST_FEWEST_GUESSES_SUCCESS = POST_FEWEST_GUESSES_SUCCESS;
exports.postFewestGuessesSuccess;
exports.POST_FEWEST_GUESSES_ERROR = POST_FEWEST_GUESSES_ERROR;
exports.postFewestGuessesError;
exports.postGuesses = postGuesses;
