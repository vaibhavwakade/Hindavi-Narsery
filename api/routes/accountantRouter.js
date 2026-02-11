const express = require("express");
const StaffAttendance = require('../models/StaffAttendance');
const Order = require("../models/Order");


const router = express.Router();

router.get('/summary', async (req, res) => {
    try {
        const { start, end } = req.query;
        const dateFilter = {};
        if (start || end) {
            dateFilter.date = {};
            if (start) dateFilter.date.$gte = new Date(start);
            if (end) dateFilter.date.$lte = new Date(end);
        }

        // 1. Orders data
        const orderMatch = start || end ? { createdAt: dateFilter.date } : {};
        const salesAgg = await Order.aggregate([
            { $match: orderMatch },
            {
                $group: {
                    _id: '$paymentStatus',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$totalAmount' },
                },
            },
        ]);

        const paidAgg = salesAgg.find((s) => s._id === 'paid') || { count: 0, totalAmount: 0 };
        const unpaidAgg = salesAgg.find((s) => s._id === 'unpaid') || { count: 0, totalAmount: 0 };
        const totalOrders = paidAgg.count + unpaidAgg.count;
        const totalRevenue = paidAgg.totalAmount;

        // 2. Profit estimation (e.g. 30% margin assumption)
        const estimatedProfit = totalRevenue * 0.3;

        // 3. Staff salaries
        const staff = await StaffAttendance.find().populate('userId', 'name email');
        const totalSalary = staff.reduce((sum, s) => sum + (s.salary || 0), 0);

        // 4. Attendance analysis
        const attendanceStats = {
            present: 0,
            absent: 0,
            leave: 0,
        };

        const detailedStaff = [];

        for (const record of staff) {
            const filteredAttendance = record.attendanceRecords.filter((a) => {
                const date = new Date(a.date);
                return (!start || date >= new Date(start)) && (!end || date <= new Date(end));
            });

            let staffCount = { present: 0, absent: 0, leave: 0 };
            filteredAttendance.forEach((a) => {
                if (attendanceStats[a.status] !== undefined) {
                    attendanceStats[a.status]++;
                    staffCount[a.status]++;
                }
            });

            detailedStaff.push({
                name: record.userId.name,
                email: record.userId.email,
                salary: record.salary,
                present: staffCount.present,
                absent: staffCount.absent,
                leave: staffCount.leave,
            });
        }

        res.json({
            totalOrders,
            paidOrders: paidAgg.count,
            unpaidOrders: unpaidAgg.count,
            totalRevenue,
            estimatedProfit,
            totalSalary,
            attendanceStats,
            staffDetails: detailedStaff,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get accountant summary' });
    }
});


exports.accountantRouter = router;