import { addToCart, getCart, requestQuote, removeFromCart } from "@/services/Cart";
import { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        console.log("Fetching updated cart...");
        try {
            const data = await getCart();
    
            if (!data || !data.cart) {
                console.warn("Cart is missing or invalid:", data);
                setCart([]); 
                return;
            }
    
            setCart(data.cart);
            console.log("Cart updated:", data.cart); 
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    useEffect(() => {
        fetchCart(); 
    }, []);

    const handleAddToCart = async (productId) => {
        try {
            const response = await addToCart(productId);
    
            if (response.error) {
                console.error("Error adding item to cart:", response.error);
                return;
            }
    
            console.log("Item successfully added to cart:", response);
            
            await fetchCart(); 
        } catch (error) {
            console.error("Error in handleAddToCart:", error);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        console.log("Removing item from cart. Product ID:", productId); 
    
        if (!productId) {
            console.error("Error: productId is undefined!");
            return;
        }
    
        try {
            const response = await removeFromCart(productId);
            console.log("Item removed:", response);
            fetchCart();
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };
    

    const handleRequestQuote = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/cart/cart/request_quote/");
            const text = await response.text();

            const data = JSON.parse(text);
    
            if (data?.whatsapp_link) {
                window.open(data.whatsapp_link, "_blank");
            } else {
                console.warn("No WhatsApp link received:", data);
                alert("Unable to generate a WhatsApp link. Please try again.");
            }
        } catch (error) {
            console.error("Error requesting quote:", error);
            alert("An error occurred while requesting a quote. Please check your connection and try again.");
        }
    };
    

    return (
        <CartContext.Provider value={{ cart, handleAddToCart, handleRemoveFromCart, handleRequestQuote }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
