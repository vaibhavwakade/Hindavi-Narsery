import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Package,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
} from "lucide-react";

function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter, dateFilter]);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login as admin");
        navigate("/login");
        return;
      }
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            status: statusFilter !== "all" ? statusFilter : undefined,
            page,
            limit: 10,
          },
        },
      );
      setOrders(res.data.orders || []);
      setTotalPages(res.data.pages || 1);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.response?.data?.message || "Failed to load orders");
      if (error.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders || [];
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order &&
          (String(order.id || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            (order.items &&
              order.items.some((item) =>
                item?.productDetails?.name
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase()),
              ))),
      );
    }
    setFilteredOrders(filtered);
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/orders/status/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(res.data.message);
      setOrders(
        orders.map((o) => o && (o.id === orderId ? res.data.order : o)),
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(
        error.response?.data?.message || "Failed to update order status",
      );
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "confirmed":
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Package className="mr-3 h-8 w-8 text-gray-700" />
          <h1 className="text-3xl font-bold text-gray-900">Manage Orders</h1>
          <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {filteredOrders.length}{" "}
            {filteredOrders.length === 1 ? "Order" : "Orders"}
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by ID or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="relative">
              <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Time</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="3months">Last 3 Months</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-500">
              {orders.length === 0
                ? "No orders found"
                : "No orders match your filters"}
            </h3>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(
              (order) =>
                order && (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(order?.status || "pending")}
                        <div>
                          <h3 className="text-lg font-semibold">
                            Order #{String(order.id).slice(-8)}
                          </h3>
                          <p className="text-sm text-gray-600">
                            User: {order.userDetails?.name || "Unknown"} (
                            {order.userDetails?.email || "No email"})
                          </p>
                          <p className="text-sm text-gray-600">
                            Date:{" "}
                            {order.createdAt
                              ? formatDate(order.createdAt)
                              : "No date"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status || "pending")}`}
                        >
                          {(order.status || "pending").charAt(0).toUpperCase() +
                            (order.status || "pending").slice(1)}
                        </span>
                        <span className="text-xl font-bold text-green-600">
                          ₹{parseFloat(order.totalAmount || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4 overflow-x-auto">
                      {(order.items || []).slice(0, 3).map(
                        (item, index) =>
                          item && (
                            <div
                              key={item?.productDetails?.id || index}
                              className="flex items-center gap-3 flex-shrink-0"
                            >
                              <img
                                src={
                                  item?.productDetails?.imageUrls?.length
                                    ? item.productDetails?.imageUrls[0]
                                    : "https://via.placeholder.com/50"
                                }
                                alt={item?.productDetails?.name || "Product"}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <p className="font-medium text-sm">
                                  {item?.productDetails?.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                  Qty: {item?.quantity}
                                </p>
                              </div>
                            </div>
                          ),
                      )}
                      {order?.items?.length > 3 && (
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          +{order?.items?.length - 3} more items
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <select
                        value={order.status || "pending"}
                        onChange={(e) =>
                          handleUpdateStatus(order.id, e.target.value)
                        }
                        className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ),
            )}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
