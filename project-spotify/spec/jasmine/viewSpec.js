const request = require("supertest");
const express = require("express");
const app = express();
const viewRoutes = require("../../controllers/viewController")
// const viewRoutes = require("../controllers/viewController");

app.use("/", viewRoutes);

describe("GET /login-view", () => {
  it("responds with status 200 and HTML content", async () => {
    const response = await request(app).get("/login-view");
    expect(response.status).toBe(200);
    expect(response.type).toBe("text/html");
  });
});

describe("GET /users-view", () => {
  it("responds with status 200 and HTML content", async () => {
    const response = await request(app).get("/users-view");
    expect(response.status).toBe(200);
    expect(response.type).toBe("text/html");
  });
});

describe("GET /songs-view", () => {
  it("responds with status 200 and HTML content", async () => {
    const response = await request(app).get("/songs-view");
    expect(response.status).toBe(200);
    expect(response.type).toBe("text/html");
  });
});

describe("GET /profile-view", () => {
  it("responds with status 200 and HTML content", async () => {
    const response = await request(app).get("/profile-view");
    expect(response.status).toBe(200);
    expect(response.type).toBe("text/html");
  });
});
