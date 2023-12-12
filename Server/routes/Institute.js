const express = require("express");
const router = express.Router();

const { getAllInstitute, addInstitute, findInstituteByAicteID} = require("../controllers/Institute");
const { auth, isAdmin, isFaculty, isAicteMember, isStudent, isInstitute } = require("../middlewares/auth");



//routes for Institute_Admin
router.get("/getAllInstitutes", auth, getAllInstitute);
router.get("/findInstituteByAicteID/:aicte_id", findInstituteByAicteID);



//routes for Institute Admin
router.post("/addInstitute", auth, isAdmin, addInstitute);







module.exports = router;


