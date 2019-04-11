const test = require("tape");
const runDbBuild = require("../database/db_build.js");
const postData = require("../queries/postData.js");
const getData = require("../queries/getData.js");

test("database test is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});

test("getRoomData", t => {
  runDbBuild((err, res) => {
    t.error(err, "No Error");

    let expected = [
      { room_id: 1, room_num: 101, guinea_id: null, occupied: "0" },
      { room_id: 2, room_num: 102, guinea_id: null, occupied: "0" },
      { room_id: 3, room_num: 103, guinea_id: null, occupied: "0" },
      { room_id: 4, room_num: 104, guinea_id: null, occupied: "0" },
      { room_id: 5, room_num: 105, guinea_id: null, occupied: "0" },
      { room_id: 6, room_num: 201, guinea_id: null, occupied: "0" },
      { room_id: 7, room_num: 202, guinea_id: null, occupied: "0" },
      { room_id: 8, room_num: 203, guinea_id: null, occupied: "0" },
      { room_id: 9, room_num: 204, guinea_id: null, occupied: "0" },
      { room_id: 10, room_num: 205, guinea_id: null, occupied: "0" }
    ];

    getData.getRoomData((err, result) => {
      if (err) console.log(err);
      t.deepEqual(result, expected, "returns expected data");
      t.end();
    });
  });
});

test("getGuineaData", t => {
  runDbBuild((err, res) => {
    t.error(err, "No Error");

    let expected = [
      {
        guinea_id: 1,
        guinea_name: "Fluffles",
        guinea_colour: "Ginger",
        gender: "F",
        here: "1",
        room_num: 101,
        room_service: null
      },
      {
        guinea_id: 2,
        guinea_name: "Sparks",
        guinea_colour: "Brown",
        gender: "M",
        here: "1",
        room_num: 102,
        room_service: null
      },
      {
        guinea_id: 3,
        guinea_name: "Spot",
        guinea_colour: "Black and white",
        gender: "M",
        here: "1",
        room_num: 205,
        room_service: null
      }
    ];

    getData.getGuineaData((err, result) => {
      if (err) console.log(err);
      t.deepEqual(result, expected, "returns expected data");
      t.end();
    });
  });
});

test("postGuineaData", t => {
  runDbBuild((err, res) => {
    t.error(err, "No Error");

    let expected = [
      {
        guinea_id: 1,
        guinea_name: "Fluffles",
        guinea_colour: "Ginger",
        gender: "F",
        here: "1",
        room_num: 101,
        room_service: null
      },
      {
        guinea_id: 2,
        guinea_name: "Sparks",
        guinea_colour: "Brown",
        gender: "M",
        here: "1",
        room_num: 102,
        room_service: null
      },
      {
        guinea_id: 3,
        guinea_name: "Spot",
        guinea_colour: "Black and white",
        gender: "M",
        here: "1",
        room_num: 205,
        room_service: null
      },
      {
        guinea_id: 4,
        guinea_name: "Philip",
        guinea_colour: "Gold",
        gender: "M",
        here: "1",
        room_num: 203,
        room_service: null
      }
    ];

    postData.checkIn("Philip", "Gold", "M", (err, result) => {
      if (err) console.log(err);

      getData.getGuineaData((err, result) => {
        if (err) console.log(err);
        t.deepEqual(result, expected, "returns expected data");
        t.end();
      });
    });
  });
});
