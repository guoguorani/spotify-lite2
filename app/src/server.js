// server.js

const { users, songs } = require('./model.js');

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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


const getSongById = (id) => songs.find((song) => song.id === id);

const getSongsByArtist = (artistId) => songs.filter((song) => song.artist === artistId);

const updateSong = (id, title, url) => {
    const song = getSongById(id);
    if (!song) {
      return false;
    }
    song.title = title || song.title;
    song.url = url || song.url;
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
  
  const deleteSong = (id) => {
    const index = songs.findIndex((song) => song.id === id);
    if (index === -1) {
      return false;
    }
    songs.splice(index, 1);
    return true;
  };
 
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
const secretOrPrivateKey = 'mysecretkey';

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

// const authenticateJWT = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };

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


// Routes
app.post('/api/register', async (req, res) => {
  const { name, email, password, role} = req.body;
  if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
  }
  const existingUser = getUserByEmail(email);
  if (existingUser) {
      return res.status(400).json({ message: 'Email already taken' });
  }
  const user = await addUser(name, email, password, role);
  const token = generateToken(user);
  res.status(201).json({ user, token });
});

app.post('/api/login', async (req, res) => {
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
});

app.get('/api/songs', (req, res) => {
  res.json({ songs });
});

app.get('/api/users', (req, res) => {
  res.json({ users });
});

// - Users are limited to the following functionality: follow the artists
app.post('/api/follow/artists/:artistId', authenticateJWT, (req, res) => {
  const { artistId } = req.params;
  const userId = req.user.id;
  const success = followUser(userId, artistId);
  if (!success) {
    return res.status(400).json({ message: 'Unable to follow artist' });
  }
  res.json({ message: 'Successfully followed artist' });
});

// - Users are limited to the following functionality: like a song
app.post('/api/like/songs/:songId', authenticateJWT, (req, res) => {
  const { songId } = req.params;
  const userId = req.user.id;
  const success = likeSong(userId, songId);
  if (!success) {
    return res.status(400).json({ message: 'Unable to like song' });
  }
  res.json({ message: 'Successfully liked song' });
});

// Users's following for artists
app.get('/api/follow/artists', authenticateJWT, (req, res) => {
  const userId = req.user.id;
  const user = getUserById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const followedArtists = user.following.map((artistId) => getUserById(artistId));
  res.json({ followedArtists });
});

// Users's liked songs
app.get('/api/like/songs', authenticateJWT, (req, res) => {
  const userId = req.user.id;
  const user = getUserById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const likedSongs = user.likedSongs.map((songId) => getSongById(songId));
  res.json({ likedSongs });
});

// - Users are limited to the following functionality: update their profile information
app.put('/api/users/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const user = await getUserById(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (req.user.id !== user.id) {
    return res.status(403).json({ message: 'You are not authorized to edit this user' });
  }
  const success = await updateUser(id, name, email, password);
  if (!success) {
    return  res.status(400).json({ message: 'Unable to update user' });
  }
  res.json({ message: 'User updated successfully' });
});


// - Artists are limited to the following functionality view their list of followers
// edit and delete their existing songs. they cannot like songs, follow other artists, or view/edit their own profile.
app.get('/api/artists/:artistId/songs', (req, res) => {
  const { artistId } = req.params;
  const songs = getSongsByArtist(artistId);
  res.json({ songs });
});

// - Artists are limited to the following functionality: upload new songs, edit and delete their existing songs. they cannot like songs, follow other artists, or view/edit their own profile.
app.post('/api/artists/songs', authenticateJWT, (req, res) => {
  const { title, url } = req.body;
  const artistId = req.user.id;
  const song = addSong(title, url, artistId);
  if (!song) {
    return res.status(400).json({ message: 'Unable to add song' });
  }
  res.status(201).json({ song });
});

app.put('/api/artists/songs/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;
  const { title, url } = req.body;
  const song = getSongById(id);
  if (!song) {
    return res.status(404).json({ message: 'Song not found' });
  }
  if (song.artist !== req.user.id) {
    return res.status(403).json({ message: 'You are not authorized to edit this song' });
  }
  const success = updateSong(id, title, url);
  if (!success) {
    return res.status(400).json({ message: 'Unable to update song' });
  }
  res.json({ message: 'Song updated successfully' });
});

app.delete('/api/artists/songs/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;
  const song = getSongById(id);
  if (!song) {
    return res.status(404).json({ message: 'Song not found' });
  }
  if (song.artist !== req.user.id) {
    return res.status(403).json({ message: 'You are not authorized to delete this song' });
  }
  const success = deleteSong(id);
  if (!success) {
    return res.status(400).json({ message: 'Unable to delete song' });
  }
  res.json({ message: 'Song deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
