const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Home Route
app.get("/", (req, res) => {
 res.json({
  message: "Welcome to SnapNotes API 🚀",
});
});

module.exports = app;