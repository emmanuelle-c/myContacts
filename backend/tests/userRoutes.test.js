// Garantit la présence de JWT_SECRET pour les tests
process.env.JWT_SECRET = process.env.JWT_SECRET || "test_jwt_secret";

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../app.js";
import request from "supertest";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

describe("User Routes", () => {
  // Stocke les infos utilisateur pour les tests suivants
  const testUser = {
    email: "testuser@example.com",
    password: "TestPassword123!",
  };

  beforeAll(async () => {
    // S'assure que l'utilisateur est bien créé avant les tests de login
    await request(app).post("/api/auth/register").send(testUser);
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          email: "anotheruser@example.com",
          password: "TestPassword123!",
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login an existing user", async () => {
      const res = await request(app).post("/api/auth/login").send(testUser);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
    });
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
