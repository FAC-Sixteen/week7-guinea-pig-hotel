const fs = require("fs");
const path = require("path");

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

module.exports = {
  handlerHome,
  handlerPublic
};
