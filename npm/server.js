const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvent = require('./logEvent');
const EventEmitter = require('events');  
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    
    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }



    
        

}); 

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));






/*
myEmitter.on('log', (msg) => logEvent(msg));

    myEmitter.emit('log', 'Log message 1');
;
*/