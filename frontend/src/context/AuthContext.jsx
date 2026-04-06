import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    const validateToken = useCallback(async () => {
        try {
            await API.get("/auth/profile");
            return true;
        } catch (error) {
            if (error.response?.status === 401) {
                logout();
                navigate("/login");
            }
            return false;
        }
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        if (token && userData) {
            validateToken().then((isValid) => {
                if (isValid) {
                    setUser(JSON.parse(userData));
                    fetchCart();
                }
            });
        }
    }, [validateToken]);


    const fetchCart = async () => {
        try {
            const { data } = await API.get("/cart");
            setCart(data.data);
        } catch (error) {
            if (error.response?.status === 401) {
                logout();
                navigate("/login");
            } else {
                console.error("Error fetching cart:", error);
            }
        }
    };


    const addToCart = async (productId, quantity = 1) => {
        try {
            const { data } = await API.post("/cart", { productId, quantity });
            setCart(data.data);
            return { success: true };
        } catch (error) {
            if (error.response?.status === 401) {
                logout();
                navigate("/login");
                return { success: false, message: "Session expired. Please login again." };
            }
            console.error("Error adding to cart:", error);
            return { success: false, message: error.response?.data?.message || "Failed to add to cart" };
        }
    };


    const removeFromCart = async (productId) => {
        try {
            const { data } = await API.delete(`/cart/${productId}`);
            setCart(data.data);
            return { success: true };
        } catch (error) {
            if (error.response?.status === 401) {
                logout();
                navigate("/login");
                return { success: false, message: "Session expired. Please login again." };
            }
            console.error("Error removing from cart:", error);
            return { success: false, message: error.response?.data?.message || "Failed to remove from cart" };
        }
    };

    const updateCartItem = async (productId, quantity) => {
        try {
            const { data } = await API.put(`/cart/${productId}`, { quantity });
            setCart(data.data);
            return { success: true };
        } catch (error) {
            if (error.response?.status === 401) {
                logout();
                navigate("/login");
                return { success: false, message: "Session expired. Please login again." };
            }
            console.error("Error updating cart:", error);
            return { success: false, message: error.response?.data?.message || "Failed to update cart" };
        }
    };

    const clearCart = async () => {
        try {
            await API.delete("/cart");
            setCart([]);
            return { success: true };
        } catch (error) {
            if (error.response?.status === 401) {
                logout();
                navigate("/login");
                return { success: false, message: "Session expired. Please login again." };
            }
            console.error("Error clearing cart:", error);
            return { success: false, message: error.response?.data?.message || "Failed to clear cart" };
        }
    };


    const login = (token, userData) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        fetchCart();
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setCart([]);
    };

    const isSeller = user?.role === "seller";
    const isAdmin = user?.role === "admin";
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout, 
            isSeller, 
            isAdmin, 
            cart, 
            cartCount,
            addToCart, 
            removeFromCart, 
            updateCartItem, 
            clearCart,
            fetchCart 
        }}>
            {children}
        </AuthContext.Provider>
    );
};
