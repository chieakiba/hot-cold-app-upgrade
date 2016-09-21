//Where logic for the actions are stored (so basically carries out the how-to part once the actions are fired up)
//Thus need to require actions.js since it only fires when the actions are fired up
var actions = require('./actions');

var initialGameState = {
  generateRandomNumber: Math.floor(Math.random() * 100) + 1,
  guesses: [],
  counter: 0,
  feedback: "Make your Guess!",
  userGuess: '',
  fewestGuesses: 'N/A'
};

console.log(initialGameState);

var gameReducer = function(state, action) {
  state = state || initialGameState;
  switch(action.type) {
    case actions.ON_SUBMIT:
      var correctGuess = false;
      var msg;
      var counter = state.counter + 1;
      console.log('what is counter', counter);
      var guessLists = state.guesses.concat(action.guess);
      console.log('what is guessLists', guessLists);
      console.log('what is guess', guess);
      action.guess = parseInt(action.guess);
      if(action.guess === state.generateRandomNumber) {
        correctGuess = true;
        msg = 'Correct! Click "New Game" to play again.';
      } else if (state.generateRandomNumber - 1 <= action.guess && state.generateRandomNumber + 10 >= action.guess) {
        correctGuess = false;
        msg = 'Hot!';
        counter;
      } else if (state.generateRandomNumber - 11 <= action.guess && state.generateRandomNumber + 20 >= action.guess) {
        correctGuess = false;
        msg = 'Warmer';
      } else if (state.generateRandomNumber - 21 <= action.guess && state.generateRandomNumber + 30 >= action.guess) {
        correctGuess = false;
        msg = 'Cold!';
        counter;
      } else {
        msg = 'Very Cold!';
      }
      if (isNaN(action.guess)) {
        msg = 'Please enter a number';
      } else {
        guessLists;
      }
      return Object.assign({}, state, {
        guesses: guessLists,
        counter: counter,
        msg: msg
      });
      break;
    case actions.ADD_FEWEST_GUESSES_SUCCESS:
      var fewestGuesses = '';
      if (action.guess === state.generateRandomNumber) {
        return Object.assign({}, state, {
          fewestGuesses: counter
        });
    } else if (action.counter < state.fewestGuesses) {
      return Object.assign({}, state, {
        fewestGuesses: counter
      });
    }
    break;
  }
  return state;
};

exports.gameReducer = gameReducer;
