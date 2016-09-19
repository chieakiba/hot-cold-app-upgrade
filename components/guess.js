var React = require('react');
var connect = require('react-redux').connect;

var Guess = React.createClass({
  render: function (props) {
    var guesses = '';
    var guessLists = this.props.guessLists.map(function(guessList) {
      return <li key={guessList}>{guessList}</li>
    });
    return (
      <div>
        <p>Guess #<span ref="guessCounter" id="count">{this.props.counter}</span>!</p>
  			<ul id="guessList" className="guessBox clearfix">{guessLists}</ul>
      </div>
    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    counter: state.counter,
    guessLists: state.guesses
  };
};

var Container = connect(mapStateToProps)(Guess);
module.exports = Container;
