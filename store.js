//Redux talks to the store where all the states and data are stored. The reducers apply the how-to (logic) to the states and then spit that back to the store to be saved there

var redux = require('redux');
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var thunk = require('redux-thunk').default;

var reducers = require('./reducers');

var store = createStore(reducers.gameReducer, applyMiddleware(thunk));
module.exports = store;
