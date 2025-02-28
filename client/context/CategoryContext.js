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
    
}