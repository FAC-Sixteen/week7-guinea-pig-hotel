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

const findGuinea = (name, colour, gender, cb) => {
  console.log("find guinea");
  databaseConnection.query(
    "SELECT guinea_id FROM guinea_pigs WHERE guinea_name = $1 AND guinea_colour = $2 AND gender = $3 LIMIT 1",
    [name, colour, gender],
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        console.log(res.rows[0]["guinea_id"]);
        cb(null, res.rows);
      }
    }
  );
};

const newRoom = (id, cb) => {
  console.log("new room");
  databaseConnection.query(
    "UPDATE rooms SET occupied = '1', guinea_id = $1 WHERE room_num = (SELECT room_num FROM rooms WHERE occupied = '0' LIMIT 1)",
    [id],
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
  countFrees,
  findGuinea,
  newRoom
};
