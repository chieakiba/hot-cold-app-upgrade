//Where logic for the actions are stored (so basically carries out the how-to part once the actions are fired up)
//Thus need to require actions.js since it only fires when the actions are fired up
var actions = require('./actions');

var initialGameState = {
  generateRandomNumber: Math.floor(Math.random() * 100) + 1,
  guesses: [],
  counter: 0,
  feedback: "Make your Guess!",
  userGuess: ''
};

console.log(initialGameState);

var gameReducer = function(state, action) {
  state = state || initialGameState;
  if (action.type === actions.ON_SUBMIT) {
    return state.concat({

    });
  }
  else if (action.type === actions.ON_SUBMIT) {
    return state.concat({

    });
  }
  else if (action.type === actions.ON_SUBMIT) {
    return state.concat({

    });
  }
  return state;
}

exports.gameReducer = gameReducer;
