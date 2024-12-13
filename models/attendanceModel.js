import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const attendanceSchema = new Schema({
  employeeId: {
    type: ObjectId,
    ref: "Employee",
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  department: {
    type: ObjectId,
    ref: "Department",
    required: true,
  },
  date: {
    type: Date,
  },
  inTime: {
    type: Date
  },
  outTime: {
    type: Date,
  }
}, { timestamps: true });

const AttendanceModel = mongoose.model("Attendance", attendanceSchema);
export default AttendanceModel;