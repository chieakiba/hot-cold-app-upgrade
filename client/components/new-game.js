var React = require('react');
var actions = require('../actions');
var connect = require('react-redux').connect;
var store = require('../store');

var NewGame = React.createClass({
  onClick: function() {
    this.props.newGame(this.props.userAttempts, this.props.correctAnswer);

    if (this.props.userAttempts < this.props.bestScore) {
      this.props.updateBestScore(this.props.userAttempts);
      this.props.fetchBestScore(this.props.bestScore);
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
    newGame: function(userAttempts, correctAnswer) {
      dispatch(actions.newGame(userAttempts, correctAnswer));
    },
    updateBestScore: function(userAttempts) {
      dispatch(actions.updateBestScore(userAttempts));
    },
    fetchBestScore: function(bestScore) {
      dispatch(actions.fetchBestScore());
    }

  }
};

var Container = connect(mapStateToProps, mapDispatchToProps)(NewGame);
module.exports = Container;
