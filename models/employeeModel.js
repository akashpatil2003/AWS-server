import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const employeeSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
  },
  department: {
    type: ObjectId,
    ref: "Department",
    required: true,
  },
  designation: {
    type: String
  },
  salary: {
    type: Number,
    required: true
  },
}, { timestamps: true });

const EmployeeModel = mongoose.model("Employee", employeeSchema);
export default EmployeeModel;