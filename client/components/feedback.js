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

var mapStateToProps = function(state, props) {
  return {
    feedback: state.feedback
  };
};

var mapDispatchToProps = function (dispatch) {
  return {
    sendFeedback: function (userGuess, correctAnswer) {
      dispatch(actions.gatherFeedback(feedback));
    }
  };
};

var Container = connect(mapStateToProps, mapDispatchToProps)(Feedback);
module.exports = Container;
