var React = require('react');
var actions = require('../actions');
var connect = require('react-redux').connect;
var store = require('../store');

var NewGame = React.createClass({
  onClick: function() {
        this.props.dispatch(actions.newGame());

        if (this.props.userAttempts < this.props.bestScore) {
          store.dispatch(actions.updateBestScore(this.props.userAttempts))
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
  }
};

var Container = connect(mapStateToProps)(NewGame);
module.exports = Container;
