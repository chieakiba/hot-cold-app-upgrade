var actions = require('./actions');

var initialGameState = {
  correctAnswer: Math.floor(Math.random() * 100) + 1,
  guesses: [],
  userAttempts: 0,
  feedback: "Make your Guess!",
  userGuess: ''
};

console.log(initialGameState);

var gameReducer = function(state = initialGameState, action) {
  switch(action.type) {
    case actions.ON_SUBMIT:
      //Shows the user the list of guesses they attempted/entered and adds 1 to the counter to count how many guesses have been entered
      var userAttempts = state.userAttempts + 1;
      var listOfUserGuesses = state.guesses.concat(action.userGuess);
      var userGuess = action.userGuess;
      userGuess = parseInt(action.userGuess);

      return Object.assign({}, state, {
        guesses: listOfUserGuesses,
        userAttempts: userAttempts,
      });
    break;

    case actions.SEND_FEEDBACK:
      var sendFeedback = Object.assign({}, state, {
        feedback: action.feedback
      });
      return sendFeedback;
    break;

    case actions.NEW_GAME:
      var newGame = Object.assign({}, state, {
        correctAnswer: Math.floor(Math.random() * 100) + 1,
        guesses: [],
        userAttempts: 0,
        feedback: "New Game! Make your Guess!"
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
