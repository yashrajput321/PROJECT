// src/pages/PlaceOrder.js
import React, { useState } from 'react';
import Title from '../Components/Title';
import { useAddress } from '../Context/AddressContext';

const PlaceOrder = () => {
    const { savedAddresses, selectedAddress, saveAddress, selectAddress } = useAddress();
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

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveAddress = () => {
        if (formData.firstName && formData.street && formData.city) {
            saveAddress(formData);
            alert('Address saved successfully!');
        } else {
            alert('Please fill in required fields');
        }
    };

    const handleSelectSavedAddress = (address) => {
        setFormData(address);
        selectAddress(address);
        setShowSavedAddresses(false);
    };

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* Left Side - Delivery Information */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-3xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>

                {/* Saved Addresses Section */}
                {savedAddresses.length > 0 && (
                    <div className='mb-4'>
                        <button
                            onClick={() => setShowSavedAddresses(!showSavedAddresses)}
                            className='text-sm text-blue-600 hover:text-blue-800 underline mb-2'
                        >
                            {showSavedAddresses ? 'Hide' : 'Use'} Saved Addresses ({savedAddresses.length})
                        </button>
                        
                        {showSavedAddresses && (
                            <div className='border border-gray-200 rounded p-3 max-h-40 overflow-y-auto'>
                                {savedAddresses.map((address) => (
                                    <div
                                        key={address.id}
                                        onClick={() => handleSelectSavedAddress(address)}
                                        className='cursor-pointer p-2 hover:bg-gray-100 rounded border-b last:border-b-0'
                                    >
                                        <div className='text-sm font-medium'>
                                            {address.firstName} {address.lastName}
                                        </div>
                                        <div className='text-xs text-gray-600'>
                                            {address.street}, {address.city}, {address.state} {address.zipcode}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Form Fields */}
                <div className='flex gap-3'>
                    <input
                        type="text"
                        name="firstName"
                        placeholder='First name'
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder='Last name'
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    />
                </div>

                <input
                    type="email"
                    name="email"
                    placeholder='Email address'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                />

                <input
                    type="text"
                    name="street"
                    placeholder='Street'
                    value={formData.street}
                    onChange={handleInputChange}
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                />

                <div className='flex gap-3'>
                    <input
                        type="text"
                        name="city"
                        placeholder='City'
                        value={formData.city}
                        onChange={handleInputChange}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder='State'
                        value={formData.state}
                        onChange={handleInputChange}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    />
                </div>

                <div className='flex gap-3'>
                    <input
                        type="text"
                        name="zipcode"
                        placeholder='Zipcode'
                        value={formData.zipcode}
                        onChange={handleInputChange}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder='Country'
                        value={formData.country}
                        onChange={handleInputChange}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    />
                </div>

                <input
                    type="text"
                    name="phone"
                    placeholder='Phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                />

                {/* Save Address Button */}
                <button
                    onClick={handleSaveAddress}
                    className='bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors'
                >
                    Save This Address
                </button>
            </div>

            {/* Right Side - Order Summary */}
            <div className='mt-8 sm:mt-0'>
                {/* Add your cart totals and payment methods here */}
            </div>
        </div>
    );
};

export default PlaceOrder;