// src/Context/OrderContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create the OrderContext
const OrderContext = createContext();

// Provider component
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook for using the OrderContext
export const useOrders = () => {
  return useContext(OrderContext);
};