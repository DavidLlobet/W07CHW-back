const express = require("express");
const { userSignUp, userLogin } = require("../controllers/loginController");
const { getAllUsers } = require("../controllers/usersController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/register", userSignUp);
router.post("/login", userLogin);
router.get("/users", auth, getAllUsers);

module.exports = router;
