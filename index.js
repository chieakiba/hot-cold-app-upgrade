var React = require('react');
var ReactDOM = require('react-dom');

var store = require('./store');

var Game = React.createClass({
  render: function () {
    return (
      <div>Does it show up?</div>
    );
  }
});

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Game />, document.getElementById('game'));
});
