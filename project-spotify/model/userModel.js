const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  likedSongs: [{ type: mongoose.Types.ObjectId, ref: "Song" }],
  followedArtists: [String],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
