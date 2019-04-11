const handlers = require('./handlers');


const router = (request, response) => {
if(request.url === '/'){
    handlers.handlerHome(request, response) 
}
};




module.exports = router;