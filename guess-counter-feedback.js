var React = require('react');
var connect = require('react-redux').connect;

var actions = require('./actions');

var guess = React.createClass({
  render: function() {
    return (
      <li>{this.props.number}</li>
    );
  }
});

var guessList = React.createClass({
  render: function() {
    return (
      <ul id="guessList" class="guessBox clearfix">
        <Guess />
			</ul>
    );
  }
});

var counter = React.createClass({
  render: function() {
    return (
      <p>Guess #<span id="count">0</span>!</p>
    );
  }
});

var feedback = React.createClass({
  render: function() {
    return (
      <h2 id="feedback">Make your Guess!</h2>
    );
  }
});
