const databaseConnection = require("../database/db_connection.js");

const getRoomData = cb => {
  databaseConnection.query(
    "SELECT rooms.room_num, rooms.guinea_id, guinea_pigs.guinea_name, rooms.occupied FROM rooms LEFT join guinea_pigs ON rooms.guinea_id = guinea_pigs.guinea_id",
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        cb(null, res.rows);
      }
    }
  );
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
