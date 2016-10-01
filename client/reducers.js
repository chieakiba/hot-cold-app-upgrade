//Where logic for the actions are stored (so basically carries out the how-to part once the actions are fired up)
//Thus need to require actions.js since it only fires when the actions are fired up
var actions = require('./actions');

var initialGameState = {
  generateRandomNumber: Math.floor(Math.random() * 100) + 1,
  guesses: [],
  counter: 0,
  feedback: "Make your Guess!",
  userGuess: '',
  bestScore: '',
  currentUserScore: 0
};

console.log(initialGameState);

var gameReducer = function(state, action) {
  state = state || initialGameState;
  switch(action.type) {
    case actions.ON_SUBMIT:
      var correctGuess = false;
      var feedback;
      var counter = 0;
      var guessLists = state.guesses.concat(action.guess);
      console.log('what is guessLists', guessLists);
      action.guess = parseInt(action.guess);
      if(action.guess === state.generateRandomNumber) {
        correctGuess = true;
        feedback = 'Correct! Click "New Game" to play again.';
      } else if (state.generateRandomNumber - 1 <= action.guess && state.generateRandomNumber + 10 >= action.guess) {
        correctGuess = false;
        feedback = 'Hot!';
        counter;
      } else if (state.generateRandomNumber - 11 <= action.guess && state.generateRandomNumber + 20 >= action.guess) {
        correctGuess = false;
        feedback = 'Warmer';
      } else if (state.generateRandomNumber - 21 <= action.guess && state.generateRandomNumber + 30 >= action.guess) {
        correctGuess = false;
        feedback = 'Cold!';
        counter;
      } else {
        feedback = 'Very Cold!';
      }
      counter = state.counter + 1;
      if (isNaN(action.guess)) {
        feedback = 'Please enter a number!';
      } else {
        guessLists;
        counter;
      }
      return Object.assign({}, state, {
        guesses: guessLists,
        counter: counter,
        feedback: feedback
      });
    break;

    case actions.NEW_GAME:
      var newGame = Object.assign({}, state, {
        generateRandomNumber: Math.floor(Math.random() * 100) + 1,
        guesses: [],
        counter: 0,
        feedback: "New Game! Make your Guess!",
        userGuess: '',
        bestScore: state.bestScore,
      });
      return newGame;
    break;

    case actions.FETCH_FEWEST_GUESSES_SUCCESS:
      var bestScore = action.bestScore;
      var fewestGuesses = action.guess;
      console.log(bestScore, fewestGuesses);
      var fewestUserGuess = Object.assign({}, state, {
        bestScore: state.bestScore
      });
      return fewestUserGuess;
    break;

    case actions.POST_FEWEST_GUESSES_SUCCESS:
      bestScore = state.bestScore;
      console.log(bestScore);
      var currentUserScore = action.bestScore;
      var newScore = Object.assign({}, state, {
        currentUserScore: state.bestScore
      });
      console.log(newScore);
      return newScore;
    break;
  }
  return state;
};

exports.gameReducer = gameReducer;
