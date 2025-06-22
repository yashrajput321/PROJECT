// OrderContext.jsx
import { createContext, useState } from 'react';

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    const addOrder = (orderData) => {
        const newOrder = {
            id: Date.now(), // Simple ID generation
            date: new Date().toISOString(),
            status: 'pending',
            ...orderData
        };
        setOrders(prevOrders => [...prevOrders, newOrder]);
    };

    const value = {
        orders,
        setOrders,
        addOrder
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderProvider;