import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, removeFromCart, updateCartItem, clearCart, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [cart]);

  const handleRemove = async (productId) => {
    toast.success("Item removed from cart", { icon: "🗑️" });
    await removeFromCart(productId);
  };

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    await updateCartItem(productId, quantity);
  };

  const handleClearCart = async () => {
    toast.success("Cart cleared", { icon: "🗑️" });
    await clearCart();
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + ((item.product?.price || 0) * item.quantity), 0);
    const tax = subtotal * 0.18;
    const shipping = cart.length > 0 ? 49 : 0;
    const total = subtotal + tax + shipping;
    return { subtotal, tax, shipping, total };
  };

  const totals = calculateTotal();

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
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="relative flex-shrink-0">
                    <img 
                      src={item.product?.image || 'https://via.placeholder.com/96x96/6B7280/FFFFFF?text=?'}
                      alt={item.product?.name || 'Product'}
                      className="w-24 h-24 object-cover rounded-xl shadow-md"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/96x96/6B7280/FFFFFF?text=?';
                      }}
                    />
                    {item.product?.originalPrice && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                        {Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight hover:text-orange-600 transition-colors">
                      {item.product?.name || 'Product Name'}
                    </h3>
                    
                    <div className="flex items-center gap-1">
                      <div className="flex text-sm text-orange-500">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 fill-current ${i < Math.floor(item.product?.rating || 0) ? 'text-orange-500' : 'text-gray-300'}`} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-1.512a1 1 0 00-1.175 0l-2.8 1.512c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">
                        ({item.product?.reviews || 0} Reviews)
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-lg font-bold text-gray-900">
                        ₹{((item.product?.price || 0) * item.quantity).toFixed(0)}
                      </div>
                      {item.product?.originalPrice && (
                        <>
                          <div className="text-sm text-gray-500 line-through">
                            ₹{(item.product.originalPrice * item.quantity).toFixed(0)}
                          </div>
                          <div className="text-sm font-bold text-green-600">
                            Save ₹{((item.product.originalPrice - item.product.price) * item.quantity).toFixed(0)}
                          </div>
                        </>
                      )}
                    </div>
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
                    ${((item.product?.price || 0) * item.quantity).toFixed(2)}
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
                <p className="text-2xl font-bold text-green-600">₹{totals.total.toFixed(0)}</p>
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
