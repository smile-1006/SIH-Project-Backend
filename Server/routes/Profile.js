const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

const { deleteAccount, updateProfile, getAllUserDetails, updateDisplayPicture } = require("../controllers/Profile");

router.delete("/deleteProfile", auth, deleteAccount);
router.put("./updateProfile", auth, updateProfile);
router.put("/updateProfilePicture", auth, updateDisplayPicture);
router.get("/getUserDetails", auth, getAllUserDetails);

module.exports = router;