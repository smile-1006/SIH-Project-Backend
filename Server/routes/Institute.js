const express = require("express");
const router = express.Router();

const { getAllInstitute } = require("../controllers/Institute");
const { auth, isAdmin, isFaculty, isAicteMember, isStudent, isInstitute } = require("../middlewares/auth");
const Institute = require("../models/Institute");


//routes for Admin
router.get("/getAllInstitutes", auth, getAllInstitute);











