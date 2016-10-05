//Where logic for the actions are stored (so basically carries out the how-to part once the actions are fired up)
//Thus need to require actions.js since it only fires when the actions are fired up
var actions = require('./actions');

var initialGameState = {
  generateRandomNumber: Math.floor(Math.random() * 100) + 1,
  guesses: [],
  userAttempts: 0,
  feedback: "Make your Guess!",
  userGuess: '',
  bestScore: 0,
};

console.log(initialGameState);

var gameReducer = function(state = initialGameState, action) {
  switch(action.type) {
    case actions.ON_SUBMIT:
      var correctGuess = false;
      var feedback;
      var bestScore = state.bestScore;
      var userAttempts = state.userAttempts + 1;
      var listOfUserGuesses = state.guesses.concat(action.guess);
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

      return Object.assign({}, state, {
        guesses: listOfUserGuesses,
        userAttempts: userAttempts,
        feedback: feedback,
        bestScore: bestScore
      });
    break;

    case actions.NEW_GAME:
      var newGame = Object.assign({}, state, {
        generateRandomNumber: Math.floor(Math.random() * 100) + 1,
        guesses: [],
        userAttempts: 0,
        feedback: "New Game! Make your Guess!",
      });
      return newGame;
    break;

    case actions.FETCH_BEST_SCORE_SUCCESS:
      var fetchBestScoreSuccess = Object.assign({}, state, {
        bestScore: action.bestScore
      });
      return fetchBestScoreSuccess;
    break;
  }
  return state;
};

exports.gameReducer = gameReducer;
