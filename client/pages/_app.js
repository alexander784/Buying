import Layout from "@/components/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/cartContext";
import { ProductsProvider } from "@/context/ProductsContext";
import "@/styles/globals.css";
import CategoriesPage from "./admin/categories";
import { CategoryProvider } from "@/context/CategoryContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
    <CategoryProvider>
    <CartProvider>
      <ProductsProvider>
     <Layout>
       <Component {...pageProps} />
     </Layout>
    </ProductsProvider>
    </CartProvider>
    </CategoryProvider>
    </AuthProvider>


  )
}
