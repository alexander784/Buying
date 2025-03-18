import useProductsByCategory from "@/context/useProductsByCategory";
import Image from "next/image";

const ProductsByCategory = () => {
    const { categories, loading, error } = useProductsByCategory();
    const baseUrl = "http://127.0.0.1:8000";

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Products by Category</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {categories.map((categoryData) => (
                <div key={categoryData.category.id} className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{categoryData.category.name}</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {categoryData.products.map((product) => {
                            const imageUrl = product.image
                                ? product.image.startsWith("/media/")
                                    ? `${baseUrl}${product.image.replace("/media/media/", "/media/")}`
                                    : product.image
                                : "/fallback.jpg";

                            return (
                                <div key={product.id} className="border p-4 rounded shadow">
                                    <div className="w-full h-40 relative">
                                        <Image
                                            src={imageUrl}
                                            alt={product.name || "Product"}
                                            width={300}
                                            height={200}
                                            style={{ objectFit: "cover" }}
                                            unoptimized
                                        />
                                    </div>
                                    <div className="p-4">
                                    <h4 className="text-lg font-semibold">{product.name}</h4>
                                    <p className="text-gray-500 text-sm">{product.description}</p>
                                    <p className="text-xl font-bold mt-2">{product.price}</p>
                                    <button
                                      onClick={() => handleAddToCart(product.id)}
                                      className="mt-4 w-full bg-orange-950 text-white py-2 rounded-lg hover:bg-orange-900 transition"
                                    >
                                      Add to cart
                                     </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductsByCategory;
