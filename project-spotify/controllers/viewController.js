const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/login-view", function (req, res) {
  res.sendFile(path.join(__dirname, "../view/login.html"));
});

router.get("/users-view", function (req, res) {
  res.sendFile(path.join(__dirname, "../view/users.html"));
});

router.get("/songs-view", function (req, res) {
  res.sendFile(path.join(__dirname, "../view/songs.html"));
});

router.get("/profile-view", function (req, res) {
  res.sendFile(path.join(__dirname, "../view/profile.html"));
});

module.exports = router;
