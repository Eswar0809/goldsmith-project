"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'suggestion';
}

export default function AIChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Gold Expert. I can help you with ring selection, gemstone advice, sizing, care tips, and more. What can I assist you with today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "What's the difference between 18K and 22K gold?",
    "How do I choose the right ring size?",
    "What's the best diamond cut for engagement rings?",
    "How do I care for gold jewelry?",
    "What's the difference between natural and lab diamonds?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // AI response logic (simplified for demo)
    const aiResponse = generateAIResponse(inputText);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('18k') || input.includes('22k') || input.includes('gold')) {
      return "Great question! 18K gold contains 75% pure gold and 25% other metals, making it durable and perfect for everyday wear. 22K gold contains 91.7% pure gold and is softer, better for special occasions. 18K is more popular for engagement rings due to its strength and beautiful color.";
    }
    
    if (input.includes('size') || input.includes('sizing')) {
      return "Finding the right ring size is crucial! You can measure at home using our AI Ring Size Estimator by uploading a photo of your hand, or visit any jewelry store for a professional measurement. Consider that fingers can swell slightly during the day, so measure at different times for accuracy.";
    }
    
    if (input.includes('diamond') || input.includes('cut')) {
      return "For engagement rings, the most popular cuts are: Round Brilliant (maximum sparkle), Princess (modern square), Emerald (elegant rectangular), and Oval (elongating effect). Round brilliant offers the most fire and brilliance, while emerald cut offers more understated elegance.";
    }
    
    if (input.includes('care') || input.includes('maintenance')) {
      return "To keep your gold jewelry looking beautiful: Clean with warm soapy water and soft brush, store separately to prevent scratching, avoid harsh chemicals and chlorine, remove during swimming/showering, and have professional cleaning every 6-12 months. Regular care will maintain its luster for generations!";
    }
    
    if (input.includes('natural') || input.includes('lab')) {
      return "Both natural and lab diamonds are real diamonds with identical physical properties! Natural diamonds form over billions of years underground, while lab diamonds are created in weeks using advanced technology. Lab diamonds are typically 30-50% less expensive and more environmentally friendly, while natural diamonds offer traditional romance.";
    }
    
    if (input.includes('price') || input.includes('cost')) {
      return "Ring prices vary based on metal type, stone size/quality, and craftsmanship. Our rings range from ₹1,24,500 for simple bands to ₹12,45,000+ for elaborate designs. I'd be happy to help you find options within your budget - what price range are you considering?";
    }
    
    if (input.includes('custom') || input.includes('design')) {
      return "We love custom designs! Our AI Customizer lets you describe your vision, and our master craftsmen bring it to life. You can also work directly with our designers for personalized consultations. Custom pieces typically take 4-6 weeks and start around ₹2,49,000. Would you like me to connect you with our design team?";
    }
    
    // Default response
    return "That's a great question! As your AI Gold Expert, I'm here to help with all aspects of jewelry selection and care. Could you provide more specific details about what you'd like to know? I can assist with ring styles, gemstone selection, sizing, care instructions, custom design, and more!";
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
            isOpen 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:shadow-xl'
          }`}
        >
          {isOpen ? (
            <span className="text-white text-xl">✕</span>
          ) : (
            <span className="text-white text-xl">💬</span>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white p-4 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">🤖</span>
              </div>
              <div>
                <h3 className="font-poppins font-semibold">AI Gold Expert</h3>
                <p className="font-poppins text-xs opacity-90">Online now</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="font-poppins text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-gray-200">
              <p className="font-poppins text-xs text-gray-600 mb-2">Quick questions:</p>
              <div className="space-y-2">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-poppins text-gray-700 transition-colors duration-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about jewelry..."
                className="flex-1 p-3 border border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none font-poppins text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="px-4 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
              >
                <span className="text-sm">Send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
