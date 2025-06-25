// src/pages/PlaceOrder.jsx
import React, { useState,useContext } from 'react';
import Title from '../Components/Title';
import { useAddress } from '../Context/AddressContext';
import { assets } from '../assets/frontend_assets/assets';
import { ShopContext } from '../Context/ShopContext';
import Toast from '../Components/Toast';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../Context/OrderContext';

const PlaceOrder = () => {

    const navigate = useNavigate()
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const { addOrder } = useOrders();
    
   
    const triggerToast = (message) => {
        setToastMessage(message);
        setShowToast(true);
    };


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

    const { savedAddresses, selectedAddress, saveAddress, selectAddress } = useAddress();

    // All state declarations should be inside the component
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });
    const [showSavedAddresses, setShowSavedAddresses] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('cod');
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    // Calculate totals
    const subtotal = getTotalCartPrice();
    const totalQuantity = getTotalCartQuantity();
    const discountAmount = (subtotal * discount) / 100;
    const tax = subtotal * 0.08; // 8% tax
    const finalTotal = subtotal + delivery_fee + tax - discountAmount;

    const handlePaymentSelect = (method) => {
        setSelectedPayment(method);
    };

    const handlePromoCode = () => {
    const code = promoCode.toLowerCase().trim();
    let message = '';
    if (code === 'save10') {
        setDiscount(10);
        message = '10% discount applied!';
    } else if (code === 'save20') {
        setDiscount(20);
        message = '20% discount applied!';
    } else if (code === 'free15') {
        setDiscount(15);
        message = '15% discount applied!';
    } else {
        setDiscount(0);
        message = 'Invalid promo code';
    }
    triggerToast(message);
};

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveAddress = () => {
    let message = '';
    if (formData.firstName && formData.street && formData.city) {
        saveAddress(formData);
        message = 'Address saved successfully!';
    } else {
        message = 'Please fill in required fields';
    }
    triggerToast(message); // Use triggerToast to display the message
};

    const handleSelectSavedAddress = (address) => {
        setFormData({
            firstName: address.firstName || '',
            lastName: address.lastName || '',
            email: address.email || '',
            street: address.street || '',
            city: address.city || '',
            state: address.state || '',
            zipcode: address.zipcode || '',
            country: address.country || '',
            phone: address.phone || ''
        });
        selectAddress(address);
        setShowSavedAddresses(false);
    };

    // Add validation and place order function
    const validateForm = () => {
    const requiredFields = ['firstName', 'email', 'street', 'city', 'zipcode', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());

    if (missingFields.length > 0) {
        const message = `Please fill in the following required fields: ${missingFields.join(', ')}`;
        triggerToast(message);
        return false;
    }

    if (totalQuantity === 0) {
        triggerToast('Your cart is empty!');
        return false;
    }

    return true;
};

   const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const orderData = {
        address: formData,
        payment: selectedPayment,
        items: cartItems,
        total: finalTotal.toFixed(2),
        discount: discountAmount.toFixed(2),
      };

      addOrder(orderData); // Add order to the context
      triggerToast(`Order placed successfully! Total: ${currency}${finalTotal.toFixed(2)}`);

      navigate('/orders');

      clearCart();
      setFormData({
        firstName: '', lastName: '', email: '', street: '',
        city: '', state: '', zipcode: '', country: '', phone: ''
      });

    } catch (error) {
      triggerToast('Order failed. Please try again.');
      console.error('Order error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

    return (
        <div className='flex flex-col lg:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* Left Side - Delivery Information */}
            <div className='flex flex-col gap-4 w-full lg:max-w-[480px]'>
                <div className='text-xl sm:text-3xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>

                {/* Saved Addresses Display */}
                {savedAddresses.length > 0 && (
                    <div className='mb-6'>
                        <div className='flex items-center justify-between mb-3'>
                            <h3 className='text-lg font-semibold text-gray-800'>
                                Saved Addresses ({savedAddresses.length})
                            </h3>
                            <button
                                onClick={() => setShowSavedAddresses(!showSavedAddresses)}
                                className='text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors'
                            >
                                {showSavedAddresses ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        
                        {showSavedAddresses && (
                            <div className='space-y-3 max-h-60 overflow-y-auto'>
                                {savedAddresses.map((address, index) => (
                                    <div
                                        key={address.id || index}
                                        className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                                            selectedAddress?.id === address.id 
                                                ? 'border-blue-500 bg-blue-50' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => handleSelectSavedAddress(address)}
                                    >
                                        <div className='flex items-start justify-between'>
                                            <div className='flex-1'>
                                                <div className='font-medium text-gray-900 mb-1'>
                                                    {address.firstName} {address.lastName}
                                                    {selectedAddress?.id === address.id && (
                                                        <span className='ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded'>
                                                            Selected
                                                        </span>
                                                    )}
                                                </div>
                                                <div className='text-sm text-gray-600 space-y-1'>
                                                    <div>{address.street}</div>
                                                    <div>
                                                        {address.city}, {address.state} {address.zipcode}
                                                    </div>
                                                    {address.country && (
                                                        <div>{address.country}</div>
                                                    )}
                                                    {address.phone && (
                                                        <div className='text-gray-500'>
                                                            📞 {address.phone}
                                                        </div>
                                                    )}
                                                    {address.email && (
                                                        <div className='text-gray-500'>
                                                            ✉️ {address.email}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='ml-3 text-xs text-gray-400'>
                                                Click to use
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Current Selected Address Summary */}
                {selectedAddress && (
                    <div className='mb-4 p-3 bg-green-50 border border-green-200 rounded-lg'>
                        <div className='text-sm font-medium text-green-800 mb-1'>
                            ✅ Using Saved Address:
                        </div>
                        <div className='text-sm text-green-700'>
                            {selectedAddress.firstName} {selectedAddress.lastName} - {selectedAddress.street}, {selectedAddress.city}
                        </div>
                    </div>
                )}

                {/* Form Fields */}
                <div className='space-y-4'>
                    <div className='flex gap-3'>
                        <input
                            type="text"
                            name="firstName"
                            placeholder='First name *'
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder='Last name'
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        placeholder='Email address *'
                        value={formData.email}
                        onChange={handleInputChange}
                        className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        required
                    />

                    <input
                        type="text"
                        name="street"
                        placeholder='Street address *'
                        value={formData.street}
                        onChange={handleInputChange}
                        className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        required
                    />

                    <div className='flex gap-3'>
                        <input
                            type="text"
                            name="city"
                            placeholder='City *'
                            value={formData.city}
                            onChange={handleInputChange}
                            className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                            required
                        />
                        <input
                            type="text"
                            name="state"
                            placeholder='State'
                            value={formData.state}
                            onChange={handleInputChange}
                            className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        />
                    </div>

                    <div className='flex gap-3'>
                        <input
                            type="text"
                            name="zipcode"
                            placeholder='Zipcode *'
                            value={formData.zipcode}
                            onChange={handleInputChange}
                            className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                            required
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder='Country'
                            value={formData.country}
                            onChange={handleInputChange}
                            className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        />
                    </div>

                    <input
                        type="tel"
                        name="phone"
                        placeholder='Phone number *'
                        value={formData.phone}
                        onChange={handleInputChange}
                        className='border border-gray-300 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        required
                    />
                </div>

                <div className='text-xs text-gray-500 mt-2'>
                    * Required fields
                </div>

                {/* Save Address Button */}
                <button
                    onClick={handleSaveAddress}
                    className='bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors mt-4 flex items-center gap-2'
                >
                    💾 Save This Address
                </button>
            </div>

            {/* Right Side - Order Summary */}
            <div className='w-full lg:max-w-[400px]'>
                <div className='bg-gray-50 p-6 rounded-lg shadow-sm sticky top-4'>
                    <Title text1={'ORDER'} text2={'SUMMARY'} />
                    
                    {/* Cart Items Preview */}
                    <div className='mb-6'>
                        <div className='max-h-32 overflow-y-auto space-y-2'>
                            {cartItems.slice(0, 3).map((item) => (
                                <div key={item._id} className='flex items-center gap-3 text-sm'>
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className='w-10 h-10 object-cover rounded'
                                    />
                                    <div className='flex-1'>
                                        <div className='font-medium text-gray-800 truncate'>{item.name}</div>
                                        <div className='text-gray-600'>Qty: {item.quantity}</div>
                                    </div>
                                    <div className='font-semibold text-gray-800'>
                                        {currency}{(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                            {cartItems.length > 3 && (
                                <div className='text-sm text-gray-500 text-center py-2'>
                                    +{cartItems.length - 3} more items
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Promo Code Section */}
                    <div className="mb-6 p-3 bg-white rounded border">
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                placeholder="Enter promo code"
                                className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                            <button
                                onClick={handlePromoCode}
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                        <div className="text-xs text-gray-500">
                            Try: SAVE10, SAVE20, or FREE15
                        </div>
                    </div>

                    {/* Order Totals */}
                    <div className='space-y-3 mb-6'>
                        <div className='flex justify-between text-gray-700'>
                            <span>Items ({getTotalCartQuantity()}):</span>
                            <span className="font-medium">{currency}{subtotal.toFixed(2)}</span>
                        </div>
                        
                        <div className='flex justify-between text-gray-700'>
                            <span>Delivery Fee:</span>
                            <span className="font-medium">
                                {delivery_fee === 0 ? (
                                    <span className="text-green-600">Free</span>
                                ) : (
                                    `${currency}${delivery_fee.toFixed(2)}`
                                )}
                            </span>
                        </div>

                        <div className='flex justify-between text-gray-700'>
                            <span>Tax (8%):</span>
                            <span className='font-medium'>{currency}{tax.toFixed(2)}</span>
                        </div>

                        {discount > 0 && (
                            <div className='flex justify-between text-green-700'>
                                <span>Discount ({discount}%):</span>
                                <span className='font-medium'>- {currency}{discountAmount.toFixed(2)}</span>
                            </div>
                        )}

                        <hr />

                        <div className='flex justify-between text-lg text-gray-900 font-semibold'>
                            <span>Total:</span>
                            <span>{currency}{finalTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div className='mb-6'>
                        <div className='mb-2 text-sm font-medium text-gray-700'>Select Payment Method:</div>
                        <div className='flex gap-4'>
                            <button
                                onClick={() => handlePaymentSelect('stripe')}
                                className={`flex-1 px-3 py-2 text-sm rounded border ${
                                    selectedPayment === 'stripe'
                                        ? 'border-blue-500 bg-blue-100'
                                        : 'border-gray-300'
                                }`}
                            >
                                <img src={assets.stripe_logo} alt="" />
                            </button>
                            <button
                                onClick={() => handlePaymentSelect('cod')}
                                className={`flex-1 px-3 py-2 text-sm rounded border ${
                                    selectedPayment === 'cod'
                                        ? 'border-blue-500 bg-blue-100'
                                        : 'border-gray-300'
                                }`}
                            >
                                Cash on Delivery
                            </button>
                            <button
                                onClick={() => handlePaymentSelect('razorpay')}
                                className={`flex-1 px-3 py-2 text-sm rounded border ${
                                    selectedPayment === 'razorpay'
                                        ? 'border-blue-500 bg-blue-100'
                                        : 'border-gray-300'
                                }`}
                            >
                                <img src={assets.razorpay_logo} alt="" />
                            </button>
                        </div>
                    </div>

                    {/* Place Order Button */}
                    <button
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className={`w-full py-2 px-4 text-white text-sm font-medium rounded ${
                            isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                        } transition-colors`}
                    >
                        {isProcessing ? 'Processing...' : 'Place Order'}
                    </button>
                </div>
            </div>
            {showToast && (
            <Toast
                message={toastMessage}
                show={showToast}
                onHide={() => setShowToast(false)}
            />
        )}
        </div>
    );
};

export default PlaceOrder;
