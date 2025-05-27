import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import ProductsPage from "@/pages/ProductsPage";
import ProductsByCategory from "./ProductsCategory";
import { useCategories } from "@/context/CategoryContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <div className="container mx-auto p-2">
        <div className="flex flex-col md:flex-row gap-1"> 
          <div className="w-full md:w-1/5"> 
            <h2 className="text-xl font-semibold mb-2">Categories</h2>
            {categoriesLoading && <p className="text-gray-500">Loading categories...</p>}
            {categoriesError && (
              <p className="text-red-500">
                {categoriesError}
                <button
                  onClick={() => window.location.reload()}
                  className="ml-2 text-blue-500 underline"
                >
                  Retry
                </button>
              </p>
            )}
            {!categoriesLoading && !categoriesError && categories.length === 0 && (
              <p className="text-gray-500">No categories available.</p>
            )}
            {!categoriesLoading && !categoriesError && categories.length > 0 && (
              <ul className="space-y-1" role="navigation" aria-label="Product Categories"> 
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/categories/${category.id}`}
                      className="text-black hover:underline focus:outline-none focus:ring-2 focus:ring-orange-950"
                      aria-label={`View products in ${category.name} category`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="w-full md:w-4/5"> 
            <ProductsPage />
            <ProductsByCategory />
          </div>
        </div>
      </div>
    </div>
  );
}