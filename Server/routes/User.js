const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { login, signup, sendotp, changePassword } = require("../controllers/Auth");







router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);
// router.post("/changepassword", auth, changePassword);

module.exports = router;