import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const AdminStaffDashboard = ({ userId }) => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [from, setFrom] = useState(format(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy-MM-dd'));
    const [to, setTo] = useState(format(new Date(), 'yyyy-MM-dd'));

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/staff/self-summary/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSummary(res.data);
            } catch (err) {
                console.error(err);
                toast.error('Failed to fetch staff summary');
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, [userId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-50">
                <div className="h-12 w-12 animate-spin border-4 border-green-600 border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!summary) {
        return <div className="text-center text-green-600 mt-10">No data available.</div>;
    }

    const filteredAttendance = summary.attendance.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= new Date(from) && entryDate <= new Date(to);
    });

    return (
        <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-lg border border-green-200">
            {/* <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Staff Dashboard</h1> */}

            <div className="mb-4 space-y-1">
                <p className="text-green-800"><strong>Name:</strong> {summary.name}</p>
                <p className="text-green-800"><strong>Email:</strong> {summary.email}</p>
                <p className="text-green-800"><strong>Salary:</strong> ₹{summary.salary}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-green-700">From Date</label>
                    <input
                        type="date"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="mt-1 block w-full border border-green-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-green-700">To Date</label>
                    <input
                        type="date"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="mt-1 block w-full border border-green-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
            </div>

            <h2 className="text-lg font-semibold text-green-700 mb-3">Attendance Records</h2>
            <div className="overflow-x-auto border border-green-200 rounded-lg">
                <table className="min-w-full border text-sm text-green-900">
                    <thead className="bg-green-100 text-green-800 font-semibold">
                        <tr>
                            <th className="py-2 px-4 border border-green-200">Date</th>
                            <th className="py-2 px-4 border border-green-200">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAttendance.length > 0 ? (
                            filteredAttendance.map((a, i) => (
                                <tr key={i} className="hover:bg-green-50">
                                    <td className="py-2 px-4 border border-green-200">{format(new Date(a.date), 'yyyy-MM-dd')}</td>
                                    <td className="py-2 px-4 border border-green-200 capitalize">{a.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center py-4 text-green-500">
                                    No attendance found in selected range
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminStaffDashboard;
