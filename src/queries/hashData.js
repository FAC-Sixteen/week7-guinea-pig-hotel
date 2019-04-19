const databaseConnection = require("../database/db_connection.js");

const storePwd = (username, hashed, cb) => {
  databaseConnection.query(
    "INSERT INTO users (username, password) VALUES ($1, $2)",
    [username, hashed],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    }
  );
};

module.exports = storePwd;
