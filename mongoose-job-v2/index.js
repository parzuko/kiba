const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { config } = require("./config");
const DB_URL = config.db_url;
const PORT = 5000;
const app = express();

mongoose.connect(
  DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    err && console.error(err);
    console.log("Successfully connected to MongoDB");
  }
);

app.get("/", (req, res) => {
  return res.send("This is an empty body :( ");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
