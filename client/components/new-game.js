var React = require('react');
var actions = require('../actions');
var connect = require('react-redux').connect;
var store = require('../store');

var NewGame = React.createClass({
  onClick: function() {
        this.props.dispatch(actions.newGame());
    },
    render: function() {
        return(
            <div>
                <button type='button' onClick={this.onClick}>New Game</button>
            </div>
        );
    }
});

var Container = connect()(NewGame);
module.exports = Container;
