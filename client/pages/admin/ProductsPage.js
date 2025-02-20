import axios from "axios";
import { useEffect, useState } from "react";


const API_URL = "http://127.0.0.1:8000";

const ProductsPage = () => {

    const[products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const res =await axios.get(`${API_URL}/products/products/`, {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            });
            setProducts(res.data);
            
            }catch(error) {
                console.error('Error fetchong products:', error)
        }
    }

    
    return ( 
        <div className="">
            <h2>All Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={products.id}
                    className="border-b py-2">
                        <strong>{product.name}</strong> - ${product.price}
                    </li>   
                ))}
            </ul>
        </div>
     );
}
 
export default ProductsPage;