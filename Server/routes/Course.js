const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middlewares/auth"); 
const { create_course } = require("../controllers/Courses");

router.post("/create-course", auth, isAdmin, create_course);

module.exports = router;