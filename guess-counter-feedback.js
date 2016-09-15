var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;

var actions = require('./actions');

var Guess = React.createClass({
  getInitialState: function() {
    return {
      feedback: "Make your Guess!",
      userInput: "",
      number: []
    }
  },
  onInputChanged: function(event) {
    this.setState({
      userInput: event.currentTarget.value
    })
  },
  onSubmit: function(event) {
    event.preventDefault();
    var userGuess = this.state.number;
    userGuess.push(this.state.userInput);

    this.setState({number: userGuess});

    this.refs.userInput.value = "Enter your Guess";
  },
  render: function(props) {
    return (
      	<form>
  				<input ref="userInput" onChange={this.onInputChanged} type="text" name="userGuess" id="userGuess" class="text" maxlength="3" autocomplete="off" placeholder="Enter your Guess" required></input>
        			<input onClick={this.onSubmit} type="submit" id="guessButton" class="button" name="submit" value="Guess"></input>
  			</form>
    );
  }
});

var GuessList = React.createClass({
  render: function() {
    return (
      <ul id="guessList" class="guessBox clearfix">
        <Guess />
			</ul>
    );
  }
});

var Counter = React.createClass({
  getInitialState: function() {
    return {
      counter: 0;
    }
  },
  addCounter: function() {
    console.log('what\'s in a counter?', counter);
  },
  render: function(props) {
    return (
      <p>Guess #<span id="count">{}</span>!</p>
    );
  }
});

var Container = connect()();

module.exports = Container;
