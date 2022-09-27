const express = require("express");
const router = express.Router();
//const upload = require("../middleware/multer");
const profileController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Team Routes - simplified for now
router.get("/", ensureAuth, profileController.getProfile);

router.get("/updateProfile", ensureAuth, profileController.getUpdateProfile);

router.post("/updateProfile", ensureAuth, profileController.postUpdateProfile);

router.get("/:id", ensureAuth, profileController.getProfileById);

module.exports = router;
