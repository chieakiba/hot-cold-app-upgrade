var actions = require('./actions');

var initialGameState = [];

var gameReducer = function(state, action) {
  state = state || initialGameState;
  //If user submits their guess, enable the user's number to append to the guess list
  if (action.type === actions.SUBMIT_GUESS) {
      //Append the user's guess on the guess list
      return state.concat({
        counter: action.counter,
        guess: action.guess,
        feedback: action.feedback
      });
  }
  return state;
};

exports.gameReducer = gameReducer;
