var React = require('react');
var connect = require('react-redux').connect;

var Feedback = React.createClass({
  render: function() {
    return (
      <h2 id="feedback">{this.props.msg}</h2>
    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    msg: state.msg
  };
};

var Container = connect(mapStateToProps)(Feedback);
module.exports = Container;
