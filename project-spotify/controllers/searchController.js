const cors = require("cors");
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://guoguorani:KJ1i0I4MzxeRCtdq@cluster0.rzgsf8r.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose');

async function main() {
  // Create a new MongoClient
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Get a reference to the database
    const database = client.db('test');

    // Get a reference to the collection
    const songsCollection = database.collection('songs_collection');
    const usersCollection = database.collection('spotify_collection');

    // 2. GET /songs?search=“”&language=“”&genre=“” : display a list of songs that match the
    // search input based on artist name or song title, and filtering based on optional inputs such as
    // language and genre.
    router.get('/songs', cors(), async (req, res) => {
      const search = req.query.search;
      const language = req.query.language;
      const genre = req.query.genre;
      let filteredSongs = await songsCollection.find().toArray();
      if (search) {
        filteredSongs = await songsCollection
          .find({
            $or: [
              { title: { $regex: new RegExp(search, 'i') } },
              { artist: { $regex: new RegExp(search, 'i') } },
            ],
          })
          .toArray();
      }
      if (language) {
        filteredSongs = await songsCollection
          .find({
            language: { $regex: new RegExp(language, 'i') },
          })
          .toArray();
      }
      if (genre) {
        filteredSongs = await songsCollection
          .find({
            genre: { $regex: new RegExp(genre, 'i') },
          })
          .toArray();
      }
      res.json(filteredSongs);
    });
  } catch (err) {
    console.error(err);
  }
}

main().catch(console.error);

module.exports = router;
