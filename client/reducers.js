//Where logic for the actions are stored (so basically carries out the how-to part once the actions are fired up)
//Thus need to require actions.js since it only fires when the actions are fired up
var actions = require('./actions');

var initialGameState = {
  generateRandomNumber: Math.floor(Math.random() * 100) + 1,
  guesses: [],
  counter: 0,
  feedback: "Make your Guess!",
  userGuess: '',
  bestScore: 0,
  currentUserScore: 0,
};

console.log(initialGameState);

var gameReducer = function(state, action) {
  state = state || initialGameState;
  switch(action.type) {
    case actions.ON_SUBMIT:
      var correctGuess = false;
      var feedback;
      var counter = state.counter + 1;
      var guessLists = state.guesses.concat(action.guess);
      console.log('what is guessLists', guessLists);
      action.guess = parseInt(action.guess);
      if(action.guess === state.generateRandomNumber) {
        correctGuess = true;
        feedback = 'Correct! Click "New Game" to play again.';
      } else if (state.generateRandomNumber - 1 <= action.guess && state.generateRandomNumber + 10 >= action.guess) {
        correctGuess = false;
        feedback = 'Hot!';
      } else if (state.generateRandomNumber - 11 <= action.guess && state.generateRandomNumber + 20 >= action.guess) {
        correctGuess = false;
        feedback = 'Warmer';
      } else if (state.generateRandomNumber - 21 <= action.guess && state.generateRandomNumber + 30 >= action.guess) {
        correctGuess = false;
        feedback = 'Cold!';
      } else {
        feedback = 'Very Cold!';
      }

      if (isNaN(action.guess)) {
        feedback = 'Please enter a number!';
        counter = state.counter - 1;
        guessList = state.guesses.pop();
      } else if (!parseInt(action.guess)) {
        feedback = 'Please enter a whole number!';
        counter = state.counter - 1;
        guessList.pop();
      } else {
        guessLists;
        counter;
      }
      return Object.assign({}, state, {
        guesses: guessLists,
        counter: counter,
        feedback: feedback,
        rightGuess: correctGuess
      });
    break;

    case actions.NEW_GAME:
      var newGame = Object.assign({}, state, {
        generateRandomNumber: Math.floor(Math.random() * 100) + 1,
        guesses: [],
        counter: 0,
        feedback: "New Game! Make your Guess!",
        userGuess: '',
      });
      return newGame;
    break;

    case actions.FETCH_FEWEST_GUESSES_SUCCESS:
      var bestScore = state.counter;
      console.log(bestScore);
      var fewestUserGuesses = Object.assign({}, state, {
        bestScore: bestScore,
      });
      return fewestUserGuesses;
    break;

    case actions.POST_FEWEST_GUESSES_SUCCESS:
      var currentUserScore = state.counter;
      console.log(currentUserScore);
      var newScore = Object.assign({}, state, {
        currentUserScore: currentUserScore
      });
      console.log(newScore);
      return newScore;
    break;
  }
  return state;
};

exports.gameReducer = gameReducer;
