import DepartmentModel from "../models/departmentModel.js";
import EmployeeModel from "../models/employeeModel.js";
import LeaveModel from "../models/leaveModel.js";


export const getSummary = async (req, res) => {
  try {

    const totalEmployees = await EmployeeModel.countDocuments();


    const totalDeps = await DepartmentModel.countDocuments();

    const totalSalaries = await EmployeeModel.aggregate([
      {
        $group: {
          _id: null,
          totalSalary: { $sum: "$salary" }
        }
      }
    ])

    const totalLeaves = await LeaveModel.distinct("employeeId");

    const leaveStatus = await LeaveModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ])

    const leaveSummary = {
      appliedFor: totalLeaves.length,
      approved: leaveStatus.find(item => item._id === "Approved")?.count || 0,
      rejected: leaveStatus.find(item => item._id === "Rejected")?.count || 0,
      pending: leaveStatus.find(item => item._id === "Pending")?.count || 0
    }
    return res.status(200).json({ success: true, totalEmployees, totalDeps, totalSalary: totalSalaries[0]?.totalSalary || 0, leaveSummary, message: "Summary fetched successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Get Summary: Internal server error", error: error.message });
  }
} 