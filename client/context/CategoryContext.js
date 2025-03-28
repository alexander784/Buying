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
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("access_token");
            if (storedToken) {
                setToken(storedToken);
            }
        }
    }, []);

    useEffect(() => {
        if (token) {
            fetchCategories();
        }
    }, [token]);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}categories/categories/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeaders(),
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch categories: ${response.status}`);
            }

            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
        setLoading(false);
    };

    const addCategory = async (name) => {
        if (!token) {
            alert("Authentication required! Please log in as an admin.");
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
                credentials: "include",
                body: JSON.stringify({ name }),
            });

            const resData = await response.json();
            console.log('Response data:', resData);

            if (!response.ok) {
                throw new Error(`Failed to add category: ${response.status}`);
            }

            fetchCategories(); 
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const deleteCategory = async (categoryId) => {
        if (!token) {
            alert("Authentication required! Please log in as an admin.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}categories/categories/delete/${categoryId}/`, {
                method: "DELETE",
                headers: {
                    ...getAuthHeaders(),
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`Failed to delete category: ${response.status}`);
            }

            fetchCategories(); 
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <CategoryContext.Provider value={{ categories, loading, addCategory, deleteCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategories = () => useContext(CategoryContext);
