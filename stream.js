// Import the built-in File System (fs) module
const fs = require('fs');

// Create a readable stream from the file 'lorem.txt'
// - './files/lorem.txt' is the source file
// - { encoding: 'utf-8' } means data will be read as text (not raw bytes)
const rs = fs.createReadStream('./files/lorem.txt', { encoding: 'utf-8' });

// Create a writable stream to 'new-lorem.txt'
// - This is the destination file
// - If 'new-lorem.txt' does not exist, it will be created automatically
// - If it exists, it will be overwritten
const ws = fs.createWriteStream('./files/new-lorem.txt');

// Listen for the 'data' event on the readable stream (rs)
// 'data' event is emitted whenever a chunk of data is available
// rs.on('data', (dataChunk) => {
//     // Write that chunk into the writable stream (ws)
//     // This copies the content chunk by chunk
//     ws.write(dataChunk);
// });

rs.pipe(ws); // Pipe means: take data from rs and pass it directly to ws
