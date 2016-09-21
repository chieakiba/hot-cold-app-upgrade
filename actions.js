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

var ADD_FEWEST_GUESSES_SUCCESS = 'ADD_FEWEST_GUESSES_SUCCESS';
var addFewestGuessesSuccess = function (counter) {
  return {
    type: ADD_FEWEST_GUESSES_SUCCESS,
    counter: counter
  };
};

var fetchFewestGuesses = function (counter) {
  return function(dispatch) {
    var fewestGuesses = '';
    var saveFewestGuesses = counter;
    console.log('what is in saveFewestGuesses', saveFewestGuesses);
    return fetch(saveFewestGuesses).then(function(response) {
      if (response.status < 200 || response.status >= 300) {
        var error = new Error(response.statusText)
        error.response = response
        throw error;
      }
      return response;
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var counter = data.counter;
      return dispatch(fetchFewestGuesses(counter));
    })
    .catch(function(error) {
      return dispatch(fetchFewestGuesses(counter, error));
    });
  }
};

exports.ON_SUBMIT = ON_SUBMIT;
exports.onSubmit = onSubmit;
exports.ADD_FEWEST_GUESSES_SUCCESS = ADD_FEWEST_GUESSES_SUCCESS;
exports.addFewestGuessesSuccess = addFewestGuessesSuccess;
exports.fetchFewestGuesses = fetchFewestGuesses;
