//Reducers change the states
var actions = require('./actions');

var initialGameState = {
  correctAnswer: Math.floor(Math.random() * 100) + 1,
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
        correctAnswer: Math.floor(Math.random() * 100) + 1,
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
