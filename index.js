var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;

var randomNumber = require('./src/randomNumber');
var userGuess = require('./src/userGuess');
var feedback = require('./src/feedback');
var playAgain = require('./src/playAgain');

//Need the following components

//Generate random number - in randomNumber.js
//Allow user to enter their guess
//Append the user guess so user can see their guess number
//Give feedback to the user (whether their guess is close or far from the random number)
//If the user guesses the right number, tell them that they guessed the right number
//Show and enable the play again button so the user can play the game again

var Game = React.createClass({
  render: function() {
    return (
      <div>hi there... I</div>
    )
  }

});

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Game />, document.getElementById('game'));
});
