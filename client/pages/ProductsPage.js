import { getProducts } from "@/services/Products";

export default function ProductsPage({ products = [] }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
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
