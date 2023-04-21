const request = require("supertest");
const express = require("express");
const app = express();
const songRoutes = require("../../controllers/songController")
// const viewRoutes = require("../controllers/viewController");

app.use("/songs", songRoutes);

describe("GET /songs", () => {
  it("responds with status 200 and HTML content", async () => {
    // const response = await request(app).get("/");
    const response = await request('http://localhost:3000/songs').get("/");
    expect(response).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
});
});


