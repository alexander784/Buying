import Layout from "@/components/Layout";
import { CartProvider } from "@/context/cartContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
     <Layout>
       <Component {...pageProps} />
     </Layout>
    </CartProvider>
  )
}
