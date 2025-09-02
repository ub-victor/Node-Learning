// Import the built-in 'fs' (File System) module provided by Node.js
// This module lets you interact with files (read, write, delete, etc.)
const fsPromises = require('fs').promises;
const path = require(`path`);

const fileOps = async ()=> {
    try{
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8');
        console.log(data);
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), 'Nice to meet ya');
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nYes it is');
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf-8');
        console.log(newData);

    }catch(err){
        console.error('Error occurred:', err);
    }
}
