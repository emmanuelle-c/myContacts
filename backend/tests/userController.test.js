// Nécessaire pour la signature JWT dans les tests
process.env.JWT_SECRET = "testsecret";

import UserController from "../controllers/UserController.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

jest.mock("bcrypt");

describe("UserController", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  it("register - should return 400 if user exists", async () => {
    req.body = { email: "exists@example.com", password: "TestPassword123!" };
    jest.spyOn(User, "findOne").mockResolvedValueOnce({});
    await new UserController().register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("register - should return 201 if user created", async () => {
    req.body = { email: "new@example.com", password: "TestPassword123!" };
    jest.spyOn(User, "findOne").mockResolvedValueOnce(null);
    jest.spyOn(User.prototype, "save").mockResolvedValueOnce();
    await new UserController().register(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("login - should return 400 if user not found", async () => {
    req.body = { email: "notfound@example.com", password: "TestPassword123!" };
    jest.spyOn(User, "findOne").mockResolvedValueOnce(null);
    await new UserController().login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("login - should return 400 if password incorrect", async () => {
    req.body = { email: "notfound@example.com", password: "TestPassword123!" };
    jest.spyOn(User, "findOne").mockResolvedValueOnce({
      email: "notfound@example.com",
      password: "hashedpassword",
    });
    bcrypt.compare.mockResolvedValueOnce(false); // Simule un mauvais mot de passe
    await new UserController().login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("login - should return 200 if login successful", async () => {
    req.body = { email: "found@example.com", password: "TestPassword123!" };
    jest.spyOn(User, "findOne").mockResolvedValueOnce({
      _id: "507f1f77bcf86cd799439011",
      email: "found@example.com",
      password: "hashedpassword",
    });
    bcrypt.compare.mockResolvedValueOnce(true); // Simule un mot de passe correct
    await new UserController().login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
