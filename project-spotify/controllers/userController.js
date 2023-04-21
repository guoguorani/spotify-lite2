const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret";
// const validateToken = require("../middleware/jwt-token")
// express.static
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use("/view", express.static(path.join(__dirname, "/view")));
app.use(cors());

// Set up middleware to parse JSON requests
app.use(express.json());

// Use router to handle all routes
app.use('/', router);

// Connect to the MongoDB cluster
async function main() {
  const uri = "mongodb+srv://guoguorani:KJ1i0I4MzxeRCtdq@cluster0.rzgsf8r.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db("test");
    const songsCollection = database.collection("songs_collection");
    const usersCollection = database.collection("spotify_collection");

    // Middleware for validating JWT token
    const validateToken = (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const token = authHeader.substring(7);
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
      } catch (error) {
        res.status(401).json({ message: "Invalid token" });
      }
    };

    const ObjectId = require("mongodb").ObjectId;

    // - Users should not be able to visit pages or send requests to certain endpoints without a valid JWT.
    // 1. GET /user/songs : display all the songs that a user liked
    router.get("/songs", cors(), validateToken, async (req, res) => {
      // res.json(req.userId)
      try {
        const user = await usersCollection.findOne({
          _id: new mongoose.Types.ObjectId(req.userId),
        });

        if (!user) {
          return res.status(404).send("User not found");
        }

        const likedSongs = await songsCollection
          .find({
            _id: { $in: user.likedSongs },
          })
          .toArray();
        res.json(likedSongs);
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // 1.5. GET /user/artists : display all the artists that a user followed
    router.get("/artists", cors(), validateToken, async (req, res) => {
      try {
        const user = await usersCollection.findOne({
          _id: new mongoose.Types.ObjectId(req.userId),
        });

        if (!user) {
          return res.status(404).send("User not found");
        }

        const followedArtists = user.followedArtists;
        res.json(followedArtists);
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // 1.6. GET /user/info : display all the artists that a user followed
    router.get("/info", cors(), validateToken, async (req, res) => {
      try {
        const user = await usersCollection.findOne({
          _id: new mongoose.Types.ObjectId(req.userId),
        });

        if (!user) {
          return res.status(404).send("User not found");
        }

        res.json(user);
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
 
    // 3. PUT /user/songs/like : user likes a song
    router.put("/songs/like", cors(), validateToken, async (req, res) => {
      try {
        const user = await usersCollection.findOne({
          _id: new mongoose.Types.ObjectId(req.userId),
        });

        if (!user) {
          res.status(404).send("User not found");
        } else {
          const { songId } = req.body;
          if (!user.followedArtists.includes(songId)) {
            await usersCollection.updateOne(
              { _id: user._id },
              { $addToSet: { likedSongs: songId } }
            );
            const updatedUser = await usersCollection.findOne({
              _id: user._id,
            });
            res.json(updatedUser);
          } else {
            res.json(user);
          }
        }
      } catch (err) {
        res.status(401).json({ message: "Invalid token" });
      }
    });

    // 4. PUT /user/artists/follow : user follows an artist
    router.put("/artists/follow", cors(), validateToken, async (req, res) => {
      try {
        const user = await usersCollection.findOne({
          _id: new mongoose.Types.ObjectId(req.userId),
        });

        if (!user) {
          res.status(404).send("User not found");
        } else {
          const artistName = req.body.artistName;

          if (!user.followedArtists.includes(artistName)) {
            await usersCollection.updateOne(
              { _id: user._id },
              { $addToSet: { followedArtists: artistName } }
            );
            const updatedUser = await usersCollection.findOne({
              _id: user._id,
            });
            res.json(updatedUser);
          } else {
            res.json(user);
          }
        }
      } catch (err) {
        res.status(401).json({ message: "Invalid token" });
      }
    });

    // 5. PUT /user/info : user updates their username, email, or password.
    router.put("/info", cors(), validateToken, async (req, res) => {
      try {
        const userId = new mongoose.Types.ObjectId(req.userId);
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const user = await usersCollection.findOne({ _id: userId });

        if (!user) {
          res.status(404).send("User not found");
        } else {
          const update = {};
          if (username) {
            update.username = username;
          }
          if (email) {
            update.email = email;
          }
          if (password) {
            update.password = bcrypt.hashSync(password, 10);
          }

          await usersCollection.updateOne({ _id: userId }, { $set: update });
          const updatedUser = await usersCollection.findOne({ _id: userId });
          res.json(updatedUser);
        }
      } catch (err) {
        res.status(401).json({ message: "Invalid token" });
      }
    });

    // 6. POST /user/signup : user signs up with username, email, and password
    router.post("/signup", async (req, res) => {
      const { name, email, password } = req.body;

      const userExists = await usersCollection.findOne({ email: email });
      if (userExists)
        return res.status(409).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name,
        email,
        password: hashedPassword,
        likedSongs: [],
        followedArtists: [],
      };

      await usersCollection.insertOne(newUser);
      res.status(201).json({ message: "User created" });
    });

    // 7. POST /user/login : user logs in with email and password

    router.post("/login", cors(), async (req, res) => {
      const { email, password } = req.body;
      const user = await usersCollection.findOne({ email: email });

      if (!user) res.status(401).json({ message: "Invalid credentials" });

      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches)
        res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      const decoded_real_jwt = jwt.verify(token, JWT_SECRET);
      const userEmail = decoded_real_jwt.email;

      const likedSongs = await songsCollection
        .find({ _id: { $in: user.likedSongs } })
        .toArray();

      res.json({ token, userEmail, likedSongs });
    });

    // 8. POST /user/logout : user logs out
    router.post("/logout", cors(), (req, res) => {
      // The client should clear the JWT token, so there is no need to do anything on the server side
      res.json({ message: "Logged out successfully" });
    });
  } catch (err) {
    console.error(err);
  } 
}

main().catch(console.error);

module.exports = router;