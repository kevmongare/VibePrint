// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Logo from '../assets/LandingPage/Vibe logo best2 editted long-16.webp'
import LogoLight from  '../assets/LandingPage/Vibe logo best2 editted long-12.webp'
import LogoDark from '../assets/LandingPage/20250831_2008_White_Dark-Theme_Version_remix_01k40hff5cf94v7n01fs4t3d0x-removebg-preview.png';

interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

const Navbar = ({ cartItemsCount, onCartClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Navigation items with their properties
  const navItems = [
    { id: 1, name: 'Home', href: '#', isActive: true },
    { id: 2, name: 'Products', href: '#' },
    { id: 3, name: 'About', href: '#' },
    { id: 4, name: 'Contact', href: '#' },
  ];

  // Action buttons with their properties
  const actionButtons = [
    { 
      id: 1, 
      title: 'Profile', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      hoverColor: '#007BFF'
    },
    { 
      id: 2, 
      title: 'Favorites', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      hoverColor: '#FF6F20'
    },
  ];

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <>
    {/* <div className='bg-[#007BFF]'>
      <p>info@vibeprint.co.ke</p>
      <p>
      +254 701 643555
      </p>
      </div> */}
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-5"
          : "bg-black/60 backdrop-blur-md py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo + Links */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link
              to={'/'}>
              <img 
                src={isScrolled ? LogoLight:LogoDark}
                alt="Logo" 
                className={`h-20 p-1 transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`} 
              />
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`${isScrolled 
                    ? item.isActive 
                      ? 'border-[#FF6F20] text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-black hover:text-gray-700'
                    : item.isActive
                      ? 'border-[#FF6F20] text-[#FF6F20]'
                      : 'border-transparent text-white hover:white hover:text-white'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="w-full max-w-xs lg:max-w-md">
              <form onSubmit={handleSearch} className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className={`h-5 w-5 ${isScrolled ? 'text-gray-400' : 'text-gray-600'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 focus:outline-none focus:ring-1 sm:text-sm ${
                    isScrolled 
                      ? 'border-gray-300 bg-white placeholder-gray-500 focus:ring-[#007BFF] focus:border-[#007BFF]' 
                      : 'border-white/30 bg-white backdrop-blur-sm placeholder-gray-600 focus:ring-white focus:border-white text-gray-800'
                  }`}
                  placeholder="Search products"
                />
              </form>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-4">
              {actionButtons.map((button) => (
                <button 
                  key={button.id}
                  className={`relative p-1 ${isScrolled ? `text-gray-500 hover:text-[${button.hoverColor}]` : 'text-white/80 hover:text-white'}`}
                  title={button.title}
                >
                  {button.icon}
                </button>
              ))}
              <button 
                className={`relative p-1 ${isScrolled ? 'text-gray-500 hover:text-[#007BFF]' : 'text-white/80 hover:text-white'}`}
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
              <button className={`ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                isScrolled 
                  ? 'text-white bg-[#FF6F20] hover:bg-[#e86510] focus:ring-[#007BFF]' 
                  : 'text-[#FF6F20] bg-white hover:bg-gray-100 focus:ring-white'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200`}>
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled 
                  ? 'text-gray-400 hover:text-[#007BFF] hover:bg-gray-100 focus:ring-[#007BFF]' 
                  : 'text-white hover:text-white hover:bg-white/20 focus:ring-white'
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
        <div className={`md:hidden ${isScrolled ? 'bg-white' : 'bg-[#007BFF]'}`}>
          <div className="pt-2 pb-3 space-y-1">
            {/* Mobile Search */}
            <div className="px-4 pt-2 pb-3">
              <form onSubmit={handleSearch} className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#007BFF] focus:border-[#007BFF] sm:text-sm"
                  placeholder="Search products"
                />
              </form>
            </div>

            {/* Mobile Links */}
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`${item.isActive 
                  ? 'bg-[#007BFF]/10 border-[#007BFF] text-[#007BFF]' 
                  : 'border-transparent text-gray-500 hover:bg-[#FF6F20]/10 hover:border-[#FF6F20] hover:text-[#FF6F20]'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Icons */}
            <div className="mt-4 p-2 flex space-x-4">
              {actionButtons.map((button) => (
                <button 
                  key={button.id}
                  className="p-1 text-gray-500 hover:text-[#007BFF]"
                  title={button.title}
                >
                  {button.icon}
                </button>
              ))}
              <button 
                className="relative p-1 text-gray-500 hover:text-[#007BFF]"
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

            {/* Mobile CTA */}
            <div className="mt-4 p-2">
              <button className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#FF6F20] hover:bg-[#e86510] transition-colors duration-200">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;