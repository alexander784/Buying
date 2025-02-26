import Layout from "@/components/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/cartContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
    <CartProvider>
     <Layout>
       <Component {...pageProps} />
     </Layout>
    </CartProvider>
    </AuthProvider>
  )
}
