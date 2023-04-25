// controllers/artistController.js

const express = require('express');

const { songs } = require('../model.js');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
const { getSongById, getSongsByArtist, addSong, updateSong, deleteSong } = require('../helpers/helpers');

function getSongs(req, res) {
    res.json({ songs });
};

// - Artists are limited to the following functionality view their list of followers
// edit and delete their existing songs. they cannot like songs, follow other artists, or view/edit their own profile.

function getSongsByArtistRoute(req, res) {
    const artistId = req.user.id;
    const artistSongs = getSongsByArtist(artistId);
    res.json({ songs: artistSongs });
};


// - Artists are limited to the following functionality: upload new songs, edit and delete their existing songs. 
// they cannot like songs, follow other artists, or view/edit their own profile.
function uploadSong(req, res) {
    const { title, url } = req.body;
    const artistId = req.user.id;
    const song = addSong(title, url, artistId);
    if (!song) {
        return res.status(400).json({ message: 'Unable to add song' });
    }
    res.status(201).json({ song });
};

function editSong(req, res) {
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
};

function deleteSongRoute(req, res) {
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
};

module.exports = { getSongs, getSongsByArtistRoute, uploadSong, editSong, deleteSongRoute };
