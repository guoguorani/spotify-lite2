// controllers/userController.js

const express = require('express');

const { users } = require('../model.js');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
const { addUser, getUserById, getUserByEmail, updateUser, followUser, likeSong, getSongById, generateToken, authenticate, authenticateJWT } = require('../helpers/helpers');

// Routes
async function register (req, res) {
    const { name, email, password, role} = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: 'Email already taken' });
    }
    const user = await addUser(name, email, password, role);
    const token = generateToken(user);
    res.status(201).json({ user, token });
};

 async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const result = await authenticate(email, password);
    if (!result) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const { user, token } = result;
    res.json({ user, token });
  };
  

//   app.get('/api/users', (req, res) => {
function getUsers(req, res)  {
    res.json({ users });
  };
  
  // Users are limited to the following functionality: follow the artists
  function followArtist(req, res) {
    const { artistId } = req.params;
    const userId = req.user.id;
    const success = followUser(userId, artistId);
    if (!success) {
      return res.status(400).json({ message: 'Unable to follow artist' });
    }
    res.json({ message: 'Successfully followed artist' });
  };
  
//   - Users are limited to the following functionality: like a song
function likeSongRoute(req, res)  {
    const { songId } = req.params;
    const userId = req.user.id;
    const success = likeSong(userId, songId);
    if (!success) {
      return res.status(400).json({ message: 'Unable to like song' });
    }
    res.json({ message: 'Successfully liked song' });
  };
  
  // Users's following for artists
  function getUserFollowedArtists(req, res) {
    const userId = req.user.id;
    const user = getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const followedArtists = user.following.map((artistId) => getUserById(artistId));
    res.json(followedArtists);
  };
  
  // Users's liked songs
  function getUserLikedSongs(req, res) {
    const userId = req.user.id;
    const user = getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const likedSongs = user.likedSongs.map((songId) => getSongById(songId));
    res.json({ likedSongs });
  };
  
// Users are limited to the following functionality: update their profile information
function updateUserProfile(req, res) {
    const userId = req.user.id;
    const { name, email, password } = req.body;
  
    const user = getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const success = updateUser(userId, name, email, password);
    if (!success) {
      return res.status(400).json({ message: 'Unable to update user' });
    }
    res.json({ message: 'User updated successfully' });
  };
  
  module.exports = { register, login, getUsers, followArtist, likeSongRoute, getUserFollowedArtists, getUserLikedSongs, updateUserProfile, authenticateJWT };
