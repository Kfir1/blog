// this query service will not emit any event, so axios dependecy not intalled

const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(cors());

// 2 route handlers:
// this endpoint will send posts information
app.get("/posts", (req, res) => {});
// this endpoint will receive events from the event bus
app.post("/events", (req, res) => {});

app.listen(4002, () => {
  console.log("Listening on port 4002");
});
