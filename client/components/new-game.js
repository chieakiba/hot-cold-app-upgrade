var React = require('react');
var actions = require('../actions');
var connect = require('react-redux').connect;

var NewGame = React.createClass({
  onClick: function() {
        this.props.dispatch(
            actions.newGame()
        );

        console.log('store.getState()', store.getState());

        if (store.getState().rightGuess === true) {
          if (parseInt(this.props.counter) < parseInt(this.props.fewestGuesses)) {
            store.dispatch(actions.postGuesses(store.getState().counter, this.props.fewestGuesses))
          }
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
    counter: state.counter,
    rightGuess: state.rightGuess,
    currentUserScore: state.currentUserScore,
    fewestGuesses: state.fewestGuesses
  }
};

var Container = connect()(NewGame);
module.exports = Container;
