// components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import Logo from '../assets/LandingPage/Vibe logo best2 editted long-16.webp'
import LogoLight from  '../assets/LandingPage/Vibe logo best2 editted long-12.webp'
// import LogoDark from '../assets/LandingPage/20250831_2008_White_Dark-Theme_Version_remix_01k40hff5cf94v7n01fs4t3d0x-removebg-preview.png';

interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

const Navbar = ({ cartItemsCount, onCartClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Navigation items with their properties - Updated Products link
  const navItems = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'All Products', href: '/shop' }, // Changed to link to shop page
    { id: 3, name: 'B2B Solutions', href: '#' },
    { id: 4, name: 'About', href: '#' },
    { id: 5, name: 'Contact', href: '/ContactUs' }
  ];

  // Check if a nav item is active based on current route
  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md py-5"
            : 'bg-white shadow-md py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">
            {/* Logo + Links */}
            
              <div className="flex-shrink-0 flex items-center">
                <Link to={'/'}>
                  <img 
                    src={LogoLight}
                    alt="Logo" 
                    className={`h-20 p-1 transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`} 
                  />
                </Link>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={`${isScrolled 
                      ? isActive(item.href)
                        ? 'border-[#FF6F20] text-[#FF6F20]' 
                        : 'border-transparent text-gray-500 hover:border-[#FF6F20] hover:text-[#FF6F20]'
                      : isActive(item.href)
                        ? 'border-[#FF6F20] text-[#FF6F20]'
                        : 'border-transparent text-gray-500 hover:border-[#FF6F20] hover:text-[#FF6F20]'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            

            {/* Right side actions */}
            <div className="flex items-center">
              <div className="hidden md:flex items-center space-x-4">
                {/* Cart button for desktop */}
                <button 
                  className={`relative p-1 ${isScrolled ? 'text-gray-500 hover:text-[#FF6F20]' : 'text-gray-500 hover:text-[#FF6F20]'}`}
                  onClick={onCartClick}
                  disabled={cartItemsCount === 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartItemsCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-[#FF6F20] rounded-full">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </div>
              <div className="hidden md:flex items-center">
                <Link to="/shop" className={`ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                  isScrolled 
                    ? 'text-white bg-[#FF6F20] hover:bg-[#e86510] focus:ring-[#FF6F20]' 
                    : 'text-white bg-[#FF6F20] hover:bg-[#e86510] focus:ring-[#FF6F20]'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200`}>
                  Get Started
                </Link>
              </div>
            </div>

            {/* Mobile menu button and cart */}
            <div className="flex items-center md:hidden space-x-4">
              {/* Cart button for mobile - outside dropdown */}
              <button 
                className="relative p-1 text-gray-500 hover:text-[#FF6F20]"
                onClick={onCartClick}
                disabled={cartItemsCount === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-[#FF6F20] rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  isScrolled 
                    ? 'text-gray-400 hover:text-[#FF6F20] hover:bg-gray-100 focus:ring-[#FF6F20]' 
                    : 'text-black hover:text-[#FF6F20] hover:bg-gray-100 focus:ring-[#FF6F20]'
                } focus:outline-none focus:ring-2 focus:ring-inset`}
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="pt-2 pb-3 space-y-1">
              {/* Mobile Links - Updated to use Link for Products */}
              {navItems.map((item) => (
                item.href === '/shop' ? (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={`${isActive(item.href)
                      ? 'bg-[#FF6F20]/10 border-[#FF6F20] text-[#FF6F20]' 
                      : 'border-transparent text-gray-500 hover:bg-[#FF6F20]/10 hover:border-[#FF6F20] hover:text-[#FF6F20]'
                    } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`${isActive(item.href)
                      ? 'bg-[#FF6F20]/10 border-[#FF6F20] text-[#FF6F20]' 
                      : 'border-transparent text-gray-500 hover:bg-[#FF6F20]/10 hover:border-[#FF6F20] hover:text-[#FF6F20]'
                    } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              ))}

              {/* Mobile CTA */}
              <div className="mt-4 p-2">
                <Link 
                  to="/shop" 
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#FF6F20] hover:bg-[#e86510] transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;