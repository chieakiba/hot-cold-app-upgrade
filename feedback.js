var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;

var actions = require('./actions');

var Feedback = React.createclass({
  getInitialState: function() {
    return {
      feedback: "Make your Guess!"
    }
  },
  render: function(props) {
    return (
      <h2 ref="feedback" id="feedback">{feedback}</h2>
    );
  }
});

var Container = connect()();

module.exports = Container;
