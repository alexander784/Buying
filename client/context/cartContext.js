import { addToCart, getCart, requestQuote } from "@/services/Cart";

const { createContext, useState, useEffect, useContext } = require("react");


const CartContext = createContext();

export const CartProvider = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        const data = await getCart();
        setCart(data.cart);
    };

    const handleAddToCart = async(productId) => {
        await addToCart(productId);
        fetchCart();
    };

    const handleRemoveFromCart = async(productId) => {
        await removeFromCart(productId);
        fetchCart();
    };
    const handleRequestQuote = async () => {
        const data = await requestQuote();
        if(data.whatsapp_link) {
            window.open(data.whatsapp_link, "_blank");
        }
    };

    return (
        <CartContext.Provider
        value={{ cart, handleAddToCart, handleRemoveFromCart, handleRequestQuote}}
        >
            {children}
        </CartContext.Provider>
    );

};

export const useCart = () => useContext(CartContext);