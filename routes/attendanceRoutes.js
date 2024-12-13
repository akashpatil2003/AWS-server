import express from "express";
import { addAttendance, getAttendances, updateAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/", getAttendances)
router.post("/add-attendance", addAttendance)
router.put("/update-attendance", updateAttendance)

export default router;