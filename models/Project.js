const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectTotal: {
    type: String,
    require: false,
  },
  nextStep: {
    type: String,
    require: true,
  },
  notes: {
    type: String,
    require: false,
    default: '',
  },
  materials: {
    type: String,
    required: false,
    default: '',
  },
  paymentInfo: {
    type: String,
    required: false,
    default: '',
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "team",
  },
  schedule: {
    type: String,
    required: false,
    default: '',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
