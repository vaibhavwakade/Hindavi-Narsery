import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import PlantCareGuide from './pages/PlantCareGuide';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPanel from './pages/Admin/AdminPanel';
import ProductForm from './pages/Admin/ProductForm';
import AddCategory from './pages/Admin/AddCategory';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminOrders from './pages/Admin/AdminOrders';
import ManageProducts from './pages/Admin/ManageProducts';
import IndoorPlants from './pages/IndoorPlants';
import OutdoorPlants from './pages/OutdoorPlants';
import Tools from './pages/Tools';
import WhatsAppPopup from './components/WhatsAppPopup';
import AdminStaffs from './pages/Admin/AdminStaffs';
import AdminReviewPage from './pages/Admin/AdminReviewPage';
import Landscaping from './pages/Landscaping';

function App() {
  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <main className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/guide/:guideId" element={<PlantCareGuide />} />

          <Route path="/indoor-plants" element={<IndoorPlants />} />
          <Route path="/outdoor-plants" element={<OutdoorPlants />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/landscape" element={<Landscaping />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} >
            <Route path="create-product" element={<ProductForm />} />
            <Route path="manage-products" element={<ManageProducts />} />
            <Route path="add-Category" element={<AddCategory />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path='staff' element={<AdminStaffs />} />
            <Route path="reviews" element={<AdminReviewPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      {/* WhatsApp Chat Popup (appears on all pages) */}
      <WhatsAppPopup />
    </div>
  );
}

export default App;