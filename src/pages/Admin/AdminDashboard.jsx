import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Users, Package, ShoppingBag, DollarSign, BarChart3, TrendingUp } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Get basic counts from existing API endpoints
      const responses = await Promise.allSettled([
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`),
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories`),
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/stats`, { // New endpoint for stats
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      let productCount = 0;
      let orderCount = 0;
      let categoryCount = 0;
      let userCount = 0;
      let totalRevenue = 0;

      // Handle products
      if (responses[0].status === 'fulfilled' && responses[0].value.ok) {
        const productsData = await responses[0].value.json();
        productCount = productsData.products?.length || 0;
      } else {
        toast.error('Failed to load product stats.');
      }

      // Handle orders
      if (responses[1].status === 'fulfilled' && responses[1].value.ok) {
        const ordersData = await responses[1].value.json();
        orderCount = ordersData.orders?.length || 0;
      } else {
        toast.error('Failed to load order stats.');
      }

      // Handle categories
      if (responses[2].status === 'fulfilled' && responses[2].value.ok) {
        const categoriesData = await responses[2].value.json();
        categoryCount = categoriesData.categories?.length || 0;
      } else {
        toast.error('Failed to load category stats.');
      }

      // Handle admin stats
      if (responses[3].status === 'fulfilled' && responses[3].value.ok) {
        const statsData = await responses[3].value.json();
        userCount = statsData.userCount || 0;
        totalRevenue = statsData.totalRevenue || 0;
      } else {
        toast.error('Failed to load user and revenue stats.');
      }

      setStats({
        users: userCount,
        products: productCount,
        orders: orderCount,
        revenue: totalRevenue,
      });

    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-green-100">Manage your nursery operations from here</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Users Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Users</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.users}</p>
              <div className="flex items-center mt-2 text-xs text-green-600 font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+2 this month</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Products</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.products}</p>
              <div className="flex items-center mt-2 text-xs text-green-600 font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>In catalog</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.orders}</p>
              <div className="flex items-center mt-2 text-xs text-red-600 font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>-5 this month</span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">₹{stats.revenue.toFixed(2)}</p>
              <div className="flex items-center mt-2 text-xs text-green-600 font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+12% this month</span>
              </div>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center mb-2">
              <Package className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-medium text-green-800">Products</span>
            </div>
            <p className="text-sm text-green-600">Manage your plant inventory and add new products</p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center mb-2">
              <ShoppingBag className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium text-blue-800">Orders</span>
            </div>
            <p className="text-sm text-blue-600">View and manage customer orders</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center mb-2">
              <Users className="h-5 w-5 text-purple-600 mr-2" />
              <span className="font-medium text-purple-800">Users</span>
            </div>
            <p className="text-sm text-purple-600">Manage customer accounts and profiles</p>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">System Status</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-medium text-green-800">Database Connection</span>
            <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">Online</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-medium text-green-800">API Services</span>
            <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">Running</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-medium text-green-800">Image Storage</span>
            <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;