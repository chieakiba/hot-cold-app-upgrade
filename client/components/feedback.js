var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../actions');

var Feedback = React.createClass({
  render: function() {
    return (
      <h2 id="feedback">{this.props.feedback}</h2>
    );
  }
});

var mapStateToProps = function (state, props) {
  console.log(state.feedback);
  return {
    feedback: state.feedback
  }
};

var mapDispatchToProps = function(state, props) {
  return {
    feedback: function (userGuess, correctAnswer) {
      this.props.dispatch(actions.gatherFeedback(userGuess, correctAnswer));
    }
  };
};

var Container = connect(mapStateToProps, mapDispatchToProps)(Feedback);
module.exports = Container;
