const express = require("express");
const router = express.Router();
//const upload = require("../middleware/multer");
const teamController = require("../controllers/team");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Team Routes - simplified for now
router.get("/", ensureAuth, teamController.getTeam);

router.get("/joinTeam", ensureAuth, teamController.getJoinTeam);

router.get("/:id", ensureAuth, teamController.getTeam);

router.post("/createTeam", teamController.createTeam);

// router.delete("/deleteTeam/:id", teamController.deleteTeam);

module.exports = router;
