const test = require("tape");
const runDbBuild = require("../database/db_build.js");
const postData = require("../queries/postData.js");

test("database test is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});

test("getRoomData", t => {
  runDbBuild((err, res) => {
    t.error(err, "No Error");

    let expected = {};
  });
});
