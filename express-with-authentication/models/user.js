const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "You need a username."],
  },
  password: {
    type: String,
    required: [true, "You need a password."],
  },
});

//Authenticating user
userSchema.statics.findAndValidate = async function (username, password) {
  const foundUser = await this.findOne({ username });

  const isValid = await bcrypt.compare(password, foundUser.password);

  return isValid ? foundUser : false;
};

//Hashing passwords
userSchema.pre("save", async function () {
  //If no modified proceed to save
  if (!this.isModified("password")) {
    return next();
  }

  //Rehash the password if modified
  this.password = await bcrypt.hash(this.password, 12);
});

const Model = mongoose.model("User", userSchema);

module.exports = Model;
