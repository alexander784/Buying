import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    image: null,
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      for (const key in productData) {
        formData.append(key, productData[key]);
      }

      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Unauthorized: No access token found.");
      }

      await axios.post(`${API_URL}/products/add/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product added successfully!");
      router.push("/admin/ProductsPage");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={productData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={productData.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Category Selection Dropdown */}
        <select
          name="category_id"
          value={productData.category_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* File Upload */}
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
