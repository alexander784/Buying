import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/cartContext"; 

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const { cart } = useCart(); 

  const homeRoute = user 
    ? user.isAdmin 
      ? "/admin"  
      : "/ProductsPage"   
    : "/";

  return (
    <nav className="bg-slate-100 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link href={homeRoute}>TruckTech</Link>
        </div>

        <div className="hidden md:flex gap-6 text-lg">
          <Link href={homeRoute} className="hover:text-orange-500">Home</Link>
          <Link href="/contact" className="hover:text-orange-900">Contact Us</Link>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <span className="text-orange-950">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/Login" className="hover:text-orange-900">Login</Link>
          )}

          <Link href="/cart" className="relative">
            <FaShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (  
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
