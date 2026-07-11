const express = require("express");

const app = express();

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to SnapNotes API 🚀");
});

module.exports = app;