var React = require('react');
var connect = require('react-redux').connect;
var Guess = require('./guess');
var Counter = require('./counter');

var actions = require('./actions');

var GuessList = React.createClass({
  addCounter: function(counters) {
    this.props.dispatch(actions.addCounter(counters));
  },
  render: function(props) {
    var guesses =
    this.props.guesses.map(function(guess) {
      return <Guess guess={guess} key={guess.index}/>;
    });

    return (
      <div>
        <Counter counter={this.props.submitGuess} onChange={this.addCounter} />
        <Guess guess={this.props.submitGuess} onChange={this.addGuess}/>
      </div>
    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    guesses: state,
    counters: state
  };
};

var Container = connect(mapStateToProps)(GuessList);

module.exports = Container;
