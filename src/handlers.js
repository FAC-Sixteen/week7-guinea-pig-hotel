const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const getData = require("./queries/getData");
const postData = require("./queries/postData");
const hashData = require("./pwdGenerate");
const storePwd = require("./queries/hashData.js");

const handlerHome = (request, response) => {
  fs.readFile(
    path.join(__dirname, "..", "public", "index.html"),
    (error, file) => {
      if (error) {
        console.log(error);
        response.writeHead(500, { "Content-Type": "text/html" });
        response.end("<h1>500: server error</h1>");
      } else {
        response.writeHead(200, {
          "Content-Type": "text/html"
        });
        response.end(file);
      }
    }
  );
};

const handleFreeRooms = (request, response) => {
  postData.countFreeRooms((err, res) => {
    if (err) {
      response.writeHead(500, "Content-Type:text/html");
      response.end("<h1>Sorry, there was a problem getting the rooms<h1>");
      console.log(err);
    }
    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    const emptyRooms = 10 - parseInt(res.rows[0].sum);
    response.end(JSON.stringify(emptyRooms));
  });
};

const handlerPublic = (request, response) => {
  const extension = request.url.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    jpg: "image/jpeg",
    png: "image/png",
    ico: "image/x-icon",
    TTF: "font/ttf"
  };

  fs.readFile(path.join(__dirname, "..", request.url), (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>500: server error</h1>");
    } else {
      response.writeHead(200, {
        "Content-Type": extensionType[extension]
      });
      response.end(file);
    }
  });
};

const handleRoomData = (request, response) => {
  getData.getRoomData((err, res) => {
    if (err) {
      response.writeHead(500, "Content-Type:text/html");
      response.end("<h1>Sorry, there was a problem getting the rooms<h1>");
      console.log(err);
    }
    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    let rooms = JSON.stringify(res);
    response.end(rooms);
  });
};

// Takes name, colour, gender from POST //
const handleCheckIn = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    data = JSON.parse(data);
    const name = data.name;
    const colour = data.colour;
    const gender = data.gender;
    console.log({ name, colour, gender });
    postData.checkIn(name, colour, gender, (err, res) => {
      if (err) console.log(err);
      response.writeHead(200, { "content-type": "application/json" });
      console.log(res);
      response.end(JSON.stringify(res[0]));
    });
  });
};
// Sends the data to postData.checkIn  >>

const handleUsers = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    hashData(data, (err, res_one) => {
      storePwd(res_one, (err, res) => {
        console.log(res_one);
        if (err) console.log(err);
        response.writeHead(200, { "content-type": "application/json" });
        response.end();
      });
    });
  });
};

const handleLogIn = (request, response) => {
  console.log("hai");
  let data = "";
  request.on("data", chunk => {
    console.log("chunkin");
    data += chunk;
  });
  request.on("end", () => {
    console.log({ data });
    data = JSON.parse(data);
    const { username, password } = data;
    console.log({ username, password });
    postData.checkUsername(username, (err, res) => {
      if (err) console.log(err);
      response.writeHead(200, { "content-type": "application/json" });
      console.log({ res });
      if (res.length === 0) {
        response.end(JSON.stringify({ username: false, password: false }));
      }
    });
  });
};

module.exports = {
  handlerHome,
  handlerPublic,
  handleRoomData,
  handleCheckIn,
  handleFreeRooms,
  handleLogIn,
  handleUsers
};
