var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;

var actions = require('./actions');

var Feedback = React.createclass({
  response: function() {

    //give feedback if userGuess is correct
    if (newGuess == randomNumber) {
      var correctGuess = 'Correct! Click "New Game" to play again.';
      this.props.dispatch(actions.response(correctGuess));;
    }
    //give feedback if userGuess is close to the correct number
    else if (distancefromCorrectAnswer <= 10 && distancefromCorrectAnswer >= 1) {
      var veryCloseGuess = 'Hot!';
      this.props.dispatch(actions.response(veryCloseGuess));
    }
    //give feedback if userGuess is getting closer to the correct number
    else if (distancefromCorrectAnswer <= 20 && distancefromCorrectAnswer >= 11) {
      var closerGuess = 'Warmer';
      this.props.dispatch(actions.response(closerGuess));
    }
    //give feedback if userGuess is farther from the correct number
    else if (distancefromCorrectAnswer <= 30 && distancefromCorrectAnswer >= 21) {
      var farGuess = 'Cold';
      this.props.dispatch(actions.response(farGuess));
    }
    //check if the user entered a number between 1 and 100
    else if (newGuess < 1 || newGuess > 100) {
        alert("Please enter a number between 1 and 100.");
    }
    //check for an invalid input
    else if (!parseInt(newGuess)) {
        alert("Please enter a number.");
    }
    //check that the number is a whole number
    else if (Math.round(newGuess) != newGuess) {
        alert("Please enter a whole number.");
    }
    //give feedback if userGuess is far from the correct number
    else {
        var veryFarGuess = 'Very Cold';
        this.props.dispatch(actions.response(veryFarGuess));
    }
  },
  render: function(props) {
    var feedbacks = this.props.feedbacks.map(function(feedback) {
      console.log('what is in feedback', feedback);
      return <Feedback feedback={feedback} key={feedback} />;
    });
    return (
      <h2 ref='feedback' onChange={this.response} id="feedback">{this.response}</h2>
    );
  }
});

var mapStateToProps = function (state, props) {
  return {
    feedbacks: state
  };
};

var Container = connect(mapStateToProps)(Feedback);

module.exports = Container;
