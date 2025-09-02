// components/ProductShowcase.tsx
import React from 'react';
import { products } from '../data/products';
import type { Product } from '../types';
import { Link } from 'react-router-dom';

interface ProductShowcaseProps {
  addToCart: (product: Product, quantity: number) => void;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ addToCart }) => {
  const featuredProducts = products.filter(product => product.inStock).slice(0, 6);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Featured Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto  p-5 bg-white shadow-md ">
        {featuredProducts.map((product: Product) => (
          
          <div key={product.id} className="bg-white rounded-b-sm hover:shadow-md overflow-hidden transform duration-300 hover:-translate-y-2 cursor-pointer ">
            

            <Link to={`/product/${product.id}`}>
              <div className="h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            <div className="p-6">
              <Link to={`/product/${product.id}`}>
                <h3 className="text-xl  text-gray-900 mb-2 hover:text-[#FF6F20] transition-colors">{product.name}</h3>
              </Link>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-md  text-gray-900">Kes {product.price.toLocaleString()}</span>
                <button 
                  onClick={() => addToCart(product, 1)}
                  className="px-4 py-2 bg-[#FF6F20] text-white rounded-md hover:bg-[#e65c1a] transition-colors"
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