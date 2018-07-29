import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import mongoose from "mongoose";
import { getSecret } from "./secrets.js";
import {Comment, User} from "./models/comment.js";
import path from 'path'

const app = express();
const router = express.Router();

const API_PORT = process.env.PORT || 8080;

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(logger("dev"));

// Use our router configuration when we call /api
app.use("/api", router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

if(process.env.NODE_ENV === "production"){
    app.use(express.static('../my-app/build'));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'my-app', 'build', "index.html"))
    })
}

mongoose.connect(process.env.MONGOLAB_URI || 
    getSecret("dbUri"),
    {
        useNewUrlParser: true
    }
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// User Routes
router.get("/Users", (req, res) => {
    User.find()
        .then(items => res.json(items))
});

router.post("/Users", (req, res) => {
    const user = new User()
    const {userID, name, country, email, product} = req.body
    if(!name || !email || !product || !userID || !country){
        return res.json({
            success: false,
            error: "You must provide a id, name, country, email, and product"
        });
    }
    user.userID = userID
    user.name = name
    user.country = country
    user.email = email
    user.product = product
    user.save()
    .then(item => res.json(item))
});

// Comment Routes
router.get("/", (req, res) => {
    res.json({ message: "Hello, World!" });
});

router.post("/comments", (req, res) => {
    const comment = new Comment();
    const { author, text } = req.body;
    if (!author || !text) {
        return res.json({
            success: false,
            error: "You must provide an author and comment"
        });
    }
    comment.author = author;
    comment.text = text;
    comment.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// PUT
router.put("/comments/:commentId", (req, res) => {
    const { commentId } = req.params;
    if (!commentId) {
        return res.json({
            success: false,
            error: "No comment id provided"
        });
    }
    Comment.findById(commentId, (error, comment) => {
        if (error)
            return res.json({
                success: false,
                error
            });
        const { author, text } = req.body;
        if (author) comment.author = author;
        if (text) comment.text = text;
        comment.save(error => {
            if (error)
                return res.json({
                    success: false,
                    error
                });
            return res.json({
                success: true
            });
        });
    });
});

router.delete("/comments/:commentId", (req, res) => {
    const { commentId } = req.params;
    if (!commentId) {
        return res.json({
            success: false,
            error: "No comment id provided"
        });
    }
    Comment.remove(
        {
            _id: commentId
        },
        (error, comment) => {
            if (error)
                return res.json({
                    success: false,
                    error
                });
            return res.json({
                success: true
            });
        }
    );
});

router.get("/comments", (req, res) => {
    Comment.find((err, comments) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: comments });
    });
});

