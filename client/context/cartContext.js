import { addToCart, getCart, requestQuote, removeFromCart } from "@/services/Cart";
const { createContext, useState, useEffect, useContext } = require("react");

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
    
            console.log("Updated Cart Items:", cart);
        } catch (error) {
            console.error("Error in handleAddToCart:", error);
        }
    };
    
    const handleRemoveFromCart = async (productId) => {
        try {
            await removeFromCart(productId);
            await fetchCart(); 
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    const handleRequestQuote = async () => {
        try {
            const data = await requestQuote();
            if (data?.whatsapp_link) {
                window.open(data.whatsapp_link, "_blank");
            } else {
                console.warn("No WhatsApp link received:", data);
            }
        } catch (error) {
            console.error("Error requesting quote:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, handleAddToCart, handleRemoveFromCart, handleRequestQuote }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
