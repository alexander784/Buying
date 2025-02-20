const API_BASE_URL = "http://127.0.0.1:8000/"


export const addToCart = async(productId) => {
    const res = await fetch(`${API_BASE_URL}/cart/add/${productId}/`, {
        method:'POST',
        credentials: 'include',
    });
    return res.json();
};

export const getCart = async () => {
    const res = await fetch(`${API_BASE_URL}/cart/`, {
        method: 'GET',
        credentials:'include',

    });
    return res.json();
};

export const requestQuote = async () => {
    const res = await fetch(`${API_BASE_URL}/cart/request-quote/`, {
        method: 'GET',
        credentials:' include',
    });
    return res.json();
};