const express = require("express");
const { signup, login, bankSignup, bankLogin } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/bank-register", bankSignup);
router.post('/bank-login', bankLogin)

module.exports = router;
