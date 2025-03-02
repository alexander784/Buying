import Link from "next/link";

const AdminDashboard = () => {
    return (  
        <div className="max-w-4xlmx-auto p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

            <div className="space-y-4">
            <Link href="/admin/AddProduct" className="block bg-orange-950 text-white p-3 rounded text-center">
            Add New product
            </Link>
            <Link href="/admin/ProductsPage" className="block bg-orange-950 text-white p-3 rounded text-center">
            View all Products
            </Link>
            <Link href="/admin/ManageCategories" className="block bg-orange-950 text-white p-3 rounded text-center">
            Add Category
            </Link>
            <Link href="/admin/categories" className="block bg-orange-950 text-white p-3 rounded text-center">
            Products by category
            </Link>
        </div>
        </div>
    );
}
 
export default AdminDashboard;