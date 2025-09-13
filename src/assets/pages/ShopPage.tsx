// pages/ShopPage.tsx
import React, { useState } from 'react';
import { products, categories } from '../../data/products';
import type { Product } from '../../types';
import { Link } from 'react-router-dom';

interface ShopPageProps {
  addToCart: (product: Product, quantity: number) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('name');

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 sticky top-28">Shop All Products</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar with categories */}
        <div className="w-full md:w-64 ">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-42">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-md ${!selectedCategory ? 'bg-[#FF6F20] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  All Products
                </button>
              </li>
              {categories.map(category => (
                <li key={category.id}>
                  <button
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`w-full text-left px-3 py-2 rounded-md ${selectedCategory === category.slug ? 'bg-[#FF6F20] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Products grid */}
        <div className="flex-1 bg-white p-10">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{sortedProducts.length} products found</p>
            <select
            title='new'
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6F20]"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product: Product) => (
              <div key={product.id} className="bg-white hover:rounded-md  hover:shadow-lg overflow-hidden transition-shadow duration-300">
                <Link to={`/product/${product.id}`}>
                  <div className="h-56 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-[#FF6F20] transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">Kes {product.price.toLocaleString()}</span>
                    <button 
                      onClick={() => addToCart(product, 1)}
                      className="px-3 py-1 bg-[#FF6F20] text-white rounded-md hover:bg-[#e65c1a] transition-colors text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;