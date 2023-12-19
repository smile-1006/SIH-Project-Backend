const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

const { deleteAccount, updateProfile, getAllUserDetails, updateDisplayPicture } = require("../controllers/Profile");

router.delete("/deleteProfile", deleteAccount);//auth,
router.put("/updateProfile",  updateProfile);//auth,
router.put("/updateProfilePicture",  updateDisplayPicture);//  auth,
router.get("/getUserDetails",  getAllUserDetails);//auth,

module.exports = router;