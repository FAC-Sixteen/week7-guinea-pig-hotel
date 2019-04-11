const handlers = require("./handlers");

const router = (request, response) => {
  if (request.url === "/") {
    handlers.handlerHome(request, response);
  } else if (request.url.includes("/public/")) {
    handlers.handlerPublic(request, response);
  } else if (request.url === "/rooms") {
    handlers.handleRoomData(request, response);
  } else if (request.url === "/check-in") {
    handlers.handleCheckIn(request, response);
  } else {
    response.writeHead(404, {
      "Content-Type": "text/html"
    });
    response.end("404: File not found");
  }
};

module.exports = router;
