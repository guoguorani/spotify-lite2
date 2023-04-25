// helpers/helpers.js

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { users, songs } = require('../model.js');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');

const addUser = async (name, email, password, role) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    role,
    following: [],
    likedSongs: []
  };
  users.push(user);
  return user;
};

const getUserById = (id) => users.find((user) => user.id === id);

const getUserByEmail = (email) => users.find((user) => user.email === email);

const followUser = (userId, artistId) => {
  const user = getUserById(userId);
  if (!user) {
    return false;
  }
  if (user.role !== 'user') {
    return false;
  }
  const artist = getUserById(artistId);
  if (!artist || artist.role !== 'artist') {
    return false;
  }
  if (user.following.includes(artistId)) {
    return false;
  }
  user.following.push(artistId);
  return true;
};

const likeSong = (userId, songId) => {
    const user = getUserById(userId);
    if (!user) {
      return false;
    }
    if (user.role !== 'user') {
      return false;
    }
    const song = getSongById(songId);
    if (!song) {
      return false;
    }
    if (user.likedSongs.includes(songId)) {
      return false;
    }
    user.likedSongs.push(songId);
    return true;
  };

const updateUser = async (id, name, email, password) => {
  const user = getUserById(id);
  if (!user) {
    return false;
  }
  if (password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
  }
  if (name || email) {
    user.name = name || user.name;
    user.email = email || user.email;
  } else {
    return false;
  }
  return true;
};

const getSongById = (id) => songs.find((song) => song.id === id);

const getSongsByArtist = (artistId) => songs.filter((song) => song.artist === artistId);

const addSong = (title, url, artistId) => {
    const artist = getUserById(artistId);
    if (!artist) {
      throw new Error('Artist not found');
    }
    if (artist.role !== 'artist') {
      throw new Error('User is not an artist');
    }
    const song = {
      id: uuidv4(),
      title,
      url,
      artist: artistId,
    };
    songs.push(song);
    return song;
  };

const updateSong = (id, title, url) => {
    const song = getSongById(id);
    if (!song) {
      return false;
    }
    song.title = title || song.title;
    song.url = url || song.url;
    return true;
  };
  
  const deleteSong = (id) => {
    const index = songs.findIndex((song) => song.id === id);
    if (index === -1) {
      return false;
    }
    songs.splice(index, 1);
    return true;
  };
 
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
// const secretOrPrivateKey = 'mysecretkey';

function generateToken(user) {
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
  return token;
}

// const generateToken = (user) => jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);

const authenticate = async (email, password) => {
    const user = getUserByEmail(email);
    if (!user) {
      return false;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return false;
    }
    const token = generateToken(user);
    return { user, token };
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  
  const token = authHeader.split(' ')[1]; // Get the token part from the "Bearer <token>" format

  // console.log(token);
  // res.json(jwt.verify(token, JWT_SECRET))

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = { 
  addUser, getUserById, getUserByEmail, 
  updateUser, followUser, likeSong, 
  getSongById, getSongsByArtist, 
  addSong, updateSong, deleteSong,
  generateToken, authenticate, authenticateJWT};
