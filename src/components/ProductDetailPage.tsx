// components/ProductDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { products } from '../data/products';
import type { Product, ProductVariation, CartItem } from '../types';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(productId || ''));
    if (foundProduct) {
      setProduct(foundProduct);
      setCurrentImage(foundProduct.image);
      // Set the first variation as default if available
      if (foundProduct.variations && foundProduct.variations.length > 0) {
        setSelectedVariation(foundProduct.variations[0]);
      }
    } else {
      navigate('/');
    }
  }, [productId, navigate]);

  const handleAddToCart = (): void => {
    if (!product) return;
    
    // Get existing cart or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Create cart item
    const cartItem: CartItem = {
      product,
      quantity,
      selectedVariation: selectedVariation || undefined
    };
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex((item: CartItem) => 
      item.product.id === product.id && 
      JSON.stringify(item.selectedVariation) === JSON.stringify(selectedVariation)
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      existingCart.push(cartItem);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Dispatch event to notify other components about cart update
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show success message
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleBuyNow = (): void => {
    handleAddToCart();
    navigate('/checkout');
  };

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  // Group variations by attribute
  const variationAttributes: Record<string, string[]> = {};
  if (product.variations) {
    product.variations.forEach(variation => {
      Object.entries(variation.attributes).forEach(([key, value]) => {
        if (!variationAttributes[key]) {
          variationAttributes[key] = [];
        }
        if (!variationAttributes[key].includes(value)) {
          variationAttributes[key].push(value);
        }
      });
    });
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-25">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li>
            <Link to={`/category/${product.category}`} className="text-gray-500 hover:text-gray-700 capitalize">
              {product.category.replace('-', ' ')}
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li className="text-gray-800 font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="h-96 overflow-hidden rounded-lg mb-4">
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(image)}
                  className={`h-24 overflow-hidden rounded-md border-2 ${
                    currentImage === image ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-gray-900">
              Kes {selectedVariation ? selectedVariation.price.toLocaleString() : product.price.toLocaleString()}
            </span>
            {selectedVariation && selectedVariation.price !== product.price && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                Kes {product.price.toLocaleString()}
              </span>
            )}
          </div>

          <div className="mb-6">
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Variations */}
          {product.variations && product.variations.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Options</h3>
              {Object.entries(variationAttributes).map(([attribute, values]) => (
                <div key={attribute} className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">{attribute}</h4>
                  <div className="flex flex-wrap gap-2">
                    {values.map(value => {
                      const isAvailable = product.variations?.some(v => 
                        v.attributes[attribute] === value && v.inStock
                      );
                      const isSelected = selectedVariation?.attributes[attribute] === value;
                      
                      return (
                        <button
                          key={value}
                          onClick={() => {
                            // Find a variation that matches this attribute value
                            const newVariation = product.variations?.find(v => 
                              Object.entries(v.attributes).every(([k, vVal]) => 
                                k === attribute ? vVal === value : 
                                (selectedVariation ? selectedVariation.attributes[k] === vVal : true)
                              )
                            );
                            if (newVariation) setSelectedVariation(newVariation);
                          }}
                          disabled={!isAvailable}
                          className={`px-4 py-2 border rounded-md text-sm font-medium ${
                            isSelected
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : isAvailable
                              ? 'border-gray-300 text-gray-700 hover:border-gray-400'
                              : 'border-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              {selectedVariation && !selectedVariation.inStock && (
                <p className="text-red-500 text-sm mt-2">This variation is currently out of stock</p>
              )}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-700 mb-2 block">
              Quantity
            </label>
            <div className="flex items-center">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="p-2 border border-gray-300 rounded-l-md"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-t border-b border-gray-300 py-2"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-gray-300 rounded-r-md"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart & Buy Now Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={selectedVariation ? !selectedVariation.inStock : !product.inStock}
              className={`flex-1 py-3 px-6 rounded-md font-medium ${
                selectedVariation ? !selectedVariation.inStock : !product.inStock
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {selectedVariation ? !selectedVariation.inStock ? 'Out of Stock' : 'Add to Cart' : 
               !product.inStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={selectedVariation ? !selectedVariation.inStock : !product.inStock}
              className={`flex-1 py-3 px-6 rounded-md font-medium ${
                selectedVariation ? !selectedVariation.inStock : !product.inStock
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              Buy Now
            </button>
          </div>

          {addedToCart && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
              Product added to cart successfully!
            </div>
          )}

          {/* Product Details */}
          {product.details && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Product Details</h3>
              <p className="text-gray-600">{product.details}</p>
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;