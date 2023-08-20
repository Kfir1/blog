// assign express middleware to variable
const express = require("express");

// assign body-parser middleware to variable
const bodyParser = require("body-parser");

// randomly generate new id with crypto package for new posts
// assign it to the object the user sent and store it in memory
const { randomBytes } = require("crypto");

// handling cors errors
const cors = require("cors");

const app = express();

// parse body of request to json
app.use(bodyParser.json());

// connect cors to the express application as a middleware
// make sure to call cors() cause it's a function
app.use(cors());

// object for comments by post id
const commentsByPostId = {};

// route for GET all posts posts
app.get("/posts/:id/comments", (req, res) => {
  // send all commentsByPostId that has been created
  // look inside the commentsByPostId object with the id comming from URL dynamic :id path with req.params.id
  // if is undefined use guard against with ||, to send an array in any case either full or empty
  res.send(commentsByPostId[req.params.id] || []);
});

// route for POST new posts
app.post("/posts/:id/comments", (req, res) => {
  //create random id with randomBytes method
  // 4 bytes of data, convert to string in hex
  const commentId = randomBytes(4).toString("hex");
  // assign content object the user sent
  const { content } = req.body;

  // to check if already got some array in commentsByPostId object for the given post id from URL
  // commentsByPostId[req.params.id] could be undefined so || return array if exist or empty array [] if not
  const comments = commentsByPostId[req.params.id] || [];

  // push into array the new comment created
  // content is the user content of comment
  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  // send response to user - 201 (created a resource)
  res.status(201).send(comments);
});

// listen on port 4001 - chose different port from posts service 4000 port
app.listen(4001, () => {
  console.log("Listening on 4001");
});
