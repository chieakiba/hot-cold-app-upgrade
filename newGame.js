var React = require('react');
var connect = require('react-redux').connect;

var actions = require('./actions');

var newGame = React.createClass({
  render: function() {
    return (
      <ul>
        <li><a class="new" href="#">+ New Game</a></li>
      </ul>
    );
  }
});
