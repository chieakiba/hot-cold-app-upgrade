var React = require('react');
var randomNumber = require('./randomNumber').randomNumber;
var userGuess = require('./userGuess');

var correctAnswerDifference = Math.abs(randomNumber - 2);
var initialGameState = [];

var feedback = function(state, action) {
  state = state || initialGameState;
  //give feedback if userGues is correct
  if (action.type === actions.USER_GUESS) {
    return (
      <div>'Correct! Click "New Game" to play again!'</div>
    );
  }
  //if user guess is close to the correct number
  else if (action.type === actions.CLOSE_GUESS) {
    return (
      <div>Warmer</div>
    )
  }
  //if user guess is really close to the correct number
  else if (action.type === actions.REALLY_CLOSE_GUESS) {
    return (
      <div>Hot!</div>
    )
  }
  //if user guess is far to the correct number
  else if (action.type === actions.FAR_GUESS) {
    return (
      <div>Cold</div>
    )
  }
}

var feedback = React.createClass({
  render: function() {
    var correctAnswerDifference = Math.abs(randomNumber - guess);
    //give feedback if userGuess is correct
    if (guess == randomNumber) {
        $('#feedback').text('Correct! Click "New Game" to play again.');
    }
    //give feedback if userGuess is close to the correct number
    else if (correctAnswerDifference <= 10 && correctAnswerDifference >= 1) {
        $('#feedback').text("Hot!");
    }
    //give feedback if userGuess is getting closer to the correct number
    else if (correctAnswerDifference <= 20 && correctAnswerDifference >= 11) {
        $('#feedback').text("Warmer");
    }
    //give feedback if userGuess is farther from the correct number
    else if (correctAnswerDifference <= 30 && correctAnswerDifference >= 21) {
        $('#feedback').text("Cold");
    }
    //check if the user entered a number between 1 and 100
    else if (guess < 1 || guess > 100) {
        alert("Please enter a number between 1 and 100.");
        invalidEntry();
    }
    //check for an invalid input
    else if (!parseInt(guess)) {
        alert("Please enter a number.");
        invalidEntry();
    }
    //check that the number is a whole number
    else if (Math.round(guess) != guess) {
        alert("Please enter a whole number.");
        invalidEntry();
    }
    //give feedback if userGuess is far from the correct number
    else {
        $('#feedback').text("Very Cold");
    }
  }
});

module.exports = feedback;
