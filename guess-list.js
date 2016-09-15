var React = require('react');
var connect = require('react-redux').connect;
var Guess = require('./guess');

var actions = require('./actions');

var GuessList = React.createClass({
  addGuess: function() {
    console.log('input', input);
    console.log('what is userGuesses', userGuesses);
    console.log('what is userGuessList', userGuessList);
    this.props.dispatch(actions.addGuess(userGuesses));
  },

  render: function() {
    var userGuesses = [];
    for (var i = 0; i < this.props.guess; i++) {
      var userGuessList = (
        <li key={i} onChange={this.props.onClick.bind(userGuess)}></li>
      );
      userGuesses.push(userGuessList);
    }
    return (
      <Guess guess={guess}/>
    );
  }
});

module.exports = GuessList;
