var React = require('react');
var connect = require('react-redux').connect;

var actions = require('./actions');

var Guess = React.createClass({
  render: function(props) {
    return (
      <form>
        <input ref="userInput" type="text" name="userGuess" id="userGuess text" maxLength="3" autoComplete="off" placeholder="Enter your Guess" required></input>
        <input onClick={this.addGuess} type="submit" id="guessButton button" name="submit" value="Guess"></input>
        <ul id="guessList clearfix">{this.props.children}</ul>
      </form>
    );
  }
});

module.exports = Guess;
