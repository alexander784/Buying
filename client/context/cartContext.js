import { getCart } from "@/services/Cart";

const { createContext, useState, useEffect } = require("react");


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
    
}