// src/context/AddressContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
export const AddressContext = createContext();

// Custom hook for easier usage
export const useAddress = () => {
    const context = useContext(AddressContext);
    if (!context) {
        throw new Error('useAddress must be used within an AddressProvider');
    }
    return context;
};

// Create a provider component
const AddressProvider = ({ children }) => {
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const saveAddress = (address) => {
        const newAddress = {
            id: Date.now(), // Simple ID generation
            ...address,
            createdAt: new Date().toISOString()
        };
        setSavedAddresses(prevAddresses => [...prevAddresses, newAddress]);
        return newAddress;
    };

    const updateAddress = (id, updatedAddress) => {
        setSavedAddresses(prevAddresses =>
            prevAddresses.map(address =>
                address.id === id ? { ...address, ...updatedAddress } : address
            )
        );
    };

    const deleteAddress = (id) => {
        setSavedAddresses(prevAddresses =>
            prevAddresses.filter(address => address.id !== id)
        );
        if (selectedAddress?.id === id) {
            setSelectedAddress(null);
        }
    };

    const selectAddress = (address) => {
        setSelectedAddress(address);
    };

    return (
        <AddressContext.Provider value={{
            savedAddresses,
            selectedAddress,
            saveAddress,
            updateAddress,
            deleteAddress,
            selectAddress
        }}>
            {children}
        </AddressContext.Provider>
    );
};

export default AddressProvider;