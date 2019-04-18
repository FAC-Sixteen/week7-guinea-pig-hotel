const databaseConnection = require("../database/db_connection.js");

const storePwd = (hashed, cb) => {
  databaseConnection.query(
    "INSERT INTO users (password) VALUES ($1)",
    [hashed],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    }
  );
};

module.exports = storePwd;
