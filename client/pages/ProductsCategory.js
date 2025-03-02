import useProductsByCategory from "@/context/useProductsByCategory";

const ProductsByCategory = () => {
    const { categories, loading, error } = useProductsByCategory();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Products by Category</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {categories.map((categoryData) => (
                <div key={categoryData.category.id} className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{categoryData.category.name}</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {categoryData.products.map((product) => (
                            <div key={product.id} className="border p-4 rounded shadow">
                                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                                <h4 className="text-lg font-semibold">{product.name}</h4>
                                <p className="text-gray-500">{product.description}</p>
                                <p className="text-blue-600 font-bold">${product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductsByCategory;
