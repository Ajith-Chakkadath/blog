const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String, // 'type' should be lowercase
        required: true, // Indicate that username is a required field
    },
    email: {
        type: String, // 'type' should be lowercase
        required: true, // Indicate that email is a required field
    },
    password: {
        type: String, // 'type' should be lowercase
        required: true, // Indicate that password is a required field
    }
});

const User = mongoose.model('User', UserSchema); // Model names should be capitalized
module.exports = User; // Corrected the export statement
