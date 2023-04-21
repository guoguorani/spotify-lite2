const express = require("express");
const request = require("supertest");
const app = express();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret";

const uri =
  "mongodb+srv://guoguorani:KJ1i0I4MzxeRCtdq@cluster0.rzgsf8r.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

describe("User routes", () => {
  let songsCollection, usersCollection, token;

  beforeAll(async () => {
    await client.connect();
    const database = client.db("test");
    songsCollection = database.collection("songs_collection");
    usersCollection = database.collection("spotify_collection");

    // Insert test user data into usersCollection
    const testUserData = {
      name: "baby",
      email: "baby@gmail.com",
      password: await bcrypt.hashSync("baby", 10),
      likedSongs: ["1", "2"],
      followedArtists: ["Alex", "Allision"],
    };
    await usersCollection.insertOne(testUserData);

    // Log in as the test user to get a JWT token for testing
    const testUser = await usersCollection.findOne({
      email: "baby@gmail.com",
    });

    const testUserToken = jwt.sign(
      { id: testUser._id, email: testUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    token = testUserToken;

    // console.log(token)
  });

  afterAll(async () => {
    await client.close();
  });

  describe("GET /songs", () => {
    it("should return an array of songs and status code 200 if the token is provided", async () => {
      const response = await request(app)
        .get("/user/songs")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  
    it("should return a status code 401 if the token is not provided", async () => {
      const response = await request(app).get("/user/songs");
      expect(response.status).toBe(401);
    });
  });

  describe("GET /artists", () => {
    it("should return an array of artists and status code 200 if the token is provided", async () => {
      const response = await request(app)
        .get("/user/artists")
        .set("Authorization", `Bearer ${token}`);
      expect(`Bearer ${token}`).toBe(200);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });xs

    it("should return a status code 404 if the token is not provided", async () => {
      const response = await request(app).get("/artists");
      expect(response.status).toBe(404);
    });
  });

  describe("GET /info", () => {
    it("should return user information and status code 200 if the token is provided", async () => {
      const response = await request(app)
        .get("/user/info")
        .set("Authorization", `Bearer ${token}`);
      // expect(`Bearer ${token}`).toBe(200);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(Object.keys(response.body)).toContain("name");
      expect(Object.keys(response.body)).toContain("email");
      expect(Object.keys(response.body)).toContain("likedSongs");
      expect(Object.keys(response.body)).toContain("followedArtists");
    });
  });

  // it('should return a status code 404 if the

  describe("PUT /user/songs/like", () => {
    it("should add a song to the user's liked songs", async () => {
      const response = await request(app)
        .put("/user/songs/like")
        .set("Authorization", `Bearer ${token}`)
        .send({ songId: "123" });
      expect(response.status).toBe(200);
      expect(response.body.likedSongs).toContain("123");
    });

    it("should not add a song that the user has already liked", async () => {
      const response = await request(app)
        .put("/user/songs/like")
        .set("Authorization", `Bearer ${token}`)
        .send({ songId: "123" });
      expect(response.status).toBe(200);
      expect(response.body.likedSongs).toContain("123");
    });

    it("should return an error if the user is not found", async () => {
      const response = await request(app)
        .put("/user/songs/like")
        .set("Authorization", `Bearer ${token}`)
        .send({ songId: "123" });
      expect(response.status).toBe(404);
      expect(response.text).toBe("User not found");
    });

    it("should return an error if the token is invalid", async () => {
      const response = await request(app)
        .put("/user/songs/like")
        .set("Authorization", `Bearer invalidtoken`)
        .send({ songId: "123" });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid token");
    });
  });

  describe("PUT /user/artists/follow", () => {
    it("should follow an artist", async () => {
      const response = await request(app)
        .put("/user/artists/follow")
        .set("Authorization", `Bearer ${token}`)
        .send({ artistName: "The Beatles" });
      expect(response.status).toBe(200);
      expect(response.body.followedArtists).toContain("The Beatles");
    });

    it("should return an error if user is not found", async () => {
      const response = await request(app)
        .put("/user/artists/follow")
        .set("Authorization", `Bearer ${token}`)
        .send({ artistName: "AC/DC" });
      expect(response.status).toBe(404);
      expect(response.text).toBe("User not found");
    });
  });

  describe("PUT /user/info", () => {
    it("should update user information", async () => {
      const response = await request(app)
        .put("/user/info")
        .set("Authorization", `Bearer ${token}`)
        .send({ email: "newemail@example.com" });
      expect(response.status).toBe(200);
      expect(response.body.email).toBe("newemail@example.com");
    });

    it("should update user password", async () => {
      const response = await request(app)
        .put("/user/info")
        .set("Authorization", `Bearer ${token}`)
        .send({ password: "newpassword123" });
      expect(response.status).toBe(200);
    });

    it("should return an error if user is not found", async () => {
      const response = await request(app)
        .put("/user/info")
        .set("Authorization", `Bearer ${token}`)
        .send({ username: "newusername", email: "newemail@example.com" });
      expect(response.status).toBe(404);
      expect(response.text).toBe("User not found");
    });
  });

  describe("POST /user/signup", () => {
    it("should create a new user and return a 201 status code", async () => {
      const response = await request(app).post("/user/signup").send({
        name: "Test User",
        email: "testuser@example.com",
        password: "password",
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User created");

      // Verify that the user was added to the database
      const user = await db.collection("users").findOne({
        email: "testuser@example.com",
      });

      expect(user).toBeTruthy();
      expect(user.name).toBe("Test User");
    });

    it("should return a 409 status code if the user already exists", async () => {
      const existingUser = {
        name: "Existing User",
        email: "existinguser@example.com",
        password: await bcrypt.hash("password", 10),
      };
      await db.collection("users").insertOne(existingUser);

      const response = await request(app).post("/user/signup").send({
        name: "Test User",
        email: "existinguser@example.com",
        password: "password",
      });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe("User already exists");
    });
  });

  describe("POST /user/login", () => {
    it("should return a JWT token and user information on successful login", async () => {
      const password = "password";
      const user = {
        name: "Test User",
        email: "testuser@example.com",
        password: await bcrypt.hash(password, 10),
      };
      await db.collection("users").insertOne(user);

      const response = await request(app).post("/user/login").send({
        email: "testuser@example.com",
        password: password,
      });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeTruthy();
      expect(response.body.userEmail).toBe("testuser@example.com");
      expect(response.body.likedSongs).toEqual([]);
    });

    it("should return a 401 status code if the email or password is incorrect", async () => {
      const password = "password";
      const user = {
        name: "Test User",
        email: "testuser@example.com",
        password: await bcrypt.hash(password, 10),
      };
      await db.collection("users").insertOne(user);

      const response = await request(app).post("/user/login").send({
        email: "testuser@example.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid credentials");
    });
  });

  describe("POST /user/logout", () => {
    it("should respond with a success message", async () => {
      const response = await request(app).post("/user/logout");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Logged out successfully" });
    });
  });
});
