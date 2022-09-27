const cloudinary = require("../middleware/cloudinary");
const Team = require("../models/Team");
const Users = require("../models/User");
const Projects = require("../models/Project");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const projects = await Projects.find({ leader: req.user.id });
      res.render("profile.ejs", { userInfo: req.user, projects: projects, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getUpdateProfile: async (req, res) => {
    try {
      res.render("updateprofile.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  postUpdateProfile: async (req, res) => {
    try {
      console.log(req.user)
      const userInfo = await Users.find({ user: req.user.id });
      // const teamInfo = await Users.find({ _id: req.user.teamId });
      const projects = await Projects.find({ leader: req.user.id });
      res.render("profile.ejs", { userInfo: userInfo, projects: projects, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getProfileById: async (req, res) => {
    try {
      console.log(req.user)
      const userInfo = await Users.find({ user: req.user.id });
      // const teamInfo = await Users.find({ _id: req.user.teamId });
      const projects = await Projects.find({ leader: req.user.id });
      res.render("profile.ejs", { userInfo: userInfo, projects: projects, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
