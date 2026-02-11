import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard, ShoppingBag } from 'lucide-react';
import CartItem from '../components/CartItem';
import LoadingSpinner from '../components/common/LoadingSpinner';

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingOrder, setProcessingOrder] = useState(false);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to view cart');
        navigate('/login');
        return;
      }
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error(error.response?.data?.message || 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [navigate]);

  const handleCreateOrder = async () => {
    if (!window.confirm('Are you sure you want to place this order?')) {
      return;
    }

    setProcessingOrder(true);
    try {
      const token = localStorage.getItem('token');
      const items = cart.cart.items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
        { items },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Order created successfully');
      setCart(null); // Clear cart locally
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error(error.response?.data?.message || 'Failed to create order');
    } finally {
      setProcessingOrder(false);
    }
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!cart || cart.cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <ShoppingBag className="mx-auto h-24 w-24 text-gray-300 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-lg text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <button
            onClick={handleContinueShopping}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    const subtotal = cart.cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const tax = subtotal * 0.1; // 10% tax
    return (subtotal + tax).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleContinueShopping}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </button>
          <div className="flex items-center">
            <ShoppingCart className="mr-3 h-8 w-8 text-gray-700" />
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {cart.cart.items.length} {cart.cart.items.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {cart.cart.items.map((item) => (
                  <div key={item.product.id} className="p-6">
                    <CartItem
                      item={item}
                      onUpdate={fetchCart}
                      onRemove={fetchCart}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {/* Item breakdown */}
                  <div className="space-y-2">
                    {cart.cart.items.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.product?.name} × {item.quantity}
                        </span>
                        <span className="text-gray-900">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">₹{cart.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span className="text-gray-900">₹{(cart.total * 0.1).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-semibold text-gray-900">
                        ₹{calculateTotal()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCreateOrder}
                  disabled={processingOrder}
                  className="w-full mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {processingOrder ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Place Order
                    </>
                  )}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Secure checkout powered by SSL encryption
                  </p>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <div className="text-center">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Why shop with us?</h3>
                <div className="space-y-1 text-xs text-blue-700">
                  <p>✓ Free shipping on all orders</p>
                  <p>✓ 30-day money-back guarantee</p>
                  <p>✓ Secure payment processing</p>
                  <p>✓ 24/7 customer support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;