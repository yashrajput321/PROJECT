// Cart.jsx
import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link,useNavigate } from 'react-router-dom';
import { assets } from '../assets/frontend_assets/assets';

const Cart = () => {

    const navigate = useNavigate();

    const { 
        cartItems, 
        currency, 
        removeFromCart, 
        updateQuantity, 
        getTotalCartPrice,
        getTotalCartQuantity,
        delivery_fee,
        clearCart 
    } = useContext(ShopContext);

    // Handle checkout
    const handleCheckout = () => {
        navigate('/place-order');
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                <Link 
                    to="/collection" 
                    className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Shopping Cart ({getTotalCartQuantity()} items)</h1>
                <button 
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 font-medium"
                >
                    Clear Cart
                </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div 
                            key={`${item._id}-${item.size}`} 
                            className="flex items-center gap-4 border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <Link to={`/product/${item._id}`} className="w-24 h-24 flex-shrink-0">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </Link>
                            
                            <div className="flex-grow">
                                <Link 
                                    to={`/product/${item._id}`}
                                    className="font-medium hover:text-gray-600"
                                >
                                    {item.name}
                                </Link>
                                <p className="text-gray-500 text-sm">Size: {item.size}</p>
                                <p className="font-medium text-lg mt-1">{currency}{item.price}</p>
                                
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center border rounded">
                                        <button 
                                            onClick={() => updateQuantity(
                                                item._id, 
                                                item.size, 
                                                item.quantity - 1
                                            )}
                                            className="px-3 py-1 hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <span className="px-3 min-w-[40px] text-center">
                                            {item.quantity}
                                        </span>
                                        <button 
                                            onClick={() => updateQuantity(
                                                item._id, 
                                                item.size, 
                                                item.quantity + 1
                                            )}
                                            className="px-3 py-1 hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                    
                                    <img onClick={() => removeFromCart(item._id, item.size)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="bin" />
                                
                                </div>
                            </div>
                            
                            <div className="text-right">
                                <p className="font-medium text-lg">
                                    {currency}{item.price * item.quantity}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal ({getTotalCartQuantity()} items)</span>
                            <span>{currency}{getTotalCartPrice()}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Delivery Fee</span>
                            <span>{currency}{delivery_fee}</span>
                        </div>
                        <div className="border-t pt-3 mt-3">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>{currency}{getTotalCartPrice() + delivery_fee}</span>
                            </div>
                            <p className="text-gray-500 text-sm mt-1">
                                Including GST
                            </p>
                        </div>
                    </div>

                    <button 
                        className="w-full bg-black text-white py-3 rounded-md mt-6 
                                 hover:bg-gray-800 transition-colors font-medium"
                        onClick={handleCheckout}
                    >
                        Proceed to Checkout
                    </button>

                    <Link 
                        to="/collection"
                        className="block text-center mt-4 text-gray-600 hover:text-black"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;