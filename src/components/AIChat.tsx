// components/AIChat.tsx
import React, { useState, useRef, useEffect } from 'react';
import { products, categories } from '../data/products';

interface ChatMessage {
  id: number;
  text: string | JSX.Element;
  sender: 'user' | 'bot';
  timestamp?: Date;
  suggestions?: string[];
  isOrderOption?: boolean;
}

interface OrderDetails {
  productName?: string;
  quantity?: number;
  color?: string;
  customization?: string;
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: 1, 
      text: "Hello! I'm VibePrint's AI assistant. How can I help you with our products today?", 
      sender: 'bot',
      suggestions: [
        "What tote bags do you have?",
        "Tell me about your mugs",
        "How do I place an order?",
        "What are your working hours?"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // const [orderInProgress, setOrderInProgress] = useState<OrderDetails | null>(null);
  // const [showOrderOptions, setShowOrderOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Business information
  const businessHours = "Our working hours are 9:00 AM to 6:00 PM Monday through Saturday. We're closed on Sundays and public holidays.";
  const whatsappNumber = "+254712345678";
  const mpesaPayBill = "123456";
  const mpesaAccount = "VibePrint";

  // Enhanced AI response logic with order handling
  const generateAIResponse = (message: string): { text: string | JSX.Element, suggestions?: string[], isOrderOption?: boolean } => {
    const lowerMessage = message.toLowerCase();
    
    // Greetings
    if (/hello|hi|hey|howdy|greetings/i.test(lowerMessage)) {
      return { 
        text: "Hello! Welcome to VibePrint. How can I assist you with our products today?",
        suggestions: [
          "Show me your products",
          "How do I place an order?",
          "What's your pricing?",
          "Do you have any discounts?"
        ]
      };
    }
    
    // Working hours inquiry
    if (/(hours|schedule|time|open|close|9|6|9-6)/i.test(lowerMessage)) {
      return {
        text: businessHours,
        suggestions: [
          "Place an order",
          "Contact an agent",
          "What products do you have?",
          "Do you offer delivery?"
        ]
      };
    }
    
    // Order inquiries
    if (/(order|buy|purchase|checkout|cart|place an order)/i.test(lowerMessage)) {
      return {
        text: "You can place orders directly through our WhatsApp business account or via M-Pesa payment. Would you like to:",
        suggestions: [
            "Order via WhatsApp",
            "Order via M-Pesa",
            "Speak to a human agent"
        ],
        isOrderOption: true
      };
    }
    
    // WhatsApp ordering
    if (/(whatsapp|wa|what's app)/i.test(lowerMessage)) {
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20VibePrint!%20I%20would%20like%20to%20place%20an%20order.`;
      return {
        text: (
          <div>
            <p>Great! You can place your order through our WhatsApp business account. Our team will assist you with product selection and process your order.</p>
            <p className="mt-2">Click the link below to start your order on WhatsApp:</p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Open WhatsApp
            </a>
          </div>
        ),
        suggestions: [
          "What products are available?",
          "How long does delivery take?",
          "What are your payment options?"
        ]
      };
    }
    
    // M-Pesa ordering
    if (/(mpesa|m-pesa|mobile money|pay|payment)/i.test(lowerMessage)) {
      return {
        text: (
          <div>
            <p>To order via M-Pesa:</p>
            <ol className="list-decimal pl-5 mt-2 space-y-2">
              <li>Go to M-Pesa on your phone</li>
              <li>Select Lipa Na M-Pesa</li>
              <li>Select Pay Bill</li>
              <li>Enter business number: <strong>{mpesaPayBill}</strong></li>
              <li>Enter account number: <strong>{mpesaAccount}</strong></li>
              <li>Enter the amount</li>
              <li>Enter your M-Pesa PIN and confirm</li>
            </ol>
            <p className="mt-2">After payment, please WhatsApp us the confirmation message at {whatsappNumber} with your order details.</p>
          </div>
        ),
        suggestions: [
          "What's your M-Pesa PayBill number?",
          "How do I send order details?",
          "Speak to an agent"
        ]
      };
    }
    
    // Agent assistance
    if (/(agent|human|person|representative|talk to someone)/i.test(lowerMessage)) {
      return {
        text: (
          <div>
            <p>I'd be happy to connect you with one of our customer service agents during our business hours ({businessHours}).</p>
            <p className="mt-2">You can reach our team directly via WhatsApp at {whatsappNumber} or call us at 0722 000 000.</p>
            <p className="mt-2">Would you like me to help you with something else while you wait?</p>
          </div>
        ),
        suggestions: [
          "What are your working hours?",
          "Products overview",
          "Delivery information"
        ]
      };
    }
    
    // Product inquiries
    if (/(tote|bag|backpack|pouch)/i.test(lowerMessage)) {
      const toteProducts = products.filter(p => p.category === 'tote-bags' && p.inStock);
      const topTote = toteProducts[0];
      
      return {
        text: (
          <div>
            <p>We have {toteProducts.length} tote bags available. Our most popular is 
            <strong> "{topTote?.name}"</strong> for Kes {topTote?.price}.</p>
            <p className="mt-2">Features: {topTote?.description || "Durable, stylish, and customizable."}</p>
            <p className="mt-2">Would you like to place an order?</p>
          </div>
        ),
        suggestions: [
          "Order via WhatsApp",
          "Order via M-Pesa",
          "See more products",
          "What colors are available?"
        ],
        isOrderOption: true
      };
    }
    
    if (/(mug|cup|drinkware|thermos)/i.test(lowerMessage)) {
      const drinkProducts = products.filter(p => p.category === 'drinkware' && p.inStock);
      const mugProduct = drinkProducts.find(p => p.name.toLowerCase().includes('mug')) || drinkProducts[0];
      
      return {
        text: `We offer ${drinkProducts.length} drinkware products. Our ${mugProduct?.name} is Kes ${mugProduct?.price} and holds ${mugProduct?.description || '12oz of your favorite beverage'}. Can I help you place an order?`,
        suggestions: [
          "Order via WhatsApp",
          "Order via M-Pesa",
          "What types of mugs do you have?",
          "Are they dishwasher safe?"
        ],
        isOrderOption: true
      };
    }
    
    // Default response
    return {
      text: "I'm here to help you with product information, ordering, and recommendations. What would you like to know about our products or services?",
      suggestions: [
        "How do I place an order?",
        "What are your working hours?",
        "What products do you have?",
        "Speak to an agent"
      ]
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = { 
      id: Date.now(), 
      text: inputMessage, 
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const botMessage: ChatMessage = { 
        id: Date.now() + 1, 
        text: aiResponse.text, 
        sender: 'bot',
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
        isOrderOption: aiResponse.isOrderOption
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    // Auto-submit the suggestion after a brief moment
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 bg-[#e86510] text-white rounded-full p-4 shadow-lg hover:bg-[#d45a0e] transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500"></span>
          </span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className={`bg-white rounded-lg shadow-xl w-80 ${isMinimized ? 'h-14' : 'h-96'} flex flex-col border border-gray-200 transition-all duration-300`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF6F20] to-[#e86510] text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-2 animate-pulse"></div>
              <h3 className="font-semibold">VibePrint AI Assistant</h3>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMinimized ? "M12 19v-6m0 0L5 12m7 7l7-7" : "M5 15l7-7 7 7"} />
                </svg>
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
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
                          ? 'bg-[#FF6F20] text-white rounded-br-none'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                      }`}
                    >
                      <div className="text-sm">{msg.text}</div>
                      <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-orange-100' : 'text-gray-500'}`}>
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-white text-gray-800 border border-gray-200 rounded-lg rounded-bl-none p-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {messages[messages.length - 1]?.sender === 'bot' && 
               messages[messages.length - 1]?.suggestions && 
               !isTyping && (
                <div className="px-3 py-2 bg-gray-100 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {messages[messages.length - 1]?.suggestions?.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-50 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input area */}
              <div className="p-3 border-t flex bg-white rounded-b-lg">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about our products..."
                  className="flex-1 rounded-l-lg p-2 border focus:outline-none focus:ring-1 focus:ring-[#FF6F20] text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-[#FF6F20] to-[#e86510] text-white rounded-r-lg px-4 disabled:opacity-50 hover:opacity-90 transition-all duration-200"
                  aria-label="Send message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AIChat;