const fs = require("fs");
const dbConnection = require("./db_connection");

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

const freshBuild = () => {
  dbConnection.query(sql, (err, res) => {
    if (err) throw err;
    console.log("Guinea Pig Hotel database is: ", res);
  });
};

const runDbBuild = cb => {
  dbConnection.query(sql, cb);
};

freshBuild();

module.exports = runDbBuild;
