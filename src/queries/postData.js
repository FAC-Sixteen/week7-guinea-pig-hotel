const databaseConnection = require("../database/db_connection.js");

const countFrees = cb => {
  console.log("made it to frees");
  databaseConnection.query(
    "SELECT SUM(CAST(occupied AS INT)) FROM rooms",
    (err, res) => {
      console.log("made it to cb");
      if (err) {
        return cb(err);
      } else {
        console.log("made it to else");
        console.log(res);
        cb(null, res);
      }
    }
  );
};

const checkIn = (name, colour, gender, cb) => {
  databaseConnection.query(
    "INSERT INTO guinea_pigs (guinea_name, guinea_colour, gender, room_num, here) VALUES ($1, $2, $3, $4, $5)",
    [name, colour, gender, 203, "1"],
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        console.log(res);
        cb(null, res);
      }
    }
  );
};

module.exports = {
  checkIn,
  countFrees
};
