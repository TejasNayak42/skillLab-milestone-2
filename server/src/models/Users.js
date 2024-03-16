import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  role: {
    type: String,
    default: "user", // Default role is 'user'
  },
});

export const UserModel = mongoose.model("users", UserSchema);
