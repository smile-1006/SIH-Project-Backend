const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middlewares/auth");
const {   getAllCourses, create_course } = require("../controllers/Courses");
// addCourse,
router.post("/addCourse", auth, isAdmin, create_course);
router.get("/getAllCourses", getAllCourses);

module.exports = router;
