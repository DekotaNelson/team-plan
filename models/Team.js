const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Team", TeamSchema);
