// components/CategoryPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { categories, products } from '../data/products';
import type { Product } from '../types';

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [sortOption, setSortOption] = useState<string>('name');
  const [filterInStock, setFilterInStock] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Find the current category
    const category = categories.find(cat => cat.slug === categorySlug) || null;
    setCurrentCategory(category);
    
    if (!category) {
      navigate('/');
      return;
    }
    
    // Filter products by category
    let filteredProducts = products.filter(product => product.category === categorySlug);
    
    // Apply search filter
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.tags && product.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }
    
    // Apply stock filter
    if (filterInStock) {
      filteredProducts = filteredProducts.filter(product => product.inStock);
    }
    
    // Apply sorting
    filteredProducts.sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'price-low') {
        return a.price - b.price;
      } else if (sortOption === 'price-high') {
        return b.price - a.price;
      }
      return 0;
    });
    
    setCategoryProducts(filteredProducts);
  }, [categorySlug, sortOption, filterInStock, searchTerm, navigate]);

  const handleProductClick = (productId: number): void => {
    navigate(`/product/${productId}`);
  };

  if (!currentCategory) {
    return <div className="container mx-auto px-4 py-8">Category not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li className="text-gray-800 font-medium">{currentCategory.name}</li>
        </ol>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentCategory.name}</h1>
        <p className="text-gray-600">{currentCategory.description}</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder={`Search ${currentCategory.name}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                checked={filterInStock}
                onChange={() => setFilterInStock(!filterInStock)}
                className="rounded text-blue-600 focus:ring-blue-500 mr-2"
              />
              In Stock Only
            </label>
          </div>
          
          <div className="flex items-center">
            <label className="text-sm text-gray-700 mr-2">Sort by:</label>
            <select
              value={sortOption}
              title='New'
              onChange={(e) => setSortOption(e.target.value)}
              className="rounded-md border border-gray-300 py-1 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {!product.inStock && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Out of Stock
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">Kes {product.price.toLocaleString()}</span>
                  <button 
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      product.inStock 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!product.inStock}
                    onClick={(e) => {
                      e.stopPropagation();
                      // You can add direct add to cart functionality here if needed
                    }}
                  >
                    {product.inStock ? 'View Details' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm ? `No products found for "${searchTerm}"` : 'No products found in this category.'}
          </p>
        </div>
      )}

      {/* Related Categories */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Other Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories
            .filter(cat => cat.slug !== categorySlug)
            .map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="block bg-gray-100 rounded-lg p-4 text-center hover:bg-gray-200 transition-colors"
              >
                <div className="h-16 w-16 mx-auto mb-2">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{category.name}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;