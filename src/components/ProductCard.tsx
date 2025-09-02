// components/ProductCard.jsx

import React, { useState } from 'react';

type Product = {
  image: string;
  name: string;
  description: string;
  price: number;
};

type ProductCardProps = {
  product: Product;
  addToCart: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white  rounded-md overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-50 overflow-hidden relative ">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center">
            <button 
              onClick={() => addToCart(product)}
              className="bg-[#FF6F20] text-white px-4 py-2 rounded-md hover:bg-[#007BFF] transition-colors cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
      <div className="p-6  bg-gradient-to-t from-[#007BFF]/10 via-10% to-white cursor-pointer h-full">
        <h3 className="mt-1 text-lg font-semibold text-gray-950">{product.name}</h3>
        <p className="mt-2 text-gray-700 text-sm font-normal">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">Kes {product.price}</span>
          <button 
            onClick={() => addToCart(product)}
            className="md:hidden text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;