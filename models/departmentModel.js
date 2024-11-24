import mongoose from "mongoose";
import EmployeeModel from "./employeeModel.js";
import LeaveModel from "./leaveModel.js";
import SalaryModel from "./salaryModel.js";

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  dep_name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
}, { timestamps: true });

departmentSchema.pre("deleteOne", { document: true, query: true }, async function (next) {
  try {
    const employees = await EmployeeModel.find({ department: this._id });

    const empIds = employees.map(emp => emp._id);

    await EmployeeModel.deleteMany({ department: this._id });

    await LeaveModel.deleteMany({ employeeId: { $in: empIds } });

    await SalaryModel.deleteMany({ employeeId: { $in: empIds } });

    next();
  } catch (error) {
    next(error);
  }
})

const DepartmentModel = mongoose.model("Department", departmentSchema);

export default DepartmentModel;