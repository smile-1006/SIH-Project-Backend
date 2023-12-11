const express = require("express");
const router = express.Router();

const { getAllInstitute, addInstitute } = require("../controllers/Institute");
const { auth, isAdmin, isFaculty, isAicteMember, isStudent, isInstitute } = require("../middlewares/auth");



//routes for Admin
router.get("/getAllInstitutes", auth, getAllInstitute);
router.post("/addInstitute", auth, isAdmin, addInstitute);







module.exports = router;


