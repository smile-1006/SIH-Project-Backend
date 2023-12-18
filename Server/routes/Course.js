const express = require("express");
const router = express.Router();
//const { auth, isAdmin } = require("../middlewares/auth"); 
const {   getAllCourses } = require("../controllers/Courses");
// addCourse,
//router.post("/addCourse", auth, isAdmin, addCourse);
router.get("/getAllCourses", getAllCourses);

module.exports = router;