const User = require("../../database/models/user");
const { getAllUsers, userSignUp } = require("./usersController");

jest.mock("../../database/models/user");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const usersArray = [
  {
    username: "Buleano",
    password: "Buleano",
    name: "Sir Boolean",
    age: 37,
    bio: "Soy el que te la agarra con la mano",
    image: "url",
    imageLocal: "url",
    friends: [],
    enemies: [],
  },
  {
    username: "Calimero",
    password: "Calimero",
    name: "Carlos Pajares",
    age: 33,
    bio: "Me gusta hacer rimas, soy el más grande, y pa cosas grandes aquí tengo mi fiambre",
    image: "url",
    imageLocal: "url",
    friends: [],
    enemies: [],
  },
];

describe("Given a getAllUsers function", () => {
  describe("When it is invoked with a response and the db connection is ok", () => {
    test("Then is should return an array of series", async () => {
      const res = mockResponse();
      const users = usersArray;
      const next = jest.fn();
      User.find = jest.fn().mockResolvedValue(users);

      await getAllUsers(null, res, next);

      expect(User.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });
});

describe("Given a userSignUp function", () => {
  describe("When it receives a request with an existing username", () => {
    test("Then it should invoke the next function with an error", async () => {
      const usernameTest = "Buleano";

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
    test("Then it should respond with a 200 status", async () => {
      const userTest = {
        name: "Carlos",
        username: "Paj",
        password: "Trucootrato",
      };

      const req = {
        body: userTest,
      };

      const res = mockResponse();

      User.findOne = jest.fn().mockResolvedValue(false);

      await userSignUp(req, res);

      expect(res.json).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
