import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs"; // ✅ Corrected

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
    required: true,
    select: false // hide password by default
  },
  avatar: {
    type: String
  }
});

// Pre-save hook to hash password & set gravatar
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  if (!this.avatar) {
    const hash = crypto.createHash("md5").update(this.email).digest("hex");
    this.avatar = `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;
  }

  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.set('toJSON',{
  transform: function(doc,ret){
    delete ret.password;
    delete ret.__v;
    return ret;
  }
});

const User = mongoose.model("User", userSchema);

export default User;
