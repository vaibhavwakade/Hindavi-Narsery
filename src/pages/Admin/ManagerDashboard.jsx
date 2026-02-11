import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import pdfMake from 'pdfmake/build/pdfmake';

pdfMake.fonts = {
    Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
    },
};

export default function ManagerDashboard() {
    const [summary, setSummary] = useState(null);
    const [start, setStart] = useState(format(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy-MM-dd'));
    const [end, setEnd] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);

    const fetchSummary = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/manager/summary`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { start, end },
            });
            setSummary(data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch manager summary');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSummary();
    }, [start, end]);

    const exportPDF = () => {
        if (!summary) return;
        setDownloading(true);
        const docDefinition = {
            content: [
                { text: 'Manager Dashboard Summary', style: 'header' },
                { text: `From: ${start} To: ${end}`, margin: [0, 5] },
                { text: `Generated: ${format(new Date(), 'yyyy-MM-dd HH:mm')}`, margin: [0, 5] },
                {
                    style: 'tableStyle',
                    table: {
                        widths: ['*', '*'],
                        body: [
                            ['Metric', 'Value'],
                            ['Total Orders', summary.totalOrders],
                            ['Total Revenue (₹)', summary.totalRevenue.toFixed(2)],
                            ['Customer Count', summary.customerCount],
                            ['Top Selling Plant', summary.topSellingPlant?.name || 'N/A'],
                            ['Active Employees Today', summary.activeEmployeesToday],
                        ],
                    },
                },
                { text: 'Low Stock Plants (≤5)', style: 'subheader' },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', 'auto'],
                        body: [
                            ['Plant Name', 'Stock'],
                            ...summary.lowStockPlants.map(p => [p.name, p.stock]),
                        ],
                    },
                },
            ],
            styles: {
                header: { fontSize: 18, bold: true, alignment: 'center' },
                subheader: { fontSize: 14, bold: true, margin: [0, 10] },
                tableStyle: { margin: [0, 10] },
            },
        };

        pdfMake.createPdf(docDefinition).download(`ManagerDashboard_${start}_to_${end}.pdf`);
        setDownloading(false);
    };

    if (loading || !summary) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-green-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-50 px-4 py-6 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-green-700 font-medium mb-1">Start Date</label>
                        <input type="date" value={start} onChange={e => setStart(e.target.value)} className="border border-green-300 rounded px-3 py-2 w-full" />
                    </div>
                    <div>
                        <label className="block text-green-700 font-medium mb-1">End Date</label>
                        <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="border border-green-300 rounded px-3 py-2 w-full" />
                    </div>
                    <div className="flex items-end">
                        {/* <button
                            onClick={exportPDF}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                            disabled={downloading}
                        >
                            {downloading ? 'Downloading...' : 'Export PDF'}
                        </button> */}
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-green-100 p-4 rounded shadow">
                        <h3 className="text-lg text-green-800 font-semibold">Total Orders</h3>
                        <p className="text-xl">{summary.totalOrders}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded shadow">
                        <h3 className="text-lg text-green-800 font-semibold">Revenue</h3>
                        <p className="text-xl">₹{summary.totalRevenue.toFixed(2)}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded shadow">
                        <h3 className="text-lg text-green-800 font-semibold">Customers</h3>
                        <p className="text-xl">{summary.customerCount}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded shadow">
                        <h3 className="text-lg text-green-800 font-semibold">Top Plant</h3>
                        <p className="text-xl">{summary.topSellingPlant?.name || 'N/A'}</p>
                    </div>
                    {/* <div className="bg-green-100 p-4 rounded shadow">
                        <h3 className="text-lg text-green-800 font-semibold">Active Employees</h3>
                        <p className="text-xl">{summary.activeEmployeesToday}</p>
                    </div> */}
                </div>

                {/* Trend Graph */}
                <div className="mb-10">
                    <h3 className="text-green-800 text-lg font-semibold mb-2">Order & Revenue Trends</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={summary.orderTrends}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#16a34a" name="Orders" />
                            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#065f46" name="Revenue" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Low Stock Table */}
                <div className="overflow-x-auto">
                    <h3 className="text-green-800 text-lg font-semibold mb-2">Low Stock Products</h3>
                    <table className="min-w-full bg-white border border-green-200 rounded">
                        <thead className="bg-green-100">
                            <tr>
                                <th className="px-4 py-2 border text-green-800">Plant Name</th>
                                <th className="px-4 py-2 border text-green-800">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summary.lowStockPlants.map((plant, i) => (
                                <tr key={i} className="text-center border-t">
                                    <td className="px-4 py-2">{plant.name}</td>
                                    <td className="px-4 py-2">{plant.stock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
