var React = require('react');
var connect = require('react-redux').connect;

var actions = require('../actions');
var UserInput = require('./user-input');
var Guess = require('./guess');
var Feedback = require('./feedback');
var NewGame = require('./new-game');

var Game = React.createClass({
  render: function () {
    return (
      <div>
        <Feedback />
        <UserInput />
        <Guess />
        <NewGame />
      </div>
    );
  }
});

module.exports = Game;
