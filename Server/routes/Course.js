const express = require("express");
const router = express.Router();

const { auth, isAdmin } = require("../middlewares/auth"); 
const {  getAllCourses, create_course } = require("../controllers/Courses");

router.post("/create_course",  create_course);//auth, isAdmin,


router.get("/getAllCourses", getAllCourses);

module.exports = router;
