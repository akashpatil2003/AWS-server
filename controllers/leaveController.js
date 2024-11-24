import path from "path";
import EmployeeModel from "../models/employeeModel.js";
import LeaveModel from "../models/leaveModel.js";
export const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const employee = await EmployeeModel.findOne({ userId });

    const newLeave = new LeaveModel({
      employeeId: employee._id, leaveType, startDate, endDate, reason
    })


    await newLeave.save();

    return res.status(200).json({ success: true, message: "Leave Applied Successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, error: "Add Leave: Internal server error", error: error.message });
  }
}

export const getLeaves = async (req, res) => {
  try {
    const { id } = req.params;
    let leaves = await LeaveModel.find({ employeeId: id })

    if (!leaves || leaves.length === 0) {
      const employee = await EmployeeModel.findOne({ userId: id });


      leaves = await LeaveModel.find({ employeeId: employee._id })
    }
    return res.status(200).json({ success: true, leaves, message: "Leaves fetched successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Get Leaves: Internal server error", error: error.message });
  }
}

export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await LeaveModel.find().populate({
      path: 'employeeId',
      populate: [
        {
          path: 'department',
          select: 'dep_name'
        },
        {
          path: 'userId',
          select: 'name'
        }
      ]
    });


    return res.status(200).json({ success: true, leaves, message: "Leaves fetched successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Get All Leaves: Internal server error", error: error.message });
  }
}

export const getDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await LeaveModel.findById({ _id: id }).populate({
      path: 'employeeId',
      populate: [
        {
          path: 'department',
          select: 'dep_name'
        },
        {
          path: 'userId',
          select: 'name'
        }
      ]
    });


    return res.status(200).json({ success: true, leave, message: "Leaves fetched successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, error: "Get All Leaves: Internal server error", error: error.message });
  }
}

export const updateLeave = async (req, res) => {
  try {

    const { id } = req.params;

    const leave = await LeaveModel.findByIdAndUpdate({ _id: id }, { status: req.body.status });

    if (!leave) {
      return res.status(404).json({ success: false, error: "Leave not found" });
    }

    return res.status(200).json({ success: true, leave: leave, message: "Leave updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Update Leave: Internal server error", error: error.message });
  }
}