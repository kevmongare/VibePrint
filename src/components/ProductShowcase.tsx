// components/ProductShowcase.tsx
import React from 'react';
import { products } from '../data/products';
import type { Product } from '../types';

interface ProductShowcaseProps {
  addToCart: (product: Product, quantity: number) => void;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ addToCart }) => {
  // You can filter featured products or use a specific set
  const featuredProducts = products.filter(product => product.inStock).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Featured Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((product: Product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">Kes {product.price.toLocaleString()}</span>
                <button 
                  onClick={() => addToCart(product, 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;