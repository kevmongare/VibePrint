// components/CheckoutPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../types';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    instructions: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Calculate total amount
  const totalAmount = cartItems.reduce((total, item) => {
    const itemPrice = item.selectedVariation ? item.selectedVariation.price : item.product.price;
    return total + (itemPrice * item.quantity);
  }, 0);

  const normalizePhone = (num: string): string => {
    let cleaned = num.trim();
    if (cleaned.startsWith("07")) {
      return "254" + cleaned.substring(1);
    } else if (cleaned.startsWith("+254")) {
      return cleaned.substring(1);
    } else if (cleaned.startsWith("254")) {
      return cleaned;
    }
    return cleaned;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      setStatus('Please fix the errors before proceeding');
      setShowSuccessMessage(true);
      return;
    }

    const normalizedPhone = normalizePhone(formData.phone);
    
    // Ensure amount is an integer (M-Pesa expects whole numbers)
    const amount = Math.round(totalAmount);

    try {
      const res = await fetch("https://mpesaapi-sbss.onrender.com/mpesa/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: normalizedPhone,
          amount: amount,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(`✅ Payment initiated successfully. Check your phone to complete the transaction.`);
        setShowSuccessMessage(true);
        
        // Clear cart on successful payment
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));
        
        // Hide success message after 5 seconds and redirect
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate('/');
        }, 5000);
      } else {
        setStatus(`❌ Payment failed: ${data.details?.errorMessage || data.error || 'Unknown error'}`);
        setShowSuccessMessage(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatus("❌ Request failed: " + err.message);
      } else {
        setStatus("❌ An unknown error occurred");
      }
      setShowSuccessMessage(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Information Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:ring focus:ring-blue-300 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:ring focus:ring-blue-300 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:ring focus:ring-blue-300 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="07XXXXXXXX or 2547XXXXXXXX"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:ring focus:ring-blue-300 ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your delivery address"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>
            
            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Instructions (Optional)
              </label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                rows={3}
                placeholder="Any special delivery instructions"
              />
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-4">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={`${item.product.id}-${item.selectedVariation?.id || 'base'}`} className="flex py-3 border-b">
                  <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    {item.selectedVariation && (
                      <p className="text-gray-500 text-sm">
                        {Object.values(item.selectedVariation.attributes).join(', ')}
                      </p>
                    )}
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    <p className="font-medium">
                      Kes {((item.selectedVariation ? item.selectedVariation.price : item.product.price) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <p>Total Amount:</p>
                <p>Kes {totalAmount.toLocaleString()}</p>
              </div>
            </div>
            
            <button
              onClick={handlePayment}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Complete Payment
            </button>
          </div>
        </div>
      </div>
      
      {/* Status Message */}
      {showSuccessMessage && (
        <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          status.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <div className="flex justify-between items-center">
            <span>{status}</span>
            <button 
              onClick={() => setShowSuccessMessage(false)}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;