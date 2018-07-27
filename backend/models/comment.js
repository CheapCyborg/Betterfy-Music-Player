import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema.
const CommentsSchema = new Schema({
    author: String,
    text: String,
}, {
    timestamps: true
});

const UserSchema = new Schema({
    userID: String,
    birthdate: String,
    country: String,
    name: String,
    email: String,
    product: String
})

// export module to use in server.js
const Comment = mongoose.model('Comment', CommentsSchema);
const User  = mongoose.model('User', UserSchema);
module.exports = {Comment, User};
