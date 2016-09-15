var React = require('react');
var connect = require('react-redux').connect;

var actions = require('./actions');

var NewGame = React.createClass({
  newGame: function(event) {
    event.preventDefault();
    this.props.dispatch(actions.playAgain);
  },

  render: function() {
    return (
      <ul>
        <li><a onClick={this.newGame} class="new" href="#">+ New Game</a></li>
      </ul>
    );
  }
});

var Container = connect()(NewGame);

module.exports = Container;
