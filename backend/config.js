console.log("what is NODEENV?", process.env.NODE_ENV);

exports.DATABASE_URL = process.env.DATABASE_URL ||
  global.DATABASE_URL ||
  process.env.NODE_ENV === 'development' ?
  'mongodb://localhost/fewest-guesses' :
  'mongodb://localhost/fewest-guesses';
exports.PORT = process.env.PORT || 8080;
