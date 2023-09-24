const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

// create new express app
const app = express();

// associate the body parser json middleware with the new express app
app.use(bodyParser.json());

// set post handler to event bus.
// /events is the path
app.post("/events", (req, res) => {
  // in the request body could be everything
  // it will be sent to the different running services
  const event = req.body;

  // to send the event (req.body) received to 3 different services running on ports below
  axios.post("http://localhost:4000/events", event); // post service
  axios.post("http://localhost:4001/events", event); // comments service
  axios.post("http://localhost:4002/events", event); // query service

  // assuming the 3 post requests were successful
  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on port 4005");
});
