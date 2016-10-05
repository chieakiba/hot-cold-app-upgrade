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
      var feedback;
      var bestScore = state.bestScore;
      var userAttempts = state.userAttempts + 1;
      var listOfUserGuesses = state.guesses.concat(action.guess);
      action.guess = parseInt(action.guess);

      return Object.assign({}, state, {
        guesses: listOfUserGuesses,
        userAttempts: userAttempts,
        feedback: feedback
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

    case actions.GATHER_FEEDBACK:
      return Object.assign({}, state, {
        feedback: action.feedback
      });
    break;
  }
  return state;
};

exports.gameReducer = gameReducer;
