// App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scroll from './components/ScrollToTop'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import CompanySlider from './components/SliderCompanies';

import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import Whatsapp from './components/WhatsApp';
import CheckoutPage from './components/CheckoutPage';
import Collection from './components/Collection';
import CategoryPage from './components/CategoryPage';
import ProductDetailPage from './components/ProductDetailPage';
import type { Product, CartItem } from './types';

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const addToCart = (product: Product, quantity: number = 1, selectedVariation?: any): void => {
    const existingItemIndex = cartItems.findIndex(item => 
      item.product.id === product.id && 
      JSON.stringify(item.selectedVariation) === JSON.stringify(selectedVariation)
    );
    
    let newCartItems;
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      newCartItems = [...cartItems];
      newCartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      newCartItems = [...cartItems, { product, quantity, selectedVariation }];
    }
    
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number, variation?: any): void => {
    const newCartItems = cartItems.filter(item => 
      !(item.product.id === productId && 
      JSON.stringify(item.selectedVariation) === JSON.stringify(variation))
    );
    
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const updateQuantity = (productId: number, variation: any, newQuantity: number): void => {
    if (newQuantity < 1) return;
    
    const newCartItems = cartItems.map(item => 
      (item.product.id === productId && 
      JSON.stringify(item.selectedVariation) === JSON.stringify(variation))
        ? { ...item, quantity: newQuantity }
        : item
    );
    
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const openCartModal = (): void => {
    setIsCartOpen(true);
  };

  const closeCartModal = (): void => {
    setIsCartOpen(false);
  };

  const clearCart = (): void => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <Router>
      <div className="App relative">
        <Scroll />
        <Navbar 
                cartItemsCount={cartItems.reduce((total, item) => total + item.quantity, 0)} 
                onCartClick={openCartModal} 
              />

        <CartModal 
                isOpen={isCartOpen} 
                onClose={closeCartModal} 
                cartItems={cartItems} 
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                clearCart={clearCart}
              />

              
        <Routes>
          <Route path="/" element={
            <>
              
              <Hero />
              <CompanySlider/>
              <Collection />
              <ProductShowcase addToCart={addToCart} />
              
              
            </>
          } />
          
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
        </Routes>
        <CallToAction />
              <Whatsapp/>
              <Footer />
              
      </div>
    </Router>
  );
};

export default App;