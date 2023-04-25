// routes/routes.js
const express = require('express');
const userController = require('../controllers/userController');
const artistController = require('../controllers/artistController');

const router = express.Router();

// User routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', userController.getUsers);
router.post('/follow/artists/:artistId', userController.authenticateJWT, userController.followArtist);
router.post('/like/songs/:songId', userController.authenticateJWT, userController.likeSongRoute);
router.get('/follow/artists', userController.authenticateJWT, userController.getUserFollowedArtists);
router.get('/like/songs', userController.authenticateJWT, userController.getUserLikedSongs);
router.put('/users', userController.authenticateJWT, userController.updateUserProfile);

// Artist routes
router.get('/songs', artistController.getSongs);
router.get('/artists/:artistId/songs', artistController.getSongsByArtistRoute);
router.post('/artists/songs', userController.authenticateJWT, artistController.uploadSong);
router.put('/artists/songs/:id', userController.authenticateJWT, artistController.editSong);
router.delete('/artists/songs/:id', userController.authenticateJWT, artistController.deleteSongRoute);

module.exports = router;
