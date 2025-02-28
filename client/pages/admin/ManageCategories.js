import { useState } from "react";
import { useCategories } from "../../context/CategoryContext";

const ManageCategories = () => {
    const { categories, addCategory } = useCategories();
    const [newCategory, setNewCategory] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            alert("Admin authentication required!");
            return;
        }
        await addCategory(newCategory, token);
        setNewCategory("");
    };

    return (
        <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold">Manage Categories</h2>

            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="text"
                    placeholder="Category Name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                    Add Category
                </button>
            </form>

            <h3 className="text-xl mt-6">Existing Categories</h3>
            <ul className="mt-2">
                {categories.map((category) => (
                    <li key={category.id} className="border p-2 flex justify-between">
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageCategories;
