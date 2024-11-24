import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(400).json({ error: "Unauthorized: Provide a token" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid Token" })
    }

    const user = await UserModel.findById({ _id: decoded._id }).select('-password');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(`Error while authorizing user, ${error.message}`);
    res.status(500).json({ success: false, error: "Internal server error" })
  }
}