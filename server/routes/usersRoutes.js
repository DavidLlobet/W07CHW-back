const express = require("express");
const { userSignUp, userLogin } = require("../controllers/loginController");
const { getAllUsers } = require("../controllers/usersController");

const router = express.Router();

router.post("/register", userSignUp);
router.post("/login", userLogin);
router.get("/users", getAllUsers);

module.exports = router;
