import { useEffect, useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8000/";

const useProductsByCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}categories/categories/get_products_by_category/`);
                if (!res.ok) throw new Error("Failed to fetch products");

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
