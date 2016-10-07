var React = require('react');
var actions = require('../actions');
var connect = require('react-redux').connect;
var store = require('../store');

var NewGame = React.createClass({
  onClick: function() {
    this.props.newGame(this.props.bestScore, this.props.userAttempts, this.props.correctAnswer);
    if (this.props.userAttempts < this.props.bestScore) {
      this.props.updateBestScore(this.props.userAttempts);
    }
  },
  render: function() {
      return(
          <div>
              <button type='button' onClick={this.onClick}>New Game</button>
          </div>
      );
  }
});

var mapStateToProps = function(state, props) {
  return {
    userAttempts: state.userAttempts,
    bestScore: state.bestScore,
    correctAnswer: state.correctAnswer
  }
};

var mapDispatchToProps = function (dispatch) {
  return {
    newGame: function(bestScore, userAttempts, correctAnswer) {
      dispatch(actions.newGame(bestScore, userAttempts, correctAnswer));
    },
    updateBestScore: function(userAttempts) {
      dispatch(actions.updateBestScore(userAttempts));
    }
  }
}

var Container = connect(mapStateToProps, mapDispatchToProps)(NewGame);
module.exports = Container;
