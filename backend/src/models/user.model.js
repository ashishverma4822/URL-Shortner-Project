import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
});

// Pre-save hook to set gravatar if avatar is missing
userSchema.pre("save", function (next) {
  if (!this.avatar) {
    const hash = crypto.createHash("md5").update(this.email).digest("hex");
    this.avatar = `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
