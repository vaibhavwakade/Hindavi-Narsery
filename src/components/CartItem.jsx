import { useContext, useState } from 'react';
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartCountContext } from '../context/cartCount';

function CartItem({ item, onUpdate, onRemove }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const {setCartCount} = useContext(CartCountContext)

  const handleUpdate = async (newQuantity) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/update`,
        { productId: item.product.id, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuantity(newQuantity);
      onUpdate();
      toast.success('Cart updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update cart');
    }
  };

  const handleRemove = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/remove/${item.product.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onRemove();
      setCartCount((prev)=> prev - 1);
      toast.success('Item removed from cart');
    } catch (error) {
      console.log({ error })
      toast.error(error.response?.data?.message || 'Failed to remove item');
    }
  };

  return (
    <div className="flex items-center border-b py-4">
      <img
        src={item.product?.imageUrls[0] || 'https://via.placeholder.com/100'}
        alt={item.product?.name}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold">{item.product?.name}</h3>
        <p className="text-gray-600">₹{parseFloat(item.product.price || 0).toFixed(2)}</p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => handleUpdate(quantity - 1)}
            disabled={quantity <= 1}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            -
          </button>
          <span className="mx-2">{quantity}</span>
          <button
            onClick={() => handleUpdate(quantity + 1)}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>
      </div>
      <button onClick={handleRemove} className="text-red-500 hover:text-red-700">
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}

export default CartItem;
