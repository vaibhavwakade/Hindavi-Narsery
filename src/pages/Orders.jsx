import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Truck, 
  Calendar,
  Filter,
  Search,
  Download,
  Eye,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';

import QRCodeImage from "../assets/images/QRCodeImage.jpg";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [navigate]);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter, dateFilter]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to view orders');
        navigate('/login');
        return;
      }
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error.response?.data || error);
      toast.error(error.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
  };

  const filterOrders = () => {
    // Add defensive check for orders array
    if (!orders || !Array.isArray(orders)) {
      setFilteredOrders([]);
      return;
    }
    
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order?.id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        order?.items?.some(item => 
          item?.product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order?.status === statusFilter);
    }

    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case '3months':
          filterDate.setMonth(now.getMonth() - 3);
          break;
      }
      
      filtered = filtered.filter(order => 
        order?.createdAt && new Date(order.createdAt) >= filterDate
      );
    }

    setFilteredOrders(filtered || []);
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/cancel/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Order cancelled successfully');
      setOrders(orders.map((order) =>
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      ));
    } catch (error) {
      console.error('Error cancelling order:', error.response?.data || error);
      toast.error(error.response?.data?.message || 'Failed to cancel order');
    }
  };

  const handleReorder = async (order) => {
    try {
      const token = localStorage.getItem('token');
      const newOrderItems = order.items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
        { items: newOrderItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('New order created with the same items');
      await fetchOrders();
      navigate('/orders');
    } catch (error) {
      console.error('Error reordering:', error.response?.data || error);
      toast.error(error.response?.data?.message || 'Failed to reorder items');
    }
  };

  const handlePayNow = async (order) => {
    try {
      if (!order?.id) {
        console.error('Invalid order ID:', order);
        toast.error('Invalid order ID');
        return;
      }
      
      // Show payment options modal instead of directly initiating Razorpay
      setSelectedOrder(order);
      setShowPaymentOptions(true);
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast.error('Failed to initiate payment');
    }
  };

  const handleRazorpayPayment = async (order) => {
    try {
      if (!window.Razorpay) {
        console.log('Loading Razorpay script...');
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        await new Promise((resolve, reject) => {
          script.onload = () => {
            console.log('Razorpay script loaded');
            resolve();
          };
          script.onerror = () => reject(new Error('Failed to load Razorpay script'));
        });
      }

      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to proceed with payment');
        navigate('/login');
        return;
      }

      const options = {
        key: 'rzp_test_EjQc1EWnjKqegB', // Use environment variable in production
        amount: Math.round(order.totalAmount * 100), // Amount in paise
        currency: 'INR',
        name: 'Your E-commerce Store',
        description: `Payment for Order #${order.id.toString().slice(-8)}`,
        handler: async function (response) {
          try {
            await axios.put(
              `${import.meta.env.VITE_BACKEND_URL}/api/orders/pay/${order.id}`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Payment successful');
            setOrders(orders.map((o) =>
              o.id === order.id ? { ...o, paymentStatus: 'paid', status: 'confirmed' } : o
            ));
            setShowPaymentOptions(false);
          } catch (error) {
            console.error('Error updating payment status:', error.response?.data || error);
            toast.error(error.response?.data?.message || 'Failed to update payment status');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#2563eb',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        toast.error(response.error.description || 'Payment failed');
      });
      rzp.open();
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast.error('Failed to initiate payment');
    }
  };

  const handleQRCodePayment = async (order) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to proceed with payment');
        navigate('/login');
        return;
      }
      
      // Generate QR code data - normally this would come from your backend
      setQrCodeData({
        orderId: order.id,
        amount: order.totalAmount,
        reference: `Order-${order.id.toString().slice(-8)}`,
        upiId: 'yourstore@upi', // Replace with your actual UPI ID
        payeeName: 'Your E-commerce Store'
      });
      
      setShowQrCode(true);
    } catch (error) {
      console.error('QR Code generation error:', error);
      toast.error('Failed to generate QR code');
    }
  };

  const confirmQrCodePayment = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      
      // In a real implementation, you'd verify the payment with your backend
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/pay/${orderId}`,
        { paymentMethod: 'qrcode' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success('Payment successful');
      setOrders(orders.map((o) =>
        o.id === orderId ? { ...o, paymentStatus: 'paid', status: 'confirmed' } : o
      ));
      setShowQrCode(false);
      setShowPaymentOptions(false);
    } catch (error) {
      console.error('Error updating payment status:', error.response?.data || error);
      toast.error(error.response?.data?.message || 'Failed to update payment status');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const exportOrders = () => {
    const csvContent = [
      ['Order ID', 'Date', 'Status', 'Payment Status', 'Total', 'Items'],
      ...filteredOrders.map(order => [
        order.id,
        formatDate(order.createdAt),
        order.status,
        order.paymentStatus,
        `₹${parseFloat(order.totalAmount || 0).toFixed(2)}`,
        order.items.map(item => `${item.product?.name} (${item.quantity})`).join('; '),
      ]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Order ID</h3>
                  <p className="text-sm text-gray-600">{order.id}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Date</h3>
                  <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Status</h3>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Payment Status</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Total</h3>
                  <p className="text-lg font-bold text-green-600">₹{parseFloat(order.totalAmount || 0).toFixed(2)}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Items</h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <img
                        src={item.product?.imageUrls[0] || 'https://via.placeholder.com/60'}
                        alt={item.product?.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product?.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm font-medium text-green-600">₹{parseFloat(item.price || 0).toFixed(2)} each</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{(parseFloat(item.price || 0) * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PaymentOptionsModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Payment Options</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                Order Total: <span className="font-bold text-green-600">₹{parseFloat(order.totalAmount || 0).toFixed(2)}</span>
              </p>
              
              <button
                onClick={() => handleRazorpayPayment(order)}
                className="w-full flex items-center justify-center gap-3 p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <img 
                  src="https://razorpay.com/assets/razorpay-glyph.svg" 
                  alt="Razorpay" 
                  className="h-6" 
                />
                <div className="text-left">
                  <p className="font-medium">Pay with Razorpay</p>
                  <p className="text-sm text-gray-500">Credit/Debit Card, UPI, Netbanking & more</p>
                </div>
              </button>
              
              <button
                onClick={() => handleQRCodePayment(order)}
                className="w-full flex items-center justify-center gap-3 p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
              >
                <div className="bg-green-100 p-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-medium">Pay via QR Code</p>
                  <p className="text-sm text-gray-500">Scan with any UPI app</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const QRCodePaymentModal = ({ qrData, onClose, onConfirm }) => {
    if (!qrData) return null;
    
    // In a real implementation, you would generate an actual QR code image
    // Here we're just showing placeholder text representing the QR code data
    const qrCodeUrl = `upi://pay?pa=${qrData.upiId}&pn=${encodeURIComponent(qrData.payeeName)}&am=${qrData.amount}&cu=INR&tn=${encodeURIComponent(qrData.reference)}`;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Pay via QR Code</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6 text-center">
              <div className="bg-gray-100 p-6 rounded-lg mx-auto w-64 h-64 flex items-center justify-center">
                {/* Replace with an actual QR code generator component */}
                <div className="text-sm text-gray-500" style={{widht:"100%",height:"100%"}}>
                 <img src={QRCodeImage} alt="QR Code Image" style={{widht:"100%",height:"100%",objectFit:"contain",objectPosition:"center"}} />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">Scan with any UPI app</p>
                <p className="text-sm text-gray-600">
                  UPI ID: {qrData.upiId}<br />
                  Amount: ₹{parseFloat(qrData.amount || 0).toFixed(2)}<br />
                  Reference: {qrData.reference}
                </p>
              </div>
              
              <button
                onClick={() => onConfirm(qrData.orderId)}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                I've completed the payment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8" />
            Your Orders
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
          {filteredOrders.length > 0 && (
            <button
              onClick={exportOrders}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
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

          {(searchTerm || statusFilter !== 'all' || dateFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setDateFilter('all');
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading orders...</p>
        </div>
      ) : (!filteredOrders || filteredOrders.length === 0) ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">
            {(!orders || orders.length === 0) ? 'No orders found' : 'No orders match your filters'}
          </h3>
          <p className="text-gray-400">
            {(!orders || orders.length === 0) 
              ? 'Start shopping to see your orders here'
              : 'Try adjusting your search or filter criteria'
            }
          </p>
          {(!orders || orders.length === 0) && (
            <button
              onClick={() => navigate('/products')}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Start Shopping
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.filter(order => order && order.id).map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="font-semibold text-lg">Order #{order.id.toString().slice(-8)}</h3>
                      <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                    <span className="text-xl font-bold text-green-600">
                      ₹{parseFloat(order.totalAmount || 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 overflow-x-auto">
                  {order.items && Array.isArray(order.items) && order.items.slice(0, 3).map((item) => (
                    item && item.product && item.product.id ? (
                      <div key={item.product.id} className="flex items-center gap-3 flex-shrink-0">
                        <img
                          src={(item.product.imageUrls && item.product.imageUrls[0]) || 'https://via.placeholder.com/50'}
                          alt={item.product?.name || 'Product'}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium text-sm">{item.product?.name || 'Unknown Product'}</p>
                          <p className="text-xs text-gray-600">Qty: {item.quantity || 0}</p>
                        </div>
                      </div>
                    ) : null
                  ))}
                  {order.items && order.items.length > 3 && (
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      +{order.items.length - 3} more items
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowOrderDetails(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>

                  <button
                    onClick={() => handleReorder(order)}
                    className="flex items-center gap-2 px-4 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reorder
                  </button>

                  {order.status === 'pending' && order.paymentStatus === 'unpaid' && (
                    <>
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel Order
                      </button>
                      <button
                        onClick={() => handlePayNow(order)}
                        className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Pay Now
                      </button>
                    </>
                  )}

                  {order.status === 'delivered' && (
                    <button
                      onClick={() => navigate(`/products/${order.items[0].product.id}/review`)}
                      className="flex items-center gap-2 px-4 py-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg transition-colors"
                    >
                      ⭐ Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showOrderDetails && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => {
            setShowOrderDetails(false);
            setSelectedOrder(null);
          }}
        />
      )}
      
      {showPaymentOptions && (
        <PaymentOptionsModal
          order={selectedOrder}
          onClose={() => {
            setShowPaymentOptions(false);
            setSelectedOrder(null);
          }}
        />
      )}
      
      {showQrCode && qrCodeData && (
        <QRCodePaymentModal
          qrData={qrCodeData}
          onClose={() => {
            setShowQrCode(false);
            setQrCodeData(null);
          }}
          onConfirm={confirmQrCodePayment}
        />
      )}
    </div>
  );
}

export default Orders;