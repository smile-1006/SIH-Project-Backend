const express = require("express");
const router = express.Router();

const { getAllInstitute, addInstitute, findInstituteByAicteID, findInstituteByname } = require("../controllers/Institute");
const { auth, isAdmin, isFaculty, isAicteMember, isStudent, isInstitute } = require("../middlewares/auth");



//routes for Institute_Admin
router.get("/getAllInstitutes",  getAllInstitute);//auth,
router.get("/findInstituteByAicteID/:aicte_id", findInstituteByAicteID);
router.get("/findInstituteByName/:name", findInstituteByname);

//routes for Institute Admin
router.post("/addInstitute",  addInstitute);//auth, isAdmin,



module.exports = router;


