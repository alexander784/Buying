import { useEffect, useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8000/";

const useProductsByCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API_BASE_URL}categories/categories/get_products_by_category/`, {
                    headers: token
                        ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
                        : {}, 
                });

                if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);

                const data = await res.json();
                setCategories(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsByCategory();
    }, []); 

    return { categories, loading, error };
};

export default useProductsByCategory;
