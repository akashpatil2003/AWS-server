import connectMongo from "./db/connectMongo.js";
import UserModel from "./models/userModel.js";
import bcrypt from "bcrypt";
const userRegister = async () => {
  try {
    connectMongo();
    const hashPass = await bcrypt.hash("admin123", 10);
    const newUser = await UserModel({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPass,
      role: "manager"
    })

    await newUser.save();
  } catch (error) {
    console.log(error);

  }
}

userRegister();