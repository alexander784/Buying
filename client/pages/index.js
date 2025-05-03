import Image from "next/image";
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
      <div className="container mx-auto p-4 flex">
        <div className="w-1/4 pr-4">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          {categoriesLoading && <p>Loading categories...</p>}
          {categoriesError && <p className="text-red-500">{categoriesError}</p>}
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/categories/categories/${category.id}`} className="text-blue-600 hover:underline">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <ProductsPage />
          <ProductsByCategory />
        </div>
      </div>
    </div>
  );
}