var React = require('react');
var connect = require('react-redux').connect;

var Feedback = React.createClass({
  render: function() {
    if(action.guess === state.generateRandomNumber) {
      feedback = 'Correct! Click "New Game" to play again.';
    } else if (state.generateRandomNumber - 1 <= action.guess && state.generateRandomNumber + 10 >= action.guess) {
      feedback = 'Hot!';
    } else if (state.generateRandomNumber - 11 <= action.guess && state.generateRandomNumber + 20 >= action.guess) {
      feedback = 'Warmer';
    } else if (state.generateRandomNumber - 21 <= action.guess && state.generateRandomNumber + 30 >= action.guess) {
      feedback = 'Cold!';
    } else {
      feedback = 'Very Cold!';
    }
    return (
      <h2 id="feedback">{this.props.feedback}</h2>
    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    feedback: state.feedback
  };
};

var Container = connect(mapStateToProps)(Feedback);
module.exports = Container;
