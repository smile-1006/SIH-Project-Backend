const express = require("express");
const router = express.Router();


const { auth, isAdmin } = require("../middlewares/auth");
const { addNirf,getNirfList } = require("../controllers/Nirf");



router.post("/add-nirf-ranking",  addNirf);//auth, isAdmin,
router.get("/get-nirf-ranking",  getNirfList);

module.exports = router;