const mongoose = require('mongoose'); // Import mongoose library to define schema and interact with MongoDB

const schema = mongoose.Schema; // Define a shorthand for mongoose.Schema

const employeeSchema = new schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Employee', employeeSchema);