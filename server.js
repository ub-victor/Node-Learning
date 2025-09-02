// console.log("Hello, World!");
// console.log(global);

// const os = require('os'); // this variable is used to get information about the operating system
// const path  = require(`path`) // this variable is   used to work with file and directory paths
// console.log(os.type()); // it will return the OS type
// console.log(os.version());// it will return the OS version
// console.log(os.homedir()); // it will return the home directory
// console.log(__dirname); // it will return the directory name
// console.log(__filename); // it will return the file name
// console.log(path.dirname(__filename)); // it will return the directory name
// console.log(path.basename(__filename)); // it will return the file name
// console.log(path.extname(__filename)); // it will return the file extension
// console.log(path.parse(__filename)); // it will return the file path in object format

// const math = require('./math'); // this variable is used to import the math.js file

// console.log(math.add(2, 3)); // it will return 5
// console.log(math.subtract(5, 2)); // it will return 3
// console.log(math.multiply(2, 3)); // it will return 6
// console.log(math.divide(6, 2)); // it will return 3

// Let us use the destruturing 
// the require is use to import the math.js file

const {add, subtract, multiply, divide} = require('./math');
console.log(add(2, 3)); // it will return 5
console.log(subtract(5, 2)); // it will return 3
console.log(multiply(2, 3)); // it will return 6
console.log(divide(6, 2)); // it will return 3