//Actions.js is what I want to happen when a user clicks the components on the page. This doesn't have any logic in it so it won't be able to do anything. It will send that it's been fired up to the reducers and the reducers will handle the logic (what to do) from there.
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
      body: JSON.stringify({newBestScore: newBestScore})
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
