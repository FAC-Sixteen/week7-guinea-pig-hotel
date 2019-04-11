const handlers = require("./handlers");

const router = (request, response) => {
  if (request.url === "/") {
    handlers.handlerHome(request, response);
  } else if (request.url.includes("/public/")) {
    handlers.handlerPublic(request, response);
  }
};

module.exports = router;
