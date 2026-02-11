import { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Lock, LogOut, Package, Leaf, Settings, BarChart3, Users, ShoppingBag, Sprout, User2, UserCog2, Stars } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import AdminDashboard from './AdminDashboard';
import { API_BASE_URL } from '../../config/api';

function AdminPanel() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(null);
  const [userId, setUserId] = useState("");

  // Check admin access
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login as admin');
          navigate('/login');
          return;
        }

        // Fetch user profile to check role
        const userRes = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userRole = userRes.data.user.role;
        const userId = userRes.data.user.id;
        
        if (userRole !== 'admin') {
          toast.error('Access denied: Admin access required');
          navigate('/');
          return;
        }
        setUserId(userId)

        if (userRole === "admin") {
          setIsAdmin(true);
        }

      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load admin panel');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Handle navigation
  const handleNavigate = (path, tab) => {
    setActiveTab(tab);
    navigate(path);
  };

  if (loading) return <LoadingSpinner />;
  if (!isAdmin) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white/90 backdrop-blur-sm shadow-xl border-r border-green-100">
        {/* Header */}
        <div className="px-6 py-8 border-b border-green-100">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sprout className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                Garden Admin
              </h2>
              <p className="text-sm text-green-600 font-medium">Plant Nursery Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6">
          <div className="space-y-2">
            {/* Overview */}
            <div className="mb-6">
              <h3 className="px-3 mb-3 text-xs font-semibold text-green-800 uppercase tracking-wider">
                Overview
              </h3>
              <button 
                onClick={() => handleNavigate('/admin', null)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${!activeTab
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'text-green-700 hover:bg-green-50'
                }`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-all duration-200 ${!activeTab
                  ? 'bg-white/20'
                  : 'bg-gradient-to-br from-green-100 to-green-200 group-hover:from-green-200 group-hover:to-green-300'
                }`}>
                  <BarChart3 className={`h-5 w-5 ${!activeTab ? 'text-white' : 'text-green-600'}`} />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Dashboard</div>
                  <div className={`text-xs ${!activeTab ? 'text-green-100' : 'text-green-600'}`}>
                    Analytics & Stats
                  </div>
                </div>
              </button>
            </div>

            {/* Management */}
            <div className="mb-6">
              <h3 className="px-3 mb-3 text-xs font-semibold text-green-800 uppercase tracking-wider">
                Management
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigate('/admin/add-category', 'category')}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === 'category'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'text-green-700 hover:bg-green-50'
                    }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-all duration-200 ${activeTab === 'category'
                    ? 'bg-white/20'
                    : 'bg-gradient-to-br from-yellow-100 to-yellow-200 group-hover:from-yellow-200 group-hover:to-yellow-300'
                    }`}>
                    <Leaf className={`h-5 w-5 ${activeTab === 'category' ? 'text-white' : 'text-yellow-600'}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Add Category</div>
                    <div className={`text-xs ${activeTab === 'category' ? 'text-green-100' : 'text-green-600'}`}>
                      Category management
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavigate('/admin/create-product', 'products')}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === 'products'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'text-green-700 hover:bg-green-50'
                    }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-all duration-200 ${activeTab === 'products'
                    ? 'bg-white/20'
                    : 'bg-gradient-to-br from-green-100 to-green-200 group-hover:from-green-200 group-hover:to-green-300'
                    }`}>
                    <Package className={`h-5 w-5 ${activeTab === 'products' ? 'text-white' : 'text-green-600'}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Add Products</div>
                    <div className={`text-xs ${activeTab === 'products' ? 'text-green-100' : 'text-green-600'}`}>
                      Plants & accessories
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavigate('/admin/manage-products', 'manage-products')}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === 'manage-products'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'text-green-700 hover:bg-green-50'
                    }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-all duration-200 ${activeTab === 'manage-products'
                    ? 'bg-white/20'
                    : 'bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300'
                    }`}>
                    <Settings className={`h-5 w-5 ${activeTab === 'manage-products' ? 'text-white' : 'text-blue-600'}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Manage Products</div>
                    <div className={`text-xs ${activeTab === 'manage-products' ? 'text-green-100' : 'text-green-600'}`}>
                      Edit & Delete products
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavigate('/admin/users', 'users')}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === 'users'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'text-green-700 hover:bg-green-50'
                    }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-all duration-200 ${activeTab === 'users'
                    ? 'bg-white/20'
                    : 'bg-gradient-to-br from-purple-100 to-purple-200 group-hover:from-purple-200 group-hover:to-purple-300'
                    }`}>
                    <Users className={`h-5 w-5 ${activeTab === 'users' ? 'text-white' : 'text-purple-600'}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Users</div>
                    <div className={`text-xs ${activeTab === 'users' ? 'text-green-100' : 'text-green-600'}`}>
                      Customer accounts
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavigate('/admin/orders', 'orders')}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === 'orders'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'text-green-700 hover:bg-green-50'
                    }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-all duration-200 ${activeTab === 'orders'
                    ? 'bg-white/20'
                    : 'bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300'
                    }`}>
                    <ShoppingBag className={`h-5 w-5 ${activeTab === 'orders' ? 'text-white' : 'text-blue-600'}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Orders</div>
                    <div className={`text-xs ${activeTab === 'orders' ? 'text-green-100' : 'text-green-600'}`}>
                      Order management
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavigate('/admin/reviews', 'reviews')}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === 'reviews'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'text-green-700 hover:bg-green-50'
                    }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-all duration-200 ${activeTab === 'reviews'
                    ? 'bg-white/20'
                    : 'bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300'
                    }`}>
                    <Stars className={`h-5 w-5 ${activeTab === 'reviews' ? 'text-white' : 'text-blue-600'}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Reviews</div>
                    <div className={`text-xs ${activeTab === 'reviews' ? 'text-green-100' : 'text-green-600'}`}>
                      Manage Reviews
                    </div>
                  </div>
                </button>

              </div>
            </div>

            {/* Settings */}
            <div className="mb-6">
              <h3 className="px-3 mb-3 text-xs font-semibold text-green-800 uppercase tracking-wider">
                Settings
              </h3>
              <button className="w-full flex items-center px-4 py-3 text-green-700 rounded-xl hover:bg-green-50 transition-all duration-200 group">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mr-3 group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-200">
                  <Settings className="h-5 w-5 text-gray-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Settings</div>
                  <div className="text-xs text-green-600">System config</div>
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-200 group border border-red-100"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center mr-3 group-hover:from-red-200 group-hover:to-red-300 transition-all duration-200">
              <LogOut className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Sign Out</div>
              <div className="text-xs text-red-500">Exit dashboard</div>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">Manage your nursery operations efficiently</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-white/50">
                <span className="text-sm text-gray-600">Welcome back, Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 min-h-[600px]">
          <div className="p-8">
            {!activeTab ? (
              <AdminDashboard />
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminPanel;