import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/cartContext";
import Image from "next/image";

export default function ProductsPage() {
  const { products } = useProducts();
  const { handleAddToCart } = useCart();
  const baseUrl = "http://127.0.0.1:8000";

  return (
    <div className="bg-slate-100 container mx-auto p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">All Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {products.length > 0 ? (
          products.map((product) => {
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
                {/* Smaller Image Size */}
                <div className="relative w-full h-44 md:h-52 lg:h-56">
                  <Image
                    src={imageUrl}
                    alt={product.name || "Product"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                    unoptimized
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm md:text-base font-semibold">{product.name}</h3>
                  <p className="text-gray-600 text-xs md:text-sm truncate">{product.description}</p>
                  <p className="text-sm md:text-base font-bold mt-1">${product.price}</p>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="mt-3 w-full bg-orange-950 text-white py-1.5 rounded-lg hover:bg-orange-900 transition text-xs md:text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products available.</p>
        )}
      </div>
    </div>
  );
}
