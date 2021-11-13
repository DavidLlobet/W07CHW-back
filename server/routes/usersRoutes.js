const express = require("express");
const { userSignUp, userLogin } = require("../controllers/loginController");

const router = express.Router();

router.post("/register", userSignUp);
router.post("/login", userLogin);

module.exports = router;
