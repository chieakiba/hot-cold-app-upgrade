var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../actions');

var Guess = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(
      actions.fetchGuesses(this.props.fewestUserGuesses)
    );
  },
  render: function (props) {
    var guesses = [];
    var guessLists = this.props.guessLists.map(function(guessList) {
      return <li key={guessList}>{guessList}</li>
    });
    return (
      <div>
        <p>Best Score:<span ref="fewestGuesses">{this.props.fewestUserGuesses}</span></p>
        <p>Guess #<span ref="guessCounter" id="count">{this.props.counter}</span>!</p>
  			<ul id="guessList" className="guessBox clearfix">{guessLists}</ul>
      </div>
    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    fewestGuesses: state.fewestUserGuesses,
    counter: state.counter,
    guessLists: state.guesses
  };
};

var Container = connect(mapStateToProps)(Guess);
module.exports = Container;
