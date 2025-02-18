import { Api } from "./Api"



export const getProducts = async () => {
    try {
        const response = await Api.get("/products/");
        return response.data;

    }catch(error) {
        console.error("Error fetching products:". error);
        throw error;
    }
};


export const getProductBYId = async (id) => {
    try {
        const response = await Api.get(`/products/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
}