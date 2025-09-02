// components/AIChat.tsx
import React, { useState, useRef, useEffect } from 'react';
import { products, categories } from '../data/products';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: 1, 
      text: "Hello! I'm VibePrint's AI assistant. How can I help you with our products today?", 
      sender: 'bot' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI response logic with proper typing
  const generateAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to VibePrint. How can I assist you with our products today?";
    }
    
    // Product inquiries
    if (lowerMessage.includes('tote') || lowerMessage.includes('bag')) {
      const toteProducts = products.filter(p => p.category === 'tote-bags' && p.inStock);
      return `We have ${toteProducts.length} tote bags available. Our most popular is "${toteProducts[0]?.name}" for Kes ${toteProducts[0]?.price}. Would you like to know more about our tote bags?`;
    }
    
    if (lowerMessage.includes('mug') || lowerMessage.includes('drink')) {
      const drinkProducts = products.filter(p => p.category === 'drinkware' && p.inStock);
      return `We offer ${drinkProducts.length} drinkware products. Our custom ceramic mug starts at Kes ${drinkProducts.find(p => p.name.includes('Ceramic'))?.price}. Can I help you choose one?`;
    }
    
    if (lowerMessage.includes('corporate') || lowerMessage.includes('branding')) {
      const corporateProducts = products.filter(p => p.category === 'corporate-branding' && p.inStock);
      return `We provide ${corporateProducts.length} corporate branding solutions. These are perfect for promoting your business!`;
    }
    
    // Price inquiries
    if (lowerMessage.includes('price') || lowerMessage.includes('how much')) {
      return "Our products range from Kes 800 to Kes 2000. Is there a specific product you'd like pricing information for?";
    }
    
    if (lowerMessage.includes('discount') || lowerMessage.includes('promo') || lowerMessage.includes('sale')) {
      return "We currently have special offers on corporate branding orders. For personalized discount codes, please contact our sales team.";
    }
    
    // Order inquiries
    if (lowerMessage.includes('order') || lowerMessage.includes('buy') || lowerMessage.includes('purchase')) {
      return "You can add items to your cart and proceed to checkout. Would you like me to help you find a specific product?";
    }
    
    if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
      return "We offer delivery across Kenya. Standard delivery takes 3-5 business days. Express delivery is available at an additional cost.";
    }
    
    // Categories inquiry
    if (lowerMessage.includes('category') || lowerMessage.includes('categories') || lowerMessage.includes('types')) {
      const categoryList = categories.map(c => c.name).join(', ');
      return `We offer products in these categories: ${categoryList}. Which category are you interested in?`;
    }
    
    // Default response
    return "I'm here to help you with product information, pricing, and recommendations. What would you like to know about our products?";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = { 
      id: Date.now(), 
      text: inputMessage, 
      sender: 'user' 
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const botMessage: ChatMessage = { 
        id: Date.now() + 1, 
        text: aiResponse, 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 left-10 z-50 bg-[#e86510] text-white rounded-full p-3 shadow-lg hover:bg-[var(--primary)]  transition-transform"
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-[#FF6F20] text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
              <h3 className="font-semibold">VibePrint AI Assistant</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    msg.sender === 'user'
                      ? 'bg-[#FF6F20] text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-3 border-t flex bg-white rounded-b-lg">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about our products..."
              className="flex-1 rounded-l-lg p-2 focus:outline-none focus:ring-1 focus:ring-[#FF6F20] text-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-[#FF6F20] text-white rounded-r-lg px-4 disabled:opacity-50 hover:bg-orange-600 transition-colors"
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;