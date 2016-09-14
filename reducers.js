var randomNumber = require('./src/randomNumber');
var userGuess = require('.src/userGuess');
var feedback = require('./src/feedback');
var playAgain = require('./src/playAgain');

var initialGameState = [];

var gameReducer = function(state, action) {
  state = state || initialGameState;
  //If user submits their guess, enable the user's number to append to the guess list
  if (action.type === actions.SUBMIT_GUESS) {
      //Append the user's guess on the guess list
      return state.concat({
        name: action.submitGuess,
        counter: counter,
        number: number
      });
  }
  //If user clicks on the New Game button, clear the guess list and counter
  else if (action.type === actions.PLAY_AGAIN) {
    //Clear the guess list and counter
    for (var i = 0; i < state.length; i++) {
      var guess = state[i];
      state.slice(i);
    }
    var newGuessList = Object.assign({}, submitGuess, {counter: action.counter}, {number: action.number});
    return newGuessList;
  }
  return state;
};

exports.gameReducer = gameReducer;
