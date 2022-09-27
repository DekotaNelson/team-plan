const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const teamController = require("../controllers/team");
const projectsController = require("../controllers/projects");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/dashboard", ensureAuth, projectsController.getDashboard);
//router.get("/addproject", ensureAuth, projectsController.getAddProject);
//router.get("/addproject", ensureAuth, teamController.getjointeam);
router.get("/login", authController.getLogin);
router.post("/login", authController.projectLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.projectSignup);

module.exports = router;
