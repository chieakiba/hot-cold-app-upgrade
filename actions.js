//Submit button
var SUBMIT_GUESS = 'SUBMIT_GUESS';
var submitGuess = function(counter, guess, feedback) {
  return {
    type: SUBMIT_GUESS,
    counter: counter,
    guess: guess,
    feedback: feedback
  }
};

exports.SUBMIT_GUESS = SUBMIT_GUESS;
exports.submitGuess = submitGuess;
