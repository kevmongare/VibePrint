// components/Collection.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/products';
import type { Category } from '../types';

const Collection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const navigate = useNavigate();

  const handleCategoryClick = (categorySlug: string): void => {
    navigate(`/category/${categorySlug}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-5">
        <h2 className="text-4xl font-bold text-[#007BFF] sm:text-4xl">Shop By Categories</h2>
        <p className="mt-4 text-sm text-gray-600 max-w-2xl mx-auto font-extralight">
          Your perfect ecosystem is just one click away
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category: Category) => (
          <div
            key={category.id}
            className={`relative group rounded-2xl overflow-hidden hover:-translate-y-4 transform transition-all duration-500 cursor-pointer ${
              activeCategory === category.id ? 'shadow-lg' : 'ring-2 ring-gray-200'
            }`}
            onMouseEnter={() => setActiveCategory(category.id)}
            onClick={() => handleCategoryClick(category.slug)}
          >
            <div className="aspect-video">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-80 object-fill transition-transform duration-700 group-hover:scale-110 bg-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-200 mb-4">{category.description}</p>
                <button className="px-6 py-2 bg-white text-gray-900 font-medium rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  View Products
                </button>
              </div>
            </div>
            
            <div className="absolute top-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="mr-2">➜</span> Explore
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;