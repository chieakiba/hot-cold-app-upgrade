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

    return (
      <div>
        <form>
  				<input ref="userInput" type="text" name="userGuess" id="userGuess" class="text" maxlength="3" autocomplete="off" placeholder="Enter your Guess" required></input>
        			<input onClick={this.addGuess} type="submit" id="guessButton" class="button" name="submit" value="Guess"></input>
  			</form>
        <p>Guess #<span onChange={this.addCounter} id="count">{counter}</span>!</p>
          <ul id="guessList" class="guessBox clearfix">{userGuess}
    			</ul>
      </div>
    );
  }
});

var mapStateToProps = function(state, props) {
  return {

  }
};

var Container = connect()();

module.exports = Container;
