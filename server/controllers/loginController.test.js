require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../../database/models/user");
const { userLogin, userSignUp } = require("./loginController");

jest.mock("../../database/models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Given a userLogin function", () => {
  describe("When it receives a request with an incorrect username", () => {
    test("Then it should invoke the next function with an error", async () => {
      const usernameTest = "Dani";

      const req = {
        body: {
          username: usernameTest,
        },
      };

      const res = {};

      User.findOne = jest.fn().mockResolvedValue(false);
      const error = new Error("Wrong credentials");
      error.code = 401;
      const next = jest.fn();

      await userLogin(req, res, next);

      expect(User.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives a request with a correct username and an incorrect password", () => {
    test("Then it should invoke the next function with an error", async () => {
      const req = {
        body: {
          username: "Napo",
          password: "Wrong password",
        },
      };
      const res = {};
      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue({
        username: "Napo",
        password: "Franny",
      });

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const error = new Error("Wrong password");
      error.code = 401;

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });
  // describe
  // test
});

describe("Given a userSignUp function", () => {
  describe("When it receives a request with an existing username", () => {
    test("Then it should invoke the next function with an error", async () => {
      const usernameTest = "Rodica";

      const req = {
        body: {
          username: usernameTest,
        },
      };

      const res = {};

      User.findOne = jest.fn().mockResolvedValue(true);
      const error = new Error("Username already taken");
      error.code = 400;
      const next = jest.fn();

      await userSignUp(req, res, next);

      expect(User.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });
  describe("When it receives a request with a new username", () => {
    test("Then it should respond with the new user", async () => {
      const userTest = {
        name: "Xavi",
        username: "tadeo",
        password: "Aixoesmoltdificil",
      };

      const req = {
        body: userTest,
      };

      const res = {
        json: jest.fn(),
      };

      User.findOne = jest.fn().mockResolvedValue(false);
      User.create = jest.fn().mockResolvedValue(userTest);

      await userSignUp(req, res);

      expect(res.json).toHaveBeenCalledWith(userTest);
    });
  });
});
