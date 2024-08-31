// prevent event-bus service crashing while query service is down
process.on("uncaughtException", function (err) {
  console.log(err);
});

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

// create new express app
const app = express();

// associate the body parser json middleware with the new express app
app.use(bodyParser.json());

const events = [];

// set post handler to event bus.
// /events is the path
app.post("/events", (req, res) => {
  // in the request body could be everything
  // it will be sent to the different running services
  const event = req.body;

  // most recent event received will be at the end of array
  events.push(event);

  // to send the event (req.body) received to 3 different services running on ports below
  axios.post("http://localhost:4000/events", event); // post service
  axios.post("http://localhost:4001/events", event); // comments service
  axios.post("http://localhost:4002/events", event); // query service
  axios.post("http://localhost:4003/events", event); // moderation service

  // assuming the 3 post requests were successful
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on port 4005");
});
