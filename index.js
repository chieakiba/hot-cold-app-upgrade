var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;



//Need the following components

//Generate random number - in randomNumber.js
//Allow user to enter their guess
//Append the user guess so user can see their guess number
//Give feedback to the user (whether their guess is close or far from the random number)
//If the user guesses the right number, tell them that they guessed the right number
//Show and enable the play again button so the user can play the game again

// var Game = React.createClass({
//   render: function() {
//     return (
//       <section class="game"> <!-- Guessing Section -->
//
//         <h2 id="feedback">{blablah}!</h2>
//
//         <form>
//           <input type="text" name="userGuess" id="userGuess" class="text" maxlength="3" autocomplete="off" placeholder="Enter your Guess" required/>
//               <input type="submit" id="guessButton" class="button" name="submit" value="Guess"/>
//         </form>
//
//             <p>Guess #<span id="count">{counter}</span>!</p>
//
//         <ul id="guessList" class="guessBox clearfix">
//           { guesses }
//         </ul>
//
//       </section>
//
//     )
//   }
//
// });
//
// document.addEventListener('DOMContentLoaded', function() {
//   ReactDOM.render(<Game />, document.getElementById('game'));
// });
