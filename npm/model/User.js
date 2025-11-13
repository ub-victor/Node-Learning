const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {
        type: String,
        require: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        }
    }
})