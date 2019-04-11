const databaseConnection = require("../database/db_connection.js");

const getRoomData = cb => {
  databaseConnection.query("SELECT * FROM rooms", (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getGuineaData = cb => {
  databaseConnection.query("SELECT * FROM guinea_pigs", (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = { getRoomData, getGuineaData };
