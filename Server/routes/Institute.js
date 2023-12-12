const express = require("express");
const router = express.Router();

const { getAllInstitute, addInstitute, findInstituteByAicteID} = require("../controllers/Institute");
const { auth, isAdmin, isFaculty, isAicteMember, isStudent, isInstitute } = require("../middlewares/auth");




//Routes for All type of users
router.get("/getAllInstitutes", auth, getAllInstitute);
router.get("/findInstituteByAicteID/:aicte_id", findInstituteByAicteID);



//routes for Admin
router.post("/addInstitute", auth, isAdmin, addInstitute);







module.exports = router;


