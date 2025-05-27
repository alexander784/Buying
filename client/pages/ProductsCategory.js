import useProductsByCategory from "@/context/useProductsByCategory";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import { HiOutlineShoppingCart } from "react-icons/hi";

const ProductsByCategory = () => {
  const {  handleRequestQuote } = useCart();
  const { categories, loading, error } = useProductsByCategory();
  const { handleAddToCart } = useCart();
  const baseUrl = "http://127.0.0.1:8000";

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Shop by Category</h2>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {categories.map((categoryData) => (
        <div key={categoryData.category.id} className="mb-6">
          <h3 className="text-lg md:text-xl font-semibold mb-2">{categoryData.category.name}</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {categoryData.products.map((product) => {
              const imageUrl = product.image
                ? product.image.startsWith("/media/")
                  ? `${baseUrl}${product.image.replace("/media/media/", "/media/")}`
                  : product.image
                : "/fallback.jpg";

              return (
                <div
                  key={product.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 p-2"
                >
                  {/* Uniform Image Sizing */}
                  <div className="relative w-full h-44 md:h-52 lg:h-56">
                    <Image
                      src={imageUrl}
                      alt={product.name || "Product"}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-t-lg"
                      unoptimized
                    />
                  </div>
                   <div className="p-3">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm md:text-base font-semibold">{product.name}</h3>
                        <div className="flex w-8 h-8 justify-center bg-black rounded-lg">
                        <button onClick={() => handleAddToCart(product.id)} className="text-white hover:text-orange-800">
                          <HiOutlineShoppingCart className="w-5 h-5" />
                        </button>
                        </div>
                      </div>
  
                      <p className="text-gray-600 text-xs md:text-sm truncate">{product.description}</p>
                      {/* <p className="text-sm md:text-base font-bold mt-1">${product.price}</p> */}
  
                      <button 
                        onClick={handleRequestQuote}
                        className="mt-4 w-full bg-orange-950 text-white py-2 rounded-lg transition"
                      >
                        Order Via Whatsapp
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
