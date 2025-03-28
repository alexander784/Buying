import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">TruckTech</h3>
          <p className="text-sm text-gray-400">
            314 Nairobi<br />
            Kirinyaga Road<br />
            <a href="mailto:support@yourstore.com" className="hover:text-white transition-colors">
              trucktech.com
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/ProductsPage" className="text-sm text-gray-400 hover:text-white transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="text-sm text-gray-400 hover:text-white transition-colors">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/deals" className="text-sm text-gray-400 hover:text-white transition-colors">
                Deals
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/help" className="text-sm text-gray-400 hover:text-white transition-colors">
                Help Center
              </Link>
            </li>
            <li>
            
            </li>
            <li>
              <Link href="/returns" className="text-sm text-gray-400 hover:text-white transition-colors">
                Returns
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
          <div className="flex flex-col space-y-2">
            <a
              href="https://twitter.com/yourstore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com/yourstore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com/yourstore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} TruckTech. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;