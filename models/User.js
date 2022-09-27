const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  name: { type: String, required: false, default: 'Anon' },
  email: { type: String, unique: true },
  role: { type: String, required: false, default: 'Not specified' },
  phoneNumber: { type: String, required: false, default: 'xxx-xxx-xxxx' },
  team: { type: String, required: false, default: '' },
  teamId: { type: Number, required: false, default: 0 },
  password: String,
});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
