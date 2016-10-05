var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../actions');

var Feedback = React.createClass({
  render: function() {

    this.props.gatherFeedback(this.props.userAttempts, this.props.correctAnswer);

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

var mapDispatchToProps = function(dispatch) {
  return {
    gatherFeedback: function (userGuess, correctAnswer) {
      dispatch(actions.gatherFeedback(userGuess, correctAnswer));
    }
  };
};

var Container = connect(mapStateToProps)(Feedback);
module.exports = Container;
