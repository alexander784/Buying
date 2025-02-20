import { useCart } from "@/context/cartContext";
import { getProducts } from "@/services/Products";
import Image from "next/image";

export default function ProductsPage({ products }) {

  const { handleAddToCart } = useCart();
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:*:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
          <div className="w-full h-48 relative">
            <Image 
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
            <p className="text-xl font-bold mt-2">{product.price}</p>

            <button
              onClick={() => handleAddToCart(product.id)}
              className="mt-4 w-full bg-orange-950 text-white py-2 rounded-lg hover:bg-orange-900 transition"
              >
              Add to cart
            </button>
          </div>
          </div>
      ))}
    </div>
    </div>

  );
}

export async function getServerSideProps() {
  try {
    const products = await getProducts();

    return {
      props: { products: products || [] },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: { products: [] }, 
    };
  }
}
