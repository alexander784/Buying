import { useState } from "react";
import { useCategories } from "@/context/CategoryContext";

const ManageCategories = () => {
    const { categories, addCategory, deleteCategory } = useCategories();
    const [newCategory, setNewCategory] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newCategory.trim()) {
            addCategory(newCategory);
            setNewCategory("");
        }
    };

    return (
        <div>
            <h2>Manage Categories</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter category name"
                />
                <button type="submit">Add Category</button>
            </form>

            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.name} 
                        <button onClick={() => deleteCategory(category.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageCategories;
