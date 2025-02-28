const API_BASE_URL = "http://127.0.0.1:8000/";

const getAuthHeaders = () => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");
        return token ? { Authorization: `Bearer ${token}` } : {};
    }
    return {};
};

export const addToCart = async (productId) => {
    try {
        const res = await fetch(`${API_BASE_URL}cart/cart/add/${productId}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
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
        const res = await fetch(`${API_BASE_URL}cart/cart/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            credentials: "include",
        });
        if( res.status == 401) {
            console.warn('User not logged in');
            return {error: 'Unauthorized', cart: []};
        }

        if (!res.ok) {
            throw new Error(`Failed to fetch cart: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching cart:", error);
        return { error: error.message, cart: [] };
    }
};

export const removeFromCart = async (productId) => {
    try {
        const res = await fetch(`${API_BASE_URL}cart/cart/remove/${productId}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error(`Failed to remove from cart: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error removing from cart:", error);
        return { error: error.message };
    }
};


export const requestQuote = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}cart/cart/request_quote/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
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
