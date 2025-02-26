import Layout from "@/components/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/cartContext";
import { ProductsProvider } from "@/context/ProductsContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
    <AuthProvider>
      <ProductsProvider>
     <Layout>
       <Component {...pageProps} />
     </Layout>
    </ProductsProvider>
    </AuthProvider>
    </CartProvider>

  )
}
