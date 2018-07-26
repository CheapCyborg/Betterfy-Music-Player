import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema.
const CommentsSchema = new Schema({
    author: String,
    text: String,
}, {
    timestamps: true
});

// export module to use in server.js
export default mongoose.model('Comment', CommentsSchema);