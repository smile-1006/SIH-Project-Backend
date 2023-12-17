const express = require("express");
const router = express.Router();


const { auth, isAdmin } = require("../middlewares/auth");
const { addNirf } = require("../controllers/Nirf");


router.post("/add-nirf-ranking", auth, isAdmin, addNirf);


module.exports = router;