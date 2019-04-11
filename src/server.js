const http = require('http');
// const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 7000;
const router = require('./router');

http.createServer(router).listen(port, () => {
console.log(`Hotel running at http://localhost:${port}`);
});