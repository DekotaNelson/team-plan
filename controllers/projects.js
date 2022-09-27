const cloudinary = require("../middleware/cloudinary");
const Project = require("../models/Project");

module.exports = {
  
  getDashboard: async (req, res) => {
    try {
      const projects = await Project.find().sort({ createdAt: "desc" }).lean();
      res.render("dashboard.ejs", { projects: projects });
    } catch (err) {
      console.log(err);
    }
  },
  getProject: async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      res.render("project.ejs", { project: project, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getAddProject: async (req, res) => {
    try {
      
      res.render("addProject.ejs");
    } catch (err) {
      console.log(err);
    }
  },
  createProject: async (req, res) => {
    try {

      await Project.create({
        projectName: req.body.projectName,
        nextStep: req.body.nextStep,
        notes: req.body.notes,
        meterials: req.body.meterials,
        paymentInfo: req.body.paymentInfo,
        schedule: req.body.schedule,
        leader: req.user.id,
        team: req.user.team || req.user.id,
      });
      console.log("Project has been added!");
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  },
  likeProject: async (req, res) => {
    try {
      await Project.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/project/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteProject: async (req, res) => {
    try {
      // Find project by id
      let project = await Project.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(project.cloudinaryId);
      // Delete project from db
      await Project.remove({ _id: req.params.id });
      console.log("Deleted Project");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
