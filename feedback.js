var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;

var actions = require('./actions');

var Feedback = React.createclass({
  response: function() {
    this.props.dispatch(actions.submitGuess(this.props.))
  },
  render: function(props) {
    return (
      <h2 onChange={this.response} id="feedback">{this.props.feedback}</h2>
    );
  }
});

var Container = connect()();

module.exports = Container;
