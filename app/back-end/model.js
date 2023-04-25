const { v4: uuidv4 } = require('uuid');

const users = [
  {
    id: uuidv4(),
    name: "John",
    email: "john@example.com",
    password: "$2b$10$g7M01OoB0ozg/C2jz5J5IOT1d.XeGBihVcUKahXJ70uwn7lIvgfIu",
    role: "user",
  },
  {
    id: uuidv4(),
    name: "Emily",
    email: "emily@example.com",
    password: "$2b$10$Rj/kTwvru8oB0qJto3DUNuTdcMwEZ8N/o1ZjOZXJhEGkYZoQ.d8wm",
    role: "artist",
  },
  {
    id: uuidv4(),
    name: "Jane",
    email: "jane@example.com",
    password: "$2b$10$OveF8f.Vrfo03zQlZ74YdOzW8GNvTRIb.u6yqLLM0c0s8joM6UxJe",
    role: "user",
  },
  {
    id: uuidv4(),
    name: "Sarah",
    email: "sarah@example.com",
    password: "$2b$10$t/fE2Kj5/A5F5M5V5S/DR.4PhVvcIZpGdc1N4c4e4wVSWHrkLhR8G",
    role: "artist",
  },
  {
    id: uuidv4(),
    name: "Ava",
    email: "ava@example.com",
    password: "$2b$10$7VlSP4l4.tSnMwAbpI/SHOy1FfoVoG14/YZ2QdN1YiKOrWkjGvSKq",
    role: "artist",
  },
];

const songs = [
  {
    id: uuidv4(),
    title: "Song 1",
    url: "https://www.example.com/song1",
    artist: users[1].id,
  },
  {
    id: uuidv4(),
    title: "Song 2",
    url: "https://www.example.com/song2",
    artist: users[3].id,
  },
  {
    id: uuidv4(),
    title: "Song 3",
    url: "https://www.example.com/song3",
    artist: users[3].id,
  },
  {
    id: uuidv4(),
    title: "Song 4",
    url: "https://www.example.com/song4",
    artist: users[4].id,
  },
];

// Update the following and likedSongs arrays for users
users[0].following = [users[1].id, users[3].id];
users[0].likedSongs = [songs[0].id, songs[3].id];

users[1].following = [];
users[1].likedSongs = [songs[0].id, songs[2].id, songs[1].id];

users[2].following = [users[1].id, users[4].id];
users[2].likedSongs = [songs[0].id, songs[3].id, songs[1].id];

users[3].following = [];
users[3].likedSongs = [songs[0].id, songs[2].id];

users[4].likedSongs = [songs[0].id, songs[2].id];

module.exports = { users, songs };
