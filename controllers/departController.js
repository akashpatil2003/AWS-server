import DepartmentModel from "../models/departmentModel.js";

export const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDepartment = new DepartmentModel({
      dep_name,
      description
    });
    await newDepartment.save();
    return res.status(200).json({ success: true, department: newDepartment, message: "Department added successfully" })
  } catch (error) {
    return res.status(500).json({ success: false, error: "Add Department: Internal server error", error: error.message })
  }
}

export const getDepartments = async (req, res) => {
  try {
    const departments = await DepartmentModel.find();
    return res.status(200).json({ success: true, departments, message: "Departments fetched successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Get Departments: Internal server error", error: error.message })
  }
}

export const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const department = await DepartmentModel.findById(id);
    return res.status(200).json({ success: true, department: department, message: "Department updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Edit Department: Internal server error", error: error.message })
  }
}

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const department = await DepartmentModel.findByIdAndUpdate(id, { dep_name, description }, { new: true });
    return res.status(200).json({ success: true, department: department, message: "Department updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Update Department: Internal server error", error: error.message })
  }
}

export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await DepartmentModel.findById({ _id: id });

    await department.deleteOne();
    return res.status(200).json({ success: true, department: department, message: "Department deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Delete Department: Internal server error", error: error.message })
  }
}