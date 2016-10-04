var React = require('react');
var connect = require('react-redux').connect;
var store = require('../store');
var actions = require('../actions');

var UserInput = React.createClass({
  onClick: function (event) {
    event.preventDefault();
    this.props.dispatch(actions.onSubmit(this.refs.userGuess.value, this.props.counter));

    this.refs.userGuess.value = '';
  },
  render: function() {
    return (
      <div>
        <form>
          <input ref='userGuess' type="text" name="userGuess" id="userGuess" className="text" autoComplete="off" placeholder="Enter your Guess" required></input>
              <input onClick={this.onClick} type="submit" id="guessButton" className="button" name="submit" value="Guess"></input>
        </form>
      </div>
    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    counter: state.counter,
  }
};

var Container = connect(mapStateToProps)(UserInput);
module.exports = Container;
