//Submit button
var SUBMIT_GUESS = 'SUBMIT_GUESS';
var submitGuess = function(content) {
  return {
    type: SUBMIT_GUESS,
    content: content
  }
};
//Play again button
var PLAY_AGAIN = 'PLAY_AGAIN';
var playAgain = function (content) {
  return {
    type: PLAY_AGAIN,
    content: content
  }
};

exports.SUBMIT_GUESS = SUBMIT_GUESS;
exports.submitGuess = submitGuess;
exports.PLAY_AGAIN = PLAY_AGAIN;
exports.playAgain = playAgain;
