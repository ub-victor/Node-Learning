// const add =  (a, b) => a+b;
// const subtract = (a, b) => a-b;
// const multiply = (a, b) => a*b;
// const divide = (a, b) => a/b;

// //module.exports = { add, subtract, multiply, divide };

// Here is the other way to export the functions
exports.add = (a, b) => a + b; // Here it means the exports object will have a property called add
exports.subtract = (a, b) => a - b;
exports.multiply = (a, b) => a * b;
exports.divide = (a, b) => a / b;
