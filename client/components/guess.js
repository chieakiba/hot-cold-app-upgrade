var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../actions');

var Guess = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(
      actions.fetchBestScore());
  },
  render: function (props) {
    var guesses = [];
    var listOfUserGuesses = this.props.listOfUserGuesses.map(function(listOfUserGuesses) {
      return <li key={listOfUserGuesses}>{listOfUserGuesses}</li>
    });
    return (
      <div>
        <p>Best Score:
          <span ref="bestScore">{this.props.bestScore}</span></p>
        <p>Guess #<span ref="userAttempts" id="count">{this.props.userAttempts}</span>!</p>
  			<ul id="guessList" className="guessBox clearfix">{listOfUserGuesses}</ul>
      </div>
    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    bestScore: state.bestScore,
    userAttempts: state.userAttempts,
    listOfUserGuesses: state.guesses
  };
};

var Container = connect(mapStateToProps)(Guess);
module.exports = Container;
