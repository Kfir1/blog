// the moderation service is watch for event

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

// one route handler for events
app.post("/events", (req, res) => {});

// add to port to listen through (4003)
app.listen(4003, () => {
  console.log("Listening on port 4003");
});
