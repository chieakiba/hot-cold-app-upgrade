//Actions.js is what I want to happen when a user clicks the components on the page. This doesn't have any logic in it so it won't be able to do anything. It will send that it's been fired up to the reducers and the reducers will change the state.
//Action applies the logic
import fetch from 'isomorphic-fetch';

var ON_SUBMIT = 'ON_SUBMIT';
var onSubmit = function (guess) {
  return {
    type: ON_SUBMIT,
    guess: guess,
  }
};

var NEW_GAME = 'NEW_GAME';
var newGame = function (game) {
  return {
    type: NEW_GAME,
    game: game
  }
};

var SEND_FEEDBACK = 'SEND_FEEDBACK';
var sendFeedback = function (feedback) {
  return {
    type: SEND_FEEDBACK,
    feedback: feedback,
  }
};

var gatherFeedback = function (userGuess, correctAnswer) {
  if (userGuess === correctAnswer) {
    return dispatch(sendFeedback("You got it right! Play again?"));
    // return {
    //   type: SEND_FEEDBACK,
    //   feedback: "You got it right"
    // }
  }
  else if (correctAnswer - 1 <= userGuess && userGuess + 10 >= correctAnswer) {
    return dispatch(sendFeedback("Getting hotter!"));
    // return {
    //   type: SEND_FEEDBACK,
    //   feedback: "Hot!"
    // }
  }
  else if (correctAnswer - 11 <= userGuess && userGuess + 20 >= correctAnswer) {
    return dispatch(sendFeedback("Warmer..."));
    // return {
    //   type: SEND_FEEDBACK,
    //   feedback: "Warmer"
    // }
  }
  else if (correctAnswer - 21 <= userGuess && userGuess + 30 >= correctAnswer) {
    return dispatch(sendFeedback("Colder..."));
    // return {
    //   type: SEND_FEEDBACK,
    //   feedback: "Cold"
    // }
  }
  else {
    return dispatch(sendFeedback("Very Cold!"));
    // return {
    //   type: SEND_FEEDBACK,
    //   feedback: "Very Cold!"
    // }
  }
};

var FETCH_BEST_SCORE_SUCCESS = 'FETCH_BEST_SCORE_SUCCESS';
var fetchBestScoreSuccess = function (bestScore) {
  return {
    type: FETCH_BEST_SCORE_SUCCESS,
    bestScore: bestScore
  }
};

var FETCH_BEST_SCORE_ERROR = 'FETCH_BEST_SCORE_ERROR';
var fetchBestScoreError = function (bestScore, error) {
  return {
    type: FETCH_BEST_SCORE_ERROR,
    bestScore: bestScore,
    error: error
  }
};

var fetchBestScore = function () {
  return function (dispatch) {
    var url = '/fewest-guesses';
    return fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(function(res) {
      if (res.status < 200 || res.status >= 300) {
        var error = new Error(res.statusText);
        error.res = res;
        throw error;
      }
      return res.json({});
    })
    .then(function (data) {
      return dispatch(fetchBestScoreSuccess(data[0].bestScore));
    })
    .catch(function (error) {
      return dispatch(fetchBestScoreError(error));
    });
  }
};

var updateBestScore = function (newBestScore) {
  return function (dispatch) {
    var url = '/update-best-score';
    return fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"newBestScore": newBestScore})
    })
    .then(function(res) {
      if (res.status < 200 || res.status >= 300) {
        var error = new Error(res.statusText);
        error.res = res;
        throw error;
      }
      return res.json({});
    })
    .then(function (data) {
      return dispatch(fetchBestScoreSuccess(data[0].bestScore));
    })
    .catch(function (error) {
      return dispatch(fetchBestScoreError(error));
    });
  }
};

exports.ON_SUBMIT = ON_SUBMIT;
exports.onSubmit = onSubmit;
exports.NEW_GAME = NEW_GAME;
exports.newGame = newGame;
exports.FETCH_BEST_SCORE_SUCCESS = FETCH_BEST_SCORE_SUCCESS;
exports.fetchBestScoreSuccess = fetchBestScoreSuccess;
exports.FETCH_BEST_SCORE_ERROR = FETCH_BEST_SCORE_ERROR;
exports.fetchBestScoreError = fetchBestScoreError;
exports.fetchBestScore = fetchBestScore;
exports.updateBestScore = updateBestScore;
exports.SEND_FEEDBACK = SEND_FEEDBACK;
exports.sendFeedback = sendFeedback;
exports.gatherFeedback = gatherFeedback;
