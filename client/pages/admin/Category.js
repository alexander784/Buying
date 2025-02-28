import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const CreateCategoryForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [token, setToken] = useState(null);

    // Ensure token is fetched properly
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        console.log("Retrieved Token:", storedToken);  // Debugging log
        setToken(storedToken);
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        setMessage(null);

        if (!token) {
            setMessage({ type: "error", text: "Authentication required. Please log in as an admin." });
            setLoading(false);
            return;
        }

        console.log("Sending request with token:", token);
        console.log("Sending data:", data);

        try {
            const response = await fetch("http://127.0.0.1:8000/categories/categories/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            console.log("Response Status:", response.status);

            if (response.status === 401) {
                setMessage({ type: "error", text: "Unauthorized. Please log in again." });
                localStorage.removeItem("token"); // Remove invalid token
                return;
            }

            const result = await response.json();
            console.log("Response JSON:", result);

            if (response.ok) {
                setMessage({ type: "success", text: "Category created successfully!" });
                reset();
            } else {
                setMessage({ type: "error", text: result?.detail || "Failed to create category." });
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setMessage({ type: "error", text: "An error occurred. Please try again." });
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create Category</h2>

            {message && (
                <div className={`p-2 mb-4 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Category Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Category name is required" })}
                        className="w-full mt-1 p-2 border rounded-lg"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" disabled={loading}>
                    {loading ? "Creating..." : "Create Category"}
                </button>
            </form>
        </div>
    );
};

export default CreateCategoryForm;
