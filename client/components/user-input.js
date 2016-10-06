var React = require('react');
var connect = require('react-redux').connect;
var store = require('../store');
var actions = require('../actions');

var UserInput = React.createClass({
  onClick: function (event) {
    event.preventDefault();
    this.props.gatherFeedback(this.refs.userGuess.value, this.props.correctAnswer);
    this.props.onSubmit(this.refs.userGuess.value, this.props.userAttempts);
    // this.refs.userGuess.value = '';
  },
  render: function() {
    return (
      <div>
        <form>
          <input ref='userGuess' type="text" name="userGuess" id="userGuess" className="text" autoComplete="off" placeholder="Enter your Guess" required></input>
              <input onClick={this.onClick} type="submit" id="guessButton" className="button" name="submit" value="Guess"></input>
        </form>
      </div>
    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    userGuess: state.userGuess,
    userAttempts: state.userAttempts,
    bestScore: state.bestScore,
    correctAnswer: state.correctAnswer
  }
};

var mapDispatchToProps = function(dispatch) {
  return {
    gatherFeedback: function(userGuess, correctAnswer) {
      dispatch(actions.gatherFeedback(userGuess, correctAnswer));
    },
    onSubmit: function(userGuess, userAttempts) {
      dispatch(actions.onSubmit(userGuess, userAttempts));
    }
  };
};

var Container = connect(mapStateToProps, mapDispatchToProps)(UserInput);
module.exports = Container;
