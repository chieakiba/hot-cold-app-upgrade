//Submit button
var SUBMIT_GUESS = 'SUBMIT_GUESS';
var submitGuess = function(counter, number) {
  return {
    type: SUBMIT_GUESS,
    counter: counter,
    number: number
  }
};
//Play again button
var PLAY_AGAIN = 'PLAY_AGAIN';
var playAgain = function (number, counter, payload) {
  return {
    type: PLAY_AGAIN,
    counter: counter, 
    number: number,
    payload: play
  }
};

exports.SUBMIT_GUESS = SUBMIT_GUESS;
exports.submitGuess = submitGuess;
exports.PLAY_AGAIN = PLAY_AGAIN;
exports.playAgain = playAgain;
