const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middlewares/auth");
const {   getAllCourses, create-course } = require("../controllers/Courses");
// addCourse,
router.post("/addCourse", auth, isAdmin, create-course);
router.get("/getAllCourses", getAllCourses);

module.exports = router;
