const logEvent = require('./logEvent');  // Import the custom logEvent function

const EventEmitter = require('events');  // Import Node.js EventEmitter

// Create a custom class that extends EventEmitter
class MyEmitter extends EventEmitter {};

// Create an instance of the custom event emitter
const myEmitter = new MyEmitter();

// Listen for the 'log' event and handle it by calling logEvent
myEmitter.on('log', (msg) => logEvent(msg));

// After 2 seconds, emit the 'log' event with different messages
setTimeout(() => {
    myEmitter.emit('log', 'Log message 1');
}, 2000);
