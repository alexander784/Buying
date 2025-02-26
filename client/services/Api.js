import axios from "axios";

export const Api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
});

Api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") { 
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});



export const loginUser = async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    return res.json();
};

export const getUser = async () => {
    const token = getToken();
    if (!token) return null;

    const res = await fetch(`${API_BASE_URL}/api/user/`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return null;
    return res.json();
};
