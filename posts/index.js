// assign express middleware to variable
const express = require("express");

// assign body-parser middleware to variable
const bodyParser = require("body-parser");

// randomly generate new id with crypto package for new posts
// assign it to the object the user sent and store it in memory
const { randomBytes } = require("crypto");

const app = express();

// parse body of request to json
app.use(bodyParser.json());

const posts = {};

// route for GET all posts posts
app.get("/posts", (req, res) => {
  // send all posts that has been created
  res.send(posts);
});

// route for POST new posts
app.post("/post", (req, res) => {
  //create random id with randomBytes
  // 4 bytes of data, convert to string in hex
  const id = randomBytes(4).toString("hex");
  // assign it to the object the user sent
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };
  // syntax explained:  Property accessors
  // posts is now looking like this
  // Object { id: Object { id: id, title: req.body } }
  // posts[id] same as posts.id

  // send response to user - 201 (created a resource)
  res.status(201).send(posts[id]);
});

// listen on port 4000
app.listen(4000, () => {
  console.log("Listening on 4000");
});
