const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String, // 'type' should be lowercase
        required: true, // Indicate that title is a required field
    },
    content: {
        type: String, // 'type' should be lowercase
        required: true, // Indicate that content is a required field
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true, // Indicate that author is a required field
    }
});

const Post = mongoose.model('Post', postSchema); // Model names should be capitalized
module.exports = Post; // Corrected the export statement
