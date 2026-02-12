import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";
import pdfMake from "pdfmake/build/pdfmake";
import { Package } from "lucide-react";

pdfMake.fonts = {
  Roboto: {
    normal:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};

function AdminAccountantPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(
    format(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      "yyyy-MM-dd",
    ),
  );
  const [end, setEnd] = useState(format(new Date(), "yyyy-MM-dd"));
  const [pdfDownloading, setPdfDownloading] = useState(false);

  // Fetching the summary data from the backend API
  const fetchSummary = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/accountant/summary`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { start, end },
        },
      );
      setSummary(res.data);
    } catch (error) {
      console.error("Fetch failed:", error);
      toast.error("Failed to fetch summary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [start, end]);

  // Function to export PDF
  const exportPDF = () => {
    setPdfDownloading(true);
    const docDefinition = {
      content: [
        { text: "Accountant Analysis", style: "header" },
        { text: `Date Range: ${start} to ${end}`, margin: [0, 10] },
        {
          text: `Generated: ${format(new Date(), "yyyy-MM-dd HH:mm")}`,
          margin: [0, 10],
        },
        // Table for summary data
        {
          table: {
            headerRows: 1,
            widths: ["*", "auto"],
            body: [
              ["Category", "Value"],
              ["Total Orders", summary.totalOrders],
              ["Paid Orders", summary.paidOrders],
              ["Unpaid Orders", summary.unpaidOrders],
              ["Total Revenue (₹)", summary.totalRevenue.toFixed(2)],
              ["Estimated Profit (₹)", summary.estimatedProfit.toFixed(2)],
              ["Total Salaries (₹)", summary.totalSalary.toFixed(2)],
              ["Present Days", summary.attendanceStats.present],
              ["Absent Days", summary.attendanceStats.absent],
              ["Leave Days", summary.attendanceStats.leave],
            ],
          },
          layout: "lightHorizontalLines", // Style for the table
        },
        { text: "Staff Details:", style: "subheader" },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "auto", "auto", "auto", "auto", "auto"],
            body: [
              ["Name", "Email", "Salary", "Present", "Absent", "Leave"],
              ...summary.staffDetails.map((staff) => [
                staff.name,
                staff.email,
                `₹${staff.salary}`,
                staff.present,
                staff.absent,
                staff.leave,
              ]),
            ],
          },
          layout: "lightHorizontalLines", // Style for the table
        },
      ],
      styles: {
        header: { fontSize: 16, bold: true, alignment: "center" },
        subheader: { fontSize: 14, bold: true, margin: [0, 10] },
      },
    };

    // Create the PDF and download it
    pdfMake
      .createPdf(docDefinition)
      .download(`AccountantAnalysis_${start}_to_${end}.pdf`);
    setPdfDownloading(false);
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
        {/* Date filter inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-green-700 font-medium mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="border border-green-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block text-green-700 font-medium mb-1">
              End Date
            </label>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="border border-green-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={exportPDF}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
              disabled={pdfDownloading} // Disable the button while downloading
            >
              {pdfDownloading
                ? "Downloading..." // Show this text when PDF is being generated
                : "Export PDF"}
            </button>
          </div>
        </div>

        {/* Summary and staff data */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {["Orders Summary", "Financial Summary", "Attendance Summary"].map(
            (title, idx) => (
              <div
                key={idx}
                className="bg-white border border-green-200 shadow-sm p-4 rounded"
              >
                <h2 className="text-xl font-semibold text-green-800 mb-2">
                  {title}
                </h2>
                {idx === 0 && (
                  <>
                    <p>Total Orders: {summary.totalOrders}</p>
                    <p>Paid Orders: {summary.paidOrders}</p>
                    <p>Unpaid Orders: {summary.unpaidOrders}</p>
                  </>
                )}
                {idx === 1 && (
                  <>
                    <p>Total Revenue: ₹{summary.totalRevenue.toFixed(2)}</p>
                    <p>Profit: ₹{summary.estimatedProfit.toFixed(2)}</p>
                    <p>Total Salaries: ₹{summary.totalSalary.toFixed(2)}</p>
                  </>
                )}
                {idx === 2 && (
                  <>
                    <p>Present: {summary.attendanceStats.present}</p>
                    <p>Absent: {summary.attendanceStats.absent}</p>
                    <p>Leave: {summary.attendanceStats.leave}</p>
                  </>
                )}
              </div>
            ),
          )}
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-green-200 rounded-lg">
            <thead className="bg-green-100">
              <tr>
                {["Name", "Email", "Salary", "Present", "Absent", "Leave"].map(
                  (h) => (
                    <th key={h} className="px-4 py-2 border text-green-800">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {summary.staffDetails.map((s, i) => (
                <tr key={i} className="text-center border-t">
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.email}</td>
                  <td className="px-4 py-2">₹{s.salary}</td>
                  <td className="px-4 py-2">{s.present}</td>
                  <td className="px-4 py-2">{s.absent}</td>
                  <td className="px-4 py-2">{s.leave}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminAccountantPage;
