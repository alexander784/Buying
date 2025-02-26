import { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "@/services/Products";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      if (products.length === 0) {
        getProducts()
          .then((data) => setProducts(data))
          .catch((error) => console.error("Error fetching products:", error));
      }
    }, []);

    return(
     <ProductsContext.Provider value={{ products, setProducts }}>
        {children}
      </ProductsContext.Provider>

    );
};

export const useProducts = () => useContext(ProductsContext);




