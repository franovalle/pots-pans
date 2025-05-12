//Note using repo https://github.com/100devs/binary-upload-boom/blob/main/views/feed.ejs, repo https://github.com/Resilient-Labs/quick-pound-2025a/blob/main/routes/comments.js, and repo https://github.com/dikshapadi/Too-Good-To-Go/tree/main/assets/js as a guide


const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  role: {type: String, enum:['hospital', 'restaurant'], require: true } //enum: lets us define name constants 
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

