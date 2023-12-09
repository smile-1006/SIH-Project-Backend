const express = require("express");
const router = express.Router();

const { login, signup, sendotp, changePassword } = require("../controllers/Auth");
const app = require("../middleware/app");







router.post("/login",app, login);
router.post("/signup",app, signup);
router.post("/sendotp",app, sendotp);
// router.post("/changepassword", auth, changePassword);

module.exports = router;