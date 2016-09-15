//Submit button
var SUBMIT_GUESS = 'SUBMIT_GUESS';
var submitGuess = function(counter, guess) {
  return {
    type: SUBMIT_GUESS,
    counter: counter,
    guess: guess
  }
};

exports.SUBMIT_GUESS = SUBMIT_GUESS;
exports.submitGuess = submitGuess;
