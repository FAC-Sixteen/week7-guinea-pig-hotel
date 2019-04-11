const fs = require('fs');
const path = require('path');

const handlerHome = (request, response) => {

response.writeHead(200, {'Content-type': 'text/html'});
    response.end();

}


module.exports = {handlerHome};