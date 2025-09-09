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

    let path;
       if(req.url === '/' || req.url === 'index.html'){
           res.statusCode = 200;
           res.setHeader('Content-Type', 'text/html');
           path = path.join(__dirname, 'views', 'index.html');
           fs.readFile(path, 'utf8', (err, data)=>{
               res.end(data); 
           })
        } 

       if(req.url === '/' || req.url === 'index.html'){
           res.statusCode = 200;
           res.setHeader('Content-Type', 'text/html');
           path = path.join(__dirname, 'views', 'index.html');
           fs.readFile(path, 'utf8', (err, data)=>{
               res.end(data); 
           })
        }  
}); 

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));






/*
myEmitter.on('log', (msg) => logEvent(msg));

    myEmitter.emit('log', 'Log message 1');
;
*/