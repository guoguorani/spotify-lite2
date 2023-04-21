const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://guoguorani:KJ1i0I4MzxeRCtdq@cluster0.rzgsf8r.mongodb.net/test?retryWrites=true&w=majority";
const cors = require("cors");
var mongoose = require("mongoose");

const viewRoutes = require("./controllers/viewController");
const songRoutes = require("./controllers/songController");
const searchRoutes = require("./controllers/searchController");
const usersRoutes  = require("./controllers/userController");

// express.static
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use("/utils", express.static(path.join(__dirname, "/utils")));
app.use(cors());

// Set up middleware to parse JSON requests
app.use(express.json());

// Use router to handle all routes
app.use('/', router);

// Controllers
router.use("/", viewRoutes);
router.use("/search", searchRoutes);
router.use("/songs", songRoutes);
router.use("/user", usersRoutes);

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
    const database = client.db("test");

    // Get a reference to the collection
    const songsCollection = database.collection("songs_collection");
    const usersCollection = database.collection("spotify_collection");

    router.get("/users", async (req, res) => {
      const result = await usersCollection.find({}).toArray();
      res.json(result);
    });
  } catch (err) {
    console.error(err);
  } finally {
    // Close the client
    // await client.close();
  }
}

main().catch(console.error);

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
