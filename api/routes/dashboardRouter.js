const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const StaffAttendance = require('../models/StaffAttendance');
const User = require('../models/User');
const Product = require('../models/Product');

// Admin summary: revenue, orders, profit, staff attendance
router.get('/admin/summary', async (req, res) => {
    try {
        const { start, end } = req.query;
        const from = start ? new Date(start) : new Date(0);
        const to = end ? new Date(end) : new Date();

        // 1️⃣ Orders - paid only
        const orders = await Order.find({
            paymentStatus: 'paid',
            createdAt: { $gte: from, $lte: to }
        });

        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        const estimatedProfit = totalRevenue * 0.3;

        // 2️⃣ Staff & Attendance
        const staff = await StaffAttendance.find().populate('userId', 'name email');
        const attendanceStats = { present: 0, absent: 0, leave: 0 };
        const staffDetails = [];

        staff.forEach(record => {
            const filtered = record.attendanceRecords.filter(r => {
                const d = new Date(r.date);
                return d >= from && d <= to;
            });

            const counts = { present: 0, absent: 0, leave: 0 };
            filtered.forEach(r => {
                counts[r.status]++;
                attendanceStats[r.status]++;
            });

            staffDetails.push({
                name: record.userId.name,
                email: record.userId.email,
                salary: record.salary,
                present: counts.present,
                absent: counts.absent,
                leave: counts.leave
            });
        });

        const totalSalary = staff.reduce((sum, s) => sum + (s.salary || 0), 0);

        // 3️⃣ Response
        res.json({
            totalOrders,
            paidOrders: totalOrders,
            unpaidOrders: 0, // Since only paid orders are fetched
            totalRevenue,
            estimatedProfit,
            totalSalary,
            attendanceStats,
            staffDetails
        });

    } catch (err) {
        console.error('Admin summary error:', err);
        res.status(500).json({ message: 'Failed to fetch admin summary' });
    }
});




// Manager summary: overview, trends, low stock, top staff
router.get('/manager/summary', async (req, res) => {
    try {
        const { start, end } = req.query;
        const from = start ? new Date(start) : new Date(0);
        const to = end ? new Date(end) : new Date();

        // 1️⃣ Paid orders only
        const paidOrders = await Order.find({
            paymentStatus: 'paid',
            createdAt: { $gte: from, $lte: to },
        });

        const totalOrders = paidOrders.length;
        const totalRevenue = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);
        const estimatedProfit = totalRevenue * 0.3;

        // 2️⃣ Unique customers from paid orders
        const customerCount = new Set(paidOrders.map(o => o.user.toString())).size;

        // 3️⃣ Order trends (paid)
        const orderTrends = {};
        paidOrders.forEach(o => {
            const d = o.createdAt.toISOString().split('T')[0];
            if (!orderTrends[d]) orderTrends[d] = { orders: 0, revenue: 0 };
            orderTrends[d].orders++;
            orderTrends[d].revenue += o.totalAmount;
        });
        const orderTrendArray = Object.entries(orderTrends).map(([date, v]) => ({ date, ...v }));

        // 4️⃣ Top-selling plant from paid orders
        const plantCount = {};
        paidOrders.forEach(o =>
            o.items.forEach(i => {
                plantCount[i.product.toString()] = (plantCount[i.product.toString()] || 0) + i.quantity;
            })
        );
        const [topPlantId] = Object.entries(plantCount).sort((a, b) => b[1] - a[1])[0] || [];
        const topSellingPlant = topPlantId ? await Product.findById(topPlantId, 'name') : null;

        // 5️⃣ Low stock plants
        const lowStockPlants = await Product.find({ stock: { $lte: 5 } }, 'name stock');

        // 6️⃣ Staff attendance & salary
        const staffAttendance = await StaffAttendance.find().populate('userId', 'name email');
        const attendanceStats = { present: 0, absent: 0, leave: 0 };
        const staffDetails = [];

        staffAttendance.forEach(record => {
            const filtered = record.attendanceRecords.filter(a => {
                const d = new Date(a.date);
                return d >= from && d <= to;
            });

            const counts = { present: 0, absent: 0, leave: 0 };
            filtered.forEach(a => {
                counts[a.status]++;
                attendanceStats[a.status]++;
            });

            staffDetails.push({
                name: record.userId.name,
                email: record.userId.email,
                salary: record.salary,
                present: counts.present,
                absent: counts.absent,
                leave: counts.leave,
            });
        });

        const totalSalary = staffAttendance.reduce((sum, s) => sum + (s.salary || 0), 0);

        // 7️⃣ Respond
        res.json({
            totalOrders,
            totalRevenue,
            estimatedProfit,
            customerCount,
            orderTrends: orderTrendArray,
            topSellingPlant,
            lowStockPlants,
            attendanceStats,
            staffDetails,
            totalSalary,
        });
    } catch (err) {
        console.error('Manager summary error:', err);
        res.status(500).json({ message: 'Failed to fetch manager summary' });
    }
});

exports.dashboardRouter = router;
