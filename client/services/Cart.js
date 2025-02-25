const API_BASE_URL = "http://127.0.0.1:8000/";

export const addToCart = async (productId) => {
    try {
        const res = await fetch(`${API_BASE_URL}/cart/cart/add/${productId}/`, {
            method: "POST",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error(`Failed to add to cart: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error adding to cart:", error);
        return { error: error.message };
    }
};

export const getCart = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/cart/cart/`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch cart: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching cart:", error);
        return { error: error.message, cart: [] }; 
    }
};

export const requestQuote = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/cart/cart/request_quote/`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error(`Failed to request quote: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error requesting quote:", error);
        return { error: error.message };
    }
};
