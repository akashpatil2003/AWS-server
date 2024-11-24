import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import path from "path";
import multer from "multer";
import EmployeeModel from "../models/employeeModel.js";
import DepartmentModel from "../models/departmentModel.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

export const upload = multer({ storage: storage });

export const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      department,
      designation,
      salary,
      password,
      role
    } = req.body;

    const user = await UserModel.findOne({ email })
    if (user) {
      return res.status(400).json({ success: false, error: "User already exists" })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    })
    const savedUser = await newUser.save();

    const newEmployee = await EmployeeModel({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      department,
      designation,
      salary,
    })
    await newEmployee.save();

    return res.status(200).json({ success: true, employee: newEmployee, message: "Employee added successfully" })

  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: "Add Employee: Internal server error" })
  }
}

export const getEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.find().populate("userId", { password: 0 }).populate("department");
    return res.status(200).json({ success: true, employees, message: "Employees fetched successfully" })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: "Get Employees: Internal server error" })
  }
}

export const viewEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    let employee;
    employee = await EmployeeModel.findById({ _id: id }).populate("userId", { password: 0 }).populate("department");

    if (!employee) {
      employee = await EmployeeModel.findOne({ userId: id }).populate("userId", { password: 0 }).populate("department");
    }

    return res.status(200).json({ success: true, employee: employee, message: "Employee updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: "Edit Employee: Internal server error" })
  }
}

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, designation, salary } = req.body;

    const employee = await EmployeeModel.findById({ _id: id });

    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    const user = await UserModel.findById({ _id: employee.userId });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate({ _id: employee.userId }, { name });

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate({ _id: id }, { department, designation, salary }, { new: true });

    if (!updatedUser || !updatedEmployee) {
      return res.status(404).json({ success: false, error: "User or Employee not found" });
    }

    return res.status(200).json({ success: true, employee: employee, message: "Employee updated successfully" });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: "Update Employee: Internal server error" })
  }
}

export const fetchEmployeesByDepId = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await EmployeeModel.find({ department: id }).populate("userId", { password: 0 });
    return res.status(200).json({ success: true, employees, message: "Employees fetched successfully" })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, message: "Get Employees By DepId: Internal server error" })
  }
}