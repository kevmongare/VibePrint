// components/CartModal.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  removeFromCart: (productId: number, variation?: any) => void;
  updateQuantity: (productId: number, variation: any, newQuantity: number) => void;
  clearCart: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  removeFromCart, 
  updateQuantity,
  clearCart 
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('whatsapp');
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.selectedVariation ? item.selectedVariation.price : item.product.price;
    return total + (itemPrice * item.quantity);
  }, 0);
  
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = (): void => {
    if (selectedOption === 'whatsapp') {
      const message = `Hello! I would like to order the following products:%0A%0A` +
        cartItems.map(item => {
          const itemName = item.selectedVariation 
            ? `${item.product.name} (${Object.values(item.selectedVariation.attributes).join(', ')})`
            : item.product.name;
          const itemPrice = item.selectedVariation ? item.selectedVariation.price : item.product.price;
          return `- ${itemName}: KSh ${itemPrice.toLocaleString()} x ${item.quantity}`;
        }).join('%0A') +
        `%0A%0ASubtotal: KSh ${subtotal.toLocaleString()}%0ATax: KSh ${tax.toLocaleString()}%0ATotal: KSh ${total.toLocaleString()}%0A%0APlease let me know how to proceed.`;
      
      window.open(`https://wa.me/254701643555?text=${message}`, '_blank');
    } else {
      onClose();
      navigate('/checkout');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-gray-500/30 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-60">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Shopping Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)} {cartItems.reduce((total, item) => total + item.quantity, 0) === 1 ? 'item' : 'items'})
                  </h3>
                  {cartItems.length > 0 && (
                    <button 
                      onClick={clearCart}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Clear Cart
                    </button>
                  )}
                </div>
                <div className="mt-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="mt-4 text-gray-500">Your cart is empty</p>
                      <button
                        onClick={onClose}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flow-root max-h-96 overflow-y-auto">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {cartItems.map((item) => (
                            <li key={`${item.product.id}-${item.selectedVariation?.id || 'base'}`} className="py-6 flex">
                              <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="w-full h-full object-center object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{item.product.name}</h3>
                                    <p className="ml-4">
                                      KSh {(item.selectedVariation ? item.selectedVariation.price : item.product.price).toLocaleString()}
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                                  {item.selectedVariation && (
                                    <div className="mt-1 text-sm text-gray-500">
                                      {Object.entries(item.selectedVariation.attributes).map(([key, value]) => (
                                        <div key={key}>
                                          {key}: {value}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 flex items-end justify-between text-sm">
                                  <div className="flex items-center">
                                    <button
                                      onClick={() => updateQuantity(
                                        item.product.id, 
                                        item.selectedVariation, 
                                        item.quantity - 1
                                      )}
                                      className="p-1 border border-gray-300 rounded-l-md"
                                    >
                                      -
                                    </button>
                                    <span className="px-2 py-1 border-t border-b border-gray-300">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(
                                        item.product.id, 
                                        item.selectedVariation, 
                                        item.quantity + 1
                                      )}
                                      className="p-1 border border-gray-300 rounded-r-md"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <div className="flex">
                                    <button 
                                      type="button" 
                                      className="font-medium text-red-600 hover:text-red-800"
                                      onClick={() => removeFromCart(item.product.id, item.selectedVariation)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6 border-t border-gray-200 py-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>KSh {subtotal.toLocaleString()}</p>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <p>Tax (8%)</p>
                          <p>KSh {tax.toLocaleString()}</p>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-900 mt-2">
                          <p>Total</p>
                          <p>KSh {total.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900">How would you like to proceed?</h4>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center">
                            <input
                              id="whatsapp"
                              name="order-method"
                              type="radio"
                              checked={selectedOption === 'whatsapp'}
                              onChange={() => setSelectedOption('whatsapp')}
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            />
                            <label htmlFor="whatsapp" className="ml-3 block text-sm font-medium text-gray-700">
                              Order via WhatsApp
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="payment"
                              name="order-method"
                              type="radio"
                              checked={selectedOption === 'payment'}
                              onChange={() => setSelectedOption('payment')}
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            />
                            <label htmlFor="payment" className="ml-3 block text-sm font-medium text-gray-700">
                              Proceed to Payment
                            </label>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {cartItems.length > 0 && (
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleCheckout}
              >
                {selectedOption === 'whatsapp' ? 'Order via WhatsApp' : 'Proceed to Payment'}
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onClose}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;