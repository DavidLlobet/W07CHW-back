const User = require("../../database/models/user");
const { getAllUsers } = require("./usersController");

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
