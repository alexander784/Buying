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
            const res = await fetch('');
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
    
}