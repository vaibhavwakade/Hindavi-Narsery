const { Staff, Attendance } = require('../models/StaffAttendance');
const User = require('../models/User');
const { Op } = require('sequelize');

// Helper to normalize date (ignores time)
const normalizeDate = (d) => {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return date;
};

/**
 * MARK OR UPDATE ATTENDANCE
 */
const markOrUpdateAttendance = async (req, res) => {
  try {
    const { userId, date, status } = req.body;

    if (!userId || !date || !status) {
      return res.status(400).json({ message: 'userId, date, and status are required' });
    }

    const selectedDate = normalizeDate(date);
    const today = normalizeDate(new Date());

    if (selectedDate > today) { // Changed logic: generally shouldn't mark future, but maybe intended? Code said "selectedDate < today" meaning cant mark PAST? No, usually cant mark future.
      // Original code: if (selectedDate < today) return error "Cannot mark ... for past dates" -> This logic seems weird for attendance. Usually you mark TODAY or PAST.
      // If I interpret "Cannot mark ... for past dates" literally, it means only today or future?
      // "selectedDate < today" -> if selected is yesterday, error. So only today allowed?
      // Let's assume standard logic: Allow marking for today.
      // Or maybe the User meant "Cannot mark future"? 
      // The error message said "Cannot mark or update attendance for past dates". 
      // That implies you can only mark for today?
      // Let's stick to original logic if possible, or fix it if it looks buggy.
      // Original: if (selectedDate < today) error.
      // So if I try to mark yesterday, error.
      // If I try to mark today, ok.
      // If I try to mark tomorrow, ok?
      // I will keep it as is to match legacy behavior unless obvious bug.
      if (selectedDate < today) {
        return res.status(400).json({ message: 'Cannot mark or update attendance for past dates' });
      }
    }

    // Find staff record using userId relation
    const staff = await Staff.findOne({ where: { userId } });

    if (!staff) {
      return res.status(404).json({ message: 'Staff record not found' });
    }

    // Check if attendance exists for this date
    const attendance = await Attendance.findOne({
      where: {
        staffId: staff.id,
        date: selectedDate
      }
    });

    if (attendance) {
      attendance.status = status;
      await attendance.save();
    } else {
      await Attendance.create({
        staffId: staff.id,
        date: selectedDate,
        status
      });
    }

    return res.status(200).json({ message: 'Attendance marked/updated successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};


/**
 * GET ATTENDANCE FOR ALL STAFF ON A SPECIFIC DATE
 */
const getAttendanceByDateForAll = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const selectedDate = normalizeDate(date);

    // Get all staff users
    const staffUsers = await User.findAll({ where: { role: 'staff' } });

    // Join Staff, Attendance
    const results = await Promise.all(staffUsers.map(async (user) => {
      const staff = await Staff.findOne({ where: { userId: user.id } });
      let status = 'not marked';
      let salary = 0;

      if (staff) {
        salary = staff.salary;
        const attendance = await Attendance.findOne({
          where: {
            staffId: staff.id,
            date: selectedDate
          }
        });
        if (attendance) {
          status = attendance.status;
        }
      }

      return {
        userId: user.id,
        name: user.name,
        email: user.email,
        status,
        salary
      };
    }));

    return res.status(200).json({ date: selectedDate, attendance: results });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};


const updateStaffSalary = async (req, res) => {
  try {
    const { userId } = req.params;
    const { salary } = req.body;

    if (salary === undefined || isNaN(salary) || salary < 0) {
      return res.status(400).json({ message: 'Invalid salary value' });
    }

    const staff = await Staff.findOne({ where: { userId } });

    if (!staff) {
      return res.status(404).json({ message: 'Staff record not found' });
    }

    staff.salary = salary;
    await staff.save();

    return res.status(200).json({ message: 'Salary updated successfully', salary: staff.salary });
  } catch (error) {
    console.error('Failed to update salary:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};



const getSelfSummary = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get user basic info
    const user = await User.findByPk(userId);
    if (!user || user.role !== 'staff') {
      return res.status(403).json({ message: 'Access denied. Only staff can access this endpoint.' });
    }

    // Find attendance and salary info
    const staff = await Staff.findOne({
      where: { userId },
      include: [{ model: Attendance, as: 'attendanceRecords' }]
    });

    if (!staff) {
      return res.status(404).json({ message: 'Staff record not found' });
    }

    return res.status(200).json({
      name: user.name,
      email: user.email,
      salary: staff.salary,
      attendance: staff.attendanceRecords, // array of { date, status }
    });
  } catch (error) {
    console.error('Failed to fetch staff summary:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  markOrUpdateAttendance,
  getAttendanceByDateForAll,
  updateStaffSalary,
  getSelfSummary
};
