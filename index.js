var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;

var store = require('./store');
var Guess = require('./guess');
var Feedback = require('./feedback');

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={store}>
      <Guess/>
    </Provider>,
    document.getElementById('game'));
});
