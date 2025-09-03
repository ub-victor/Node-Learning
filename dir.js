// Import Node.js built-in "fs" (File System) module.
// This module allows you to interact with the file system (read, write, create, delete).
const fs = require('fs');


// Check if the directory named "new" does NOT exist
if (!fs.existsSync('./new')) {
    
    // Create a new directory called "new" (synchronously, blocking operation)
    fs.mkdirSync('./new'); 
    
    // Log a confirmation message to the console
    console.log('Directory created successfully!');
}


// Check if the directory named "new" DOES exist
if (fs.existsSync('./new')) {
    
    // Remove the "new" directory (synchronously, blocking operation)
    fs.rmdirSync('./new');  // using sync version to match mkdirSync
    
    // Log a confirmation message to the console
    console.log('Directory removed successfully!');
}