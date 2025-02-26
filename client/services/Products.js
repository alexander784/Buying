import { Api } from "./Api";

export const getProducts = async () => {
    try {
        const res = await Api.get("http://127.0.0.1:8000/products/products/");
        console.log("API Response:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const getProductById = async (id) => {
    try {
        const res = await Api.get(`/products/${id}/`);
        return res.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};

