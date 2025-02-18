import config from '@/postcss.config.mjs';
import axios from 'axios';
// import { headers } from 'next/headers';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/";

export const Api = axios.create({
    baseURL:API_BASE_URL,
    headers: {
        "Content-Type":"application/json",
    },
});
    // Handle Tokens for JWT
Api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;

    }
    return config;
})
