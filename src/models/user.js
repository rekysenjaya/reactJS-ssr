// Importing Node packages required for schema
const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    id: String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: String,
    lastname: String,
    role: String,
    image: String
});


module.exports = mongoose.model('User', UserSchema);
