const express = require("express");
const app = express();
const router = express.Router();
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://guoguorani:KJ1i0I4MzxeRCtdq@cluster0.rzgsf8r.mongodb.net/test?retryWrites=true&w=majority";
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use('/api', router);

async function main() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db("test");
    const songsCollection = database.collection("songs_collection");

    router.get("/", async (req, res) => {
      const result = await songsCollection.find({}).toArray();
      res.json(result);
    });

  } catch (err) {
    console.error(err);
  } 
}

main().catch(console.error);

module.exports = router;
