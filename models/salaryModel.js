import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const salarySchema = new Schema({
  employeeId: {
    type: ObjectId,
    ref: "Employee",
    required: true,
  },
  basicSalary: {
    type: Number,
    required: true,
  },
  allowances: {
    type: Number,
  },
  deductions: {
    type: Number,
  },
  netSalary: {
    type: Number,
  },
  payDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const SalaryModel = mongoose.model("Salary", salarySchema);
export default SalaryModel;