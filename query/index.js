// this query service will not emit any event, so axios dependecy not intalled

const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(cors());

// posts database structure will be an object
const posts = {};

// 2 route handlers:
// this endpoint will send posts information
app.get("/posts", (req, res) => {
  // to get the entire posts object
  res.send(posts);
});
// this endpoint will receive events from the event bus
app.post("/events", (req, res) => {
  // destructure
  const { type, data } = req.body;

  if (type === "PostCreated") {
    // destructure
    // every post created will have id and title
    const { id, title } = data;

    // insert the information to posts = {} object
    // comments: [] >>> an empty array of comments inside posts array
    // is created to ensure that when type === CommentCreated
    // comments will be added up inside posts object
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    // destructure
    // every post created will have id, title and postId
    const { id, content, postId, status } = data;

    // find the relevant post to update inside of the posts object with postId
    const post = posts[postId];
    // push the new comment to relevant post inside posts = {} object
    // comment will have a given id and some content
    // status will be pending/approveed/rejected
    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    // find comment with appropriate post
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
  // to see the data structure of posts on terminal on the query service
  console.log(posts);

  // send some response - manage the route handler
  // got the event and proccessed it
  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on port 4002");
});
