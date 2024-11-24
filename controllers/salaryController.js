import SalaryModel from "../models/salaryModel.js";
import EmployeeModel from "../models/employeeModel.js";

export const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

    const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

    const newSalary = new SalaryModel({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate
    });

    const savedSalary = await newSalary.save();

    return res.status(200).json({ success: true, salary: savedSalary, message: "Salary added successfully" });

  } catch (error) {

    return res.status(500).json({ success: false, error: "Add Salary: Internal server error", error: error.message });
  }
};

export const getSalary = async (req, res) => {
  try {
    const { id, role } = req.params;
    let salary
    if (role === "manager") {
      salary = await SalaryModel.find({ employeeId: id }).populate("employeeId", "employeeId");
    } else {
      const employee = await EmployeeModel.findOne({ userId: id });
      salary = await SalaryModel.find({ employeeId: employee._id }).populate("employeeId", "employeeId");
    }

    return res.status(200).json({ success: true, salary, message: "Salary fetched successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Get Salary: Internal server error", error: error.message });
  }
}