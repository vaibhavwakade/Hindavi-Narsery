const express = require('express');
const router = express.Router();
const {
    markOrUpdateAttendance,
    getAttendanceByDateForAll,
    updateStaffSalary,
    getSelfSummary
} = require('../controllers/staffAttendanceController');

// POST: Mark or update attendance
router.post('/attendance', markOrUpdateAttendance);

// GET: Get attendance by date
router.get('/attendance', getAttendanceByDateForAll);

// PUT: update salary
router.put("/salary/:userId", updateStaffSalary)

router.get("/self-summary/:userId", getSelfSummary)

exports.staffAttendaceRouter = router;
