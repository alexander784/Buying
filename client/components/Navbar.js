import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const  Navbar= () => {
    return ( 
        <nav className="bg-slate-500 px-6 py-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className=" text-xl font-bold">
                    <Link href="/">My shop</Link>
                </div>
                <div className="hidden md:flex gap-6 text-lg">
                   <Link href="/" className="hover:text-orange-500">Home</Link>
                   <Link href="/contact" className="hover:text-orange-900">Contact Us</Link>
                </div>
                <div className="flex items-center gap-6">
                  <Link href="/Login" className="hover:text-orange-900">Login</Link>
                  <Link href="/cart" className="relative">
                    <FaShoppingCart className="w-6 h-6" />
          </Link>
        </div>

            </div>


        </nav>
       
     );
}
 
export default Navbar;