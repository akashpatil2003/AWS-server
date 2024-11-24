import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["employee", "manager"],
    required: true,
  },
  profileImage: {
    type: String,
  }
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);
export default UserModel;