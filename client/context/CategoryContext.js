import { createContext, useEffect, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = () => {
    const[categories, setCategories] = useState([]);
    const[loadConfig, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        fetchCategories();
    }, []);


    const fetchCategories = async() => {
        try {
            const res = await fetch('http://127.0.0.1:8000/categories/categories');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            setError(err.message);
        }finally{
            setLoading(false);
        }
    };
    const addCategory = async (name, token) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/categories/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) throw new Error("Failed to create category");
            const newCategory = await response.json();
            setCategories([...categories, newCategory]);
        } catch (err) {
            console.error(err);
        }
    };

    const updateCategory = async (id, name, token) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/categories/update/${id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) throw new Error("Failed to update category");
            const updatedCategory = await response.json();
            setCategories(categories.map((cat) => (cat.id === id ? updatedCategory : cat)));
        } catch (err) {
            console.error(err);
        }
    };
    const deleteCategory = async (id, token) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/categories/delete/${id}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to delete category");
            setCategories(categories.filter((cat) => cat.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <CategoryContext.Provider value={{ categories, loading, error, addCategory, updateCategory, deleteCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};
    