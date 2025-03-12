import { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "@/services/Products";


const API_BASE_URL = "http://127.0.0.1:8000/";
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

    const getAuthHeaders = () => {
      if (typeof window !== "undefined") {
          const token = localStorage.getItem("access_token"); 
          return token ? { Authorization: `Bearer ${token}` } : {};
      }
      return {};
  };

  const deleteProducts = async (productId) => {
    const headers = getAuthHeaders();

    if (!headers.Authorization) {
        alert("Authentication required! Please log in as an admin.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}products/products/delete/${productId}/`, {
            method: "DELETE",
            headers: headers,
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete product: ${response.status}`);
        }

        // fetchProducts(); 
        setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};


    return(
     <ProductsContext.Provider value={{ products, setProducts , deleteProducts}}>
        {children}
      </ProductsContext.Provider>

    );
};

export const useProducts = () => useContext(ProductsContext);




