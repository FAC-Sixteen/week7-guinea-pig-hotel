const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const getData = require("./queries/getData");
const postData = require("./queries/postData");
const hashData = require("./pwdGenerate");

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
    const name = querystring.parse(data).name;
    const colour = querystring.parse(data).colour;
    const gender = querystring.parse(data).gender;
    postData.checkIn(name, colour, gender, (err, res) => {
      if (err) console.log(err);
      response.writeHead(302, { Location: "/" });
      response.end();
    });
  });
};
// Sends the data to postData.checkIn  >>

const handleUsers = (request, response) => {
  // hashData();
  console.log(request);
};

module.exports = {
  handlerHome,
  handlerPublic,
  handleRoomData,
  handleCheckIn,
  handleFreeRooms,
  handleUsers
};
