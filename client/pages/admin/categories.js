import { useState, useEffect } from "react";
import { useCategories } from "@/context/CategoryContext";

const CategoriesPage = () => {
    const { categories } = useCategories();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/products/")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold">Products by Category</h1>
            {categories.map((category) => (
                <div key={category.id} className="mt-4">
                    <h2 className="text-2xl">{category.name}</h2>
                    <ul>
                        {products
                            .filter((product) => product.category === category.name)
                            .map((product) => (
                                <li key={product.id} className="border p-2">
                                    {product.name} - ${product.price}
                                </li>
                            ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default CategoriesPage;
