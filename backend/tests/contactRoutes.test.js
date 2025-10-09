process.env.JWT_SECRET = "testsecret";

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

describe("Contact Routes", () => {
  let token = "";
  let contactId = "";

  beforeAll(async () => {
    // 1. Création de l'utilisateur de test
    await request(app)
      .post("/api/auth/register")
      .send({ email: "testuser@example.com", password: "TestPassword123!" });
    // 2. Login pour obtenir un token
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "testuser@example.com", password: "TestPassword123!" });
    token = res.body.token;
    const id = res.body.userId;
    console.log("Obtained token:", token);
    console.log("Obtained userId:", id);
  });

  it("should create a new contact", async () => {
    const res = await request(app)
      .post("/api/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstname: "John",
        lastname: "Doe",
        phone: "0601020304",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    contactId = res.body._id;
  });

  it("should get all contacts", async () => {
    const res = await request(app)
      .get("/api/contacts")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update a contact", async () => {
    const contact = await request(app)
      .post("/api/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstname: "Toto",
        lastname: "Doe",
        phone: "0601020305",
      });
    contactId = contact.body._id;
    const res = await request(app)
      .put(`/api/contacts/${contactId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ firstName: "Jane", lastName: "Doe", phone: "0601020306" });
    expect(res.statusCode).toBe(203);
    expect(res.body.firstName).toBe("Jane");
  });

  it("should delete a contact", async () => {
    const contact = await request(app)
      .post("/api/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstname: "John",
        lastname: "Doe",
        phone: "0601020307", // numéro unique pour ce test
      });
    contactId = contact.body._id;
    const res = await request(app)
      .delete(`/api/contacts/${contactId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
