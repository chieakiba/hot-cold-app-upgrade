var redux = require('redux');
var createStore = redux.createStore;

var reducers = require('./reducers');

var store = createStore(reducers.initialReducer);
module.exports = store;
