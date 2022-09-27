const cloudinary = require("../middleware/cloudinary");
const Team = require("../models/Team");
const Users = require("../models/User");
const Projects = require("../models/Project");

module.exports = {
  getProfile: async (req, res) => {
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
  getTeam: async (req, res) => {
    try {
      const hasTeam = Boolean(req.user.team);
      let members;
      if(hasTeam){
        members = await Users.find({ team: req.user.team });
      }else{
        members = await Users.find({ _id: req.user.id });
      }
      res.render("team.ejs", { members: members, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getJoinTeam: async (req, res) => {
        try {
          res.render("jointeam.ejs");
        } catch (err) {
          console.log(err);
        }
      },
  createTeam: async (req, res) => {
    try {
      await Team.create({
        teamName: req.body.teamName,
        creator: req.user.id,
      });
      console.log("Team has been added!");
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  },
//   getDashboard: async (req, res) => {
//     try {
//       const projects = await Project.find().sort({ createdAt: "desc" }).lean();
//       res.render("dashboard.ejs", { projects: projects });
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   getProject: async (req, res) => {
//     try {
//       const project = await Project.findById(req.params.id);
//       res.render("project.ejs", { project: project, user: req.user });
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   
//   likeProject: async (req, res) => {
//     try {
//       await Project.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           $inc: { likes: 1 },
//         }
//       );
//       console.log("Likes +1");
//       res.redirect(`/project/${req.params.id}`);
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   deleteProject: async (req, res) => {
//     try {
//       // Find project by id
//       let project = await Project.findById({ _id: req.params.id });
//       // Delete image from cloudinary
//       await cloudinary.uploader.destroy(project.cloudinaryId);
//       // Delete project from db
//       await Project.remove({ _id: req.params.id });
//       console.log("Deleted Project");
//       res.redirect("/profile");
//     } catch (err) {
//       res.redirect("/profile");
//     }
//   },
};
