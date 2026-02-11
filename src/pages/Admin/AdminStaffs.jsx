import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserCheck, Search, Filter, CalendarDays } from 'lucide-react';

function AdminStaffs() {
    const navigate = useNavigate();
    const [staff, setStaff] = useState([]);
    const [filteredStaff, setFilteredStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [editingSalaryId, setEditingSalaryId] = useState(null);
    const [editedSalary, setEditedSalary] = useState('');


    useEffect(() => {
        fetchStaffAttendance();
    }, [statusFilter, selectedDate]);

    useEffect(() => {
        filterStaff();
    }, [staff, searchTerm]);

    const fetchStaffAttendance = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login as admin');
                navigate('/login');
                return;
            }
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/staff/attendance/`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { date: selectedDate }
            });
            let data = res.data.attendance;
            if (statusFilter !== 'all') {
                data = data.filter(s => s.status === statusFilter);
            }
            setStaff(data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch attendance');
        } finally {
            setLoading(false);
        }
    };

    const handleAttendanceChange = async (userId, status) => {
        try {
            if (status == "not-marked") {
                return;
            }
            const today = new Date().toISOString().split('T')[0];
            if (selectedDate < today) {
                toast.error("Can't change attendance for past dates");
                return;
            }

            const token = localStorage.getItem('token');
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/staff/attendance/`,
                {
                    userId,
                    date: selectedDate,
                    status
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success(res.data.message);
            fetchStaffAttendance(); // Refresh list
        } catch (error) {
            console.error('Error marking attendance:', error);
            toast.error(error.response?.data?.message || 'Failed to update attendance');
        }
    };

    const filterStaff = () => {
        let filtered = staff;
        if (searchTerm) {
            filtered = filtered.filter(
                s =>
                    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredStaff(filtered);
    };
    const handleSalaryUpdate = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/staff/salary/${userId}`,
                { salary: editedSalary },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success('Salary updated successfully');
            // Update UI
            setStaff(prev =>
                prev.map(s => (s.userId === userId ? { ...s, salary: editedSalary } : s))
            );
            setEditingSalaryId(null);
            setEditedSalary('');
        } catch (error) {
            console.error('Salary update failed:', error);
            toast.error(error.response?.data?.message || 'Salary update failed');
        }
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center mb-8">
                    <UserCheck className="mr-3 h-8 w-8 text-gray-700" />
                    <h1 className="text-3xl font-bold text-gray-900">Staff Attendance</h1>
                    <span className="ml-3 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        {filteredStaff.length} {filteredStaff.length === 1 ? 'Staff' : 'Staffs'}
                    </span>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            >
                                <option value="all">All Status</option>
                                <option value="present">Present</option>
                                <option value="absent">Absent</option>
                                <option value="leave">Leave</option>
                                <option value="not marked">Not Marked</option>
                            </select>
                        </div>
                        <div className="relative">
                            <CalendarDays className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                    </div>
                ) : filteredStaff.length === 0 ? (
                    <div className="text-center py-12">
                        <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-500">
                            {staff.length === 0 ? 'No staff found' : 'No staff match your filters'}
                        </h3>
                    </div>
                ) : (
                    <div className="space-y-4 max-h-[700px] overflow-auto">
                        {filteredStaff.map((s) => (
                            <div
                                key={s.userId}
                                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold">{s.name}</h3>
                                        <p className="text-sm text-gray-600">{s.email}</p>
                                        <p className="text-sm text-gray-600">
                                            Current Status:
                                            <span
                                                className={`ml-2 font-medium ${s.status === 'present'
                                                    ? 'text-green-600'
                                                    : s.status === 'absent'
                                                        ? 'text-red-600'
                                                        : s.status === 'leave'
                                                            ? 'text-yellow-600'
                                                            : 'text-gray-500'
                                                    }`}
                                            >
                                                {s.status}
                                            </span>
                                        </p>

                                        {/* 💸 Salary Display & Edit */}
                                        <p className="text-sm text-gray-600 mt-2">
                                            Salary:
                                            {editingSalaryId === s.userId ? (
                                                <>
                                                    <input
                                                        type="number"
                                                        value={editedSalary}
                                                        onChange={(e) => setEditedSalary(e.target.value)}
                                                        className="ml-2 border rounded px-2 py-1 text-sm w-28"
                                                    />
                                                    <button
                                                        onClick={() => handleSalaryUpdate(s.userId)}
                                                        className="ml-2 px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setEditingSalaryId(null);
                                                            setEditedSalary('');
                                                        }}
                                                        className="ml-1 px-2 py-1 bg-gray-200 text-xs rounded hover:bg-gray-300"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="ml-2 font-semibold text-blue-700">
                                                        ₹{s.salary || 'N/A'}
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            setEditingSalaryId(s.userId);
                                                            setEditedSalary(s.salary || '');
                                                        }}
                                                        className="ml-2 text-blue-600 text-xs hover:underline"
                                                    >
                                                        Edit
                                                    </button>
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    {selectedDate >= new Date().toISOString().split('T')[0] && (
                                        <select
                                            value={s.status}
                                            onChange={(e) => handleAttendanceChange(s.userId, e.target.value)}
                                            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                                        >
                                            <option value="not-marked">Not Marked</option>
                                            <option value="present">Present</option>
                                            <option value="absent">Absent</option>
                                            <option value="leave">Leave</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminStaffs;
