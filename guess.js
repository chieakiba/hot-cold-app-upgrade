var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;

var GuessList = require('./guess-list');

var actions = require('./actions');

var Guess = React.createClass({
  addGuess: function() {
    var userGuess = [];
    var userInput = this.refs.userInput.value;
    userGuess.push(userInput);
    this.props.dispatch(actions.addGuess(userGuess));
  },
  addCounter: function() {
    var counter = this.userGuess.length;
    this.props.dispatch(actions.addCounter(counter));
  },
  render: function(props) {
    var guesses =
    this.props.guesses.map(function(guess) {
      return <Guess guess={guess} key={guess.index}/>;
    });

    var counters =
    this.props.counters.map(function(counter) {
      return <Counter counter={counter} key={counter.index}/>;
    });

    return (
      <div>
        <form>
  				<input ref="userInput" type="text" name="userGuess" id="userGuess" class="text" maxlength="3" autocomplete="off" placeholder="Enter your Guess" required></input>
        			<input onClick={this.addGuess} type="submit" id="guessButton" class="button" name="submit" value="Guess"></input>
  			</form>
        <p>Guess #<span onChange={this.addCounter} id="count">{counters}</span>!</p>
          <ul id="guessList" class="guessBox clearfix">{guesses}
    			</ul>
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

var Container = connect(mapStateToProps)(Guess);

module.exports = Container;
