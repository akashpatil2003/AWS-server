import AttendanceModel from "../models/attendanceModel.js"
import EmployeeModel from "../models/employeeModel.js";


export const addAttendance = async (req, res) => {

  const { employeeId } = req.body;
  const date = new Date(Date.now());
  const inTime = Date.now();
  const employee = await EmployeeModel.findOne({ employeeId: employeeId });
  const attendance = await AttendanceModel.findOne({ employeeId: employee._id, date });
  if (attendance) {
    return res.status(400).json({
      success: false,
      error: "Attendance already exists"
    })
  }
  const newAttendance = new AttendanceModel({ employeeId: employee._id, userId: employee.userId, department: employee.department, date, inTime });
  const savedAttendance = await newAttendance.save();
  return res.status(200).json({
    success: true,
    attendance: savedAttendance,
    message: "Attendance added successfully"
  });
}

export const updateAttendance = async (req, res) => {

  const { employeeId } = req.body;
  const date = new Date();
  const outTime = Date.now();
  const employee = await EmployeeModel.findOne({ employeeId });

  const attendance = await AttendanceModel.findOne({ employeeId: employee._id, date: date });
  console.log(attendance);

  if (!attendance) {
    return res.status(400).json({
      success: false,
      error: "Attendance not found"
    })
  }

  const updatedAttendance = await AttendanceModel.findOneAndUpdate(attendance._id, { outTime });

  return res.status(200).json({
    success: true,
    attendance: updatedAttendance,
    message: "Attendance updated successfully"
  });
}

export const getAttendances = async (req, res) => {

  const attendances = await AttendanceModel.find({}).populate("employeeId").populate("userId").populate("department");
  return res.status(200).json({
    success: true,
    attendances,
    message: "Attendances fetched successfully"
  });
}