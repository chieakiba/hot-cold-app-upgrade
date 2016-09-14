var randomNumber = require('./src/randomNumber');
var userGuess = require('.src/userGuess');
var feedback = require('./src/feedback');
var playAgain = require('./src/playAgain');

var initialGameState = [];

var initialReducer = function(state, action) {
  state = state || initialGameState;
  if (action.type === actions.SUBMIT_GUESS) {
    return (
      //create random number
    )
  }
  else if (action.type === actions.USER_GUESS) {
    //See if the user guessed the same number as the generated random number
    var index = -1;
    for (var i=0; i < state.length; i++) {
      var guess = state[i];
      if (randomNumber.number === action.randomNumber) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      throw new Error ('Could not find the number')
    }

    var before = state.slice(0, i);
    var after = state.slice(i + 1);
    var newGuess = Object.assign({}, randomNumber, {guess: action.guess});
    return before.concat(newGuess, after);
  }

  return state;
};

exports.initialGuess = initialGuess;
