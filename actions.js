//Actions.js is what I want to happen when a user clicks the components on the page. This doesn't have any logic in it so it won't be able to do anything. It will send that it's been fired up to the reducers and the reducers will handle the logic (what to do) from there.

var ON_SUBMIT = 'ON_SUBMIT';
var onSubmit = function (guess, counter) {
  return {
    type: ON_SUBMIT,
    guess: guess,
    counter: counter
  }
};

exports.ON_SUBMIT = ON_SUBMIT;
exports.onSubmit = onSubmit;
