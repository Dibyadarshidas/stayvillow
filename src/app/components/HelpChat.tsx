'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Mail, Phone } from 'lucide-react';

export default function HelpChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showContactForm, setShowContactForm] = useState(true);
  const [chatHistory, setChatHistory] = useState<{sender: 'user' | 'support', message: string}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !name.trim()) return;
    
    // Start the chat with a personalized greeting
    setChatHistory([
      {sender: 'support', message: `Hi ${name}! How can we help you today?`}
    ]);
    
    setShowContactForm(false);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, {sender: 'user', message}]);
    
    // Clear input
    setMessage('');
    
    // Simulate response (in a real app, this would be an API call)
    setTimeout(() => {
      let response = "Thanks for your message! Our team will get back to you soon at " + email + ". If this is urgent, please call us at (555) 123-4567.";
      
      // Customize response based on keywords
      if (message.toLowerCase().includes('booking') || message.toLowerCase().includes('reservation')) {
        response = "Thanks for your booking inquiry. Our team will check availability and get back to you shortly at " + email + ".";
      } else if (message.toLowerCase().includes('cancel') || message.toLowerCase().includes('refund')) {
        response = "I understand you have a question about cancellation or refund. A member of our support team will contact you at " + email + " to assist you further.";
      } else if (message.toLowerCase().includes('price') || message.toLowerCase().includes('discount')) {
        response = "Thank you for your pricing inquiry. We'll review options and special offers for you and contact you at " + email + " soon.";
      }
      
      setChatHistory(prev => [...prev, {
        sender: 'support', 
        message: response
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg z-50 transition-all duration-300 flex items-center justify-center"
        aria-label="Help Chat"
      >
        <MessageCircle size={24} />
      </button>
      
      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col max-h-[500px] border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium text-gray-800">Chat with Stayvillow Support</h3>
            <button onClick={toggleChat} className="text-gray-500 hover:text-gray-700">
              <X size={18} />
            </button>
          </div>
          
          {showContactForm ? (
            /* Contact form */
            <div className="p-4 flex-1">
              <p className="text-sm text-gray-600 mb-4">
                Please provide your contact details so we can better assist you.
              </p>
              <form onSubmit={handleSubmitContact} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                  Start Chat
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Chat messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[300px]">
                {chatHistory.map((chat, index) => (
                  <div 
                    key={index} 
                    className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        chat.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      {chat.message}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Contact options */}
              <div className="px-4 py-2 border-t border-b bg-gray-50">
                <div className="flex justify-between text-sm">
                  <a href="mailto:support@stayvillow.com" className="flex items-center text-blue-600 hover:underline">
                    <Mail size={14} className="mr-1" />
                    Email us
                  </a>
                  <a href="tel:+15551234567" className="flex items-center text-blue-600 hover:underline">
                    <Phone size={14} className="mr-1" />
                    Call us
                  </a>
                </div>
              </div>
              
              {/* Message input */}
              <form onSubmit={sendMessage} className="p-4 flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg"
                >
                  <Send size={18} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
} 