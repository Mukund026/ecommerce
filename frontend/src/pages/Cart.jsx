import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, removeFromCart, updateCartItem, clearCart, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cart data is already fetched via AuthContext
    setLoading(false);
  }, [cart]);

  const handleRemove = async (productId) => {
    toast.success("Item removed from cart", {
      icon: "🗑️",
    });
    await removeFromCart(productId);
  };

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    await updateCartItem(productId, quantity);
  };

  const handleClearCart = async () => {
    toast.success("Cart cleared", {
      icon: "🗑️",
    });
    await clearCart();
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-500">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          <p className="text-gray-500 mb-4">Please login to view your cart</p>
          <Link to="/login" className="bg-blue-500 text-white px-6 py-2 rounded">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link to="/" className="bg-blue-500 text-white px-6 py-2 rounded">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow">
            {cart.map((item) => (
              <div key={item.product?._id} className="flex justify-between items-center border-b py-4 last:border-b-0">
                <div className="flex gap-4 items-center">
                  {item.product?.image && (
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-bold">{item.product?.name}</h3>
                    <p className="text-gray-600">${item.product?.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                  
                  <p className="font-bold w-20 text-right">
                    ${(item.product?.price * item.quantity).toFixed(2)}
                  </p>
                  
                  <button
                    onClick={() => handleRemove(item.product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Total:</h3>
                <p className="text-2xl font-bold text-green-600">${calculateTotal().toFixed(2)}</p>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handleClearCart}
                  className="bg-red-500 text-white px-6 py-2 rounded"
                >
                  Clear Cart
                </button>
                <button className="bg-green-500 text-white px-6 py-2 rounded">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

