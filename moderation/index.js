// the moderation service is watch for event

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// one route handler for events
// event will be contained on the req.body property
app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    // check if comment contains "orange" - if yes reject else approve
    const status = data.content.includes("orange") ? "rejected" : "approved";

    setTimeout(async () => {
      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: {
          id: data.id, // comment id
          content: data.content, // content of comment
          postId: data.postId, // ID of post
          status, // status of comment
        },
      }),
        3000;
    });
  }

  res.send({}); // send response - otherwise the request handler going to hang
});

// add to port to listen through (4003)
app.listen(4003, () => {
  console.log("Listening on port 4003");
});
