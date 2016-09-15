var React = require('react');
var connect = require('react-redux').connect;

var actions = require('./actions');

var Counter = React.createClass({
  render: function() {
    var counters = [];
    for (var i=0; i < this.props.guess; i++) {
      var counter = (
        <span key={i} onChange={this.addCounter} id="count">{counter}</span>
      )
    }
    counters.push(counter);
    console.log('what is counters', counters);
    console.log('what is this?', this.props);

    return (
      <div>
        <p>Guess #{counters}!</p>
      </div>
    );
  }
});

module.exports = Counter;
