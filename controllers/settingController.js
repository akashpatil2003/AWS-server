import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    const user = await UserModel.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, error: "Invalid old password" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await UserModel.findByIdAndUpdate({ _id: userId }, { password: hashPassword });

    return res.status(200).json({ success: true, message: "Password changed successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, error: "Change Password: Internal server error", error: error.message })
  }
}