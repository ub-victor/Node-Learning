// Import the built-in 'fs' (File System) module provided by Node.js
// This module lets you interact with files (read, write, delete, etc.)
const fs = require('fs');
const path = require(`path`);

// Asynchronously read the content of the file './files/starter.txt'
// 1st argument: file path
// 2nd argument: encoding type ('utf-8' means text file encoded in UTF-8 format)
// 3rd argument: callback function that runs after the file is read
// read file without importing the path  in const path  = require (`path`);
// fs.readFile('./files/starter.txt', 'utf-8', (err, data) => {...});
// let use a simplify way to read the file
// // Build an absolute path to 'starter.txt' inside 'files' folder
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8', (err, data) => {

  // If an error occurs (for example, file not found), throw the error
  if (err) throw err;

  // If no error, log the file's content (the "data") to the console
  console.log(data);
});

// This line will run immediately, even before the file is finished reading,
// because readFile is asynchronous (non-blocking).
console.log('Hello...');
// that is the way of writing files (path.join is used to create a path( , __dirname for absolute path , files is the folder containing the file, reply.txt is the file to be created), then the text to go in the file created (call back function)
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet ya', (err) => {

  // If an error occurs (for example, file not found), throw the error
  if (err) throw err;

    // If no error, log 'Write complete' to the console
  console.log('Write complete');
});

// append file
fs.appendFile(path.join(__dirname, 'files', 'test.txt'), 'Nice to meet ya', (err) => {

  // If an error occurs (for example, file not found), throw the error
  if (err) throw err;

    // If no error, log 'Write complete' to the console
  console.log('Write complete');
});

// Setup a listener for "uncaughtException"
// This runs when an error happens in your code that is not caught anywhere else
process.on('uncaughtException', (err) => {
  // Log the error message to the console
  console.error('There was an uncaught error', err);

  // Exit the Node.js process with code 1 (non-zero means failure)
  process.exit(1);
});
