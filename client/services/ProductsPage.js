import React, { useEffect } from "react";
import { getProducts } from "../services/Products";

const ProductsPage = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        console.log("Fetched Products:", products); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return <h1>Products</h1>;
};

export default ProductsPage;
