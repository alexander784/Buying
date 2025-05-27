import { createContext, useState, useEffect, useContext } from "react";

const API_BASE_URL = "http://127.0.0.1:8000/";
const CategoryContext = createContext();

const getAuthHeaders = () => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");
        return token ? { Authorization: `Bearer ${token}` } : {};
    }
    return {};
};

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}categories/categories/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeaders()
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch categories: ${response.status}`);
            }

            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addCategory = async (name) => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setError("Authentication required! Please log in as an admin.");
            return;
        }
        console.log("Sending category to API:", name);

        try {
            const response = await fetch(`${API_BASE_URL}categories/categories/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeaders(),
                },
                body: JSON.stringify({ name }),
            });

            const resData = await response.json();
            console.log("Response data:", resData);

            if (!response.ok) {
                throw new Error(`Failed to add category: ${response.status}`);
            }

            fetchCategories();
        } catch (error) {
            console.error("Error adding category:", error);
            setError(error.message);
        }
    };

    const deleteCategory = async (categoryId) => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setError("Authentication required! Please log in as an admin.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}categories/categories/delete/${categoryId}/`, {
                method: "DELETE",
                headers: {
                    ...getAuthHeaders(),
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete category: ${response.status}`);
            }

            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
            setError(error.message);
        }
    };

    return (
        <CategoryContext.Provider value={{ categories, loading, error, addCategory, deleteCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategories = () => useContext(CategoryContext);