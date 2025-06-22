// ShopContext.jsx
import { createContext, useState, useEffect } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₹";
    const delivery_fee = 80;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    
    // Initialize cart from localStorage
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Calculate total quantity of items in cart
    const getTotalCartQuantity = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Calculate total price of items in cart
    const getTotalCartPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const addToCart = (productId, size, quantity) => {
        if (!size) {
            return false;
        }

        const product = products.find(item => item._id === productId);
        
        if (!product) {
            return false;
        }

        const cartItem = {
            _id: productId,
            name: product.name,
            price: product.price,
            image: product.image[0],
            size: size,
            quantity: quantity
        };

        setCartItems(prev => {
            const existingItem = prev.find(item => 
                item._id === productId && item.size === size
            );

            if (existingItem) {
                return prev.map(item =>
                    (item._id === productId && item.size === size)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prev, cartItem];
        });

        return true;
    };

    const removeFromCart = (productId, size) => {
        setCartItems(prev => 
            prev.filter(item => !(item._id === productId && item.size === size))
        );
    };

    const updateQuantity = (productId, size, newQuantity) => {
        if (newQuantity < 1) return;

        setCartItems(prev =>
            prev.map(item =>
                (item._id === productId && item.size === size)
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalCartPrice,
        getTotalCartQuantity,
        clearCart
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;