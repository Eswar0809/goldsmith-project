"use client";

import { useState, useEffect } from "react";
import { formatINR, formatINRWithDecimals } from "../utils/currency";

interface GoldPrice {
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  fee: string;
  security: string;
}

export default function PaymentAndPriceTracker() {
  const [isOpen, setIsOpen] = useState(false);
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock gold price data - in real app, this would come from API
  useEffect(() => {
    const mockGoldPrice: GoldPrice = {
      price: 6240.50, // Gold price per gram in INR
      change: 37.50,
      changePercent: 0.60,
      lastUpdated: new Date().toISOString()
    };
    setGoldPrice(mockGoldPrice);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setGoldPrice(prev => prev ? {
        ...prev,
        price: prev.price + (Math.random() - 0.5) * 50,
        change: (Math.random() - 0.5) * 100,
        changePercent: (Math.random() - 0.5) * 2,
        lastUpdated: new Date().toISOString()
      } : null);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'credit',
      name: 'Credit Card',
      icon: '💳',
      description: 'Visa, Mastercard, American Express',
      fee: 'No additional fee',
      security: '256-bit SSL encryption'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🅿️',
      description: 'Secure PayPal checkout',
      fee: 'No additional fee',
      security: 'PayPal protection'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: '₿',
      description: 'Bitcoin, Ethereum accepted',
      fee: '2% discount',
      security: 'Blockchain secured'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: '🏦',
      description: 'Direct bank transfer',
      fee: 'No additional fee',
      security: 'Bank-grade security'
    },
    {
      id: 'installments',
      name: 'Installment Plan',
      icon: '📅',
      description: '0% APR financing available',
      fee: 'No interest',
      security: 'Secure financing'
    }
  ];

  const priceHistory = [
    { date: '2024-01-20', price: 6240.50 },
    { date: '2024-01-19', price: 6203.00 },
    { date: '2024-01-18', price: 6227.80 },
    { date: '2024-01-17', price: 6219.90 },
    { date: '2024-01-16', price: 6235.60 },
    { date: '2024-01-15', price: 6221.30 },
    { date: '2024-01-14', price: 6219.70 }
  ];

  const calculateRingPrice = (basePrice: number, goldWeight: number) => {
    if (!goldPrice) return basePrice;
    const goldCost = goldWeight * goldPrice.price;
    return basePrice + goldCost;
  };

  const formatPrice = (price: number) => {
    return formatINR(price);
  };

  const handlePayment = async () => {
    if (!selectedPayment) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    alert('Payment processed successfully! (This is a demo)');
    setIsProcessing(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      >
        💰 Payment & Gold Tracker
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-gold">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-playfair text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text">
                  Secure Payment & Gold Price Tracker
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Gold Price Tracker */}
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-6">
                    📈 Live Gold Prices
                  </h3>

                  {goldPrice && (
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-playfair text-2xl font-bold text-gray-800">
                            {formatPrice(goldPrice.price)}
                          </h4>
                          <p className="font-poppins text-sm text-gray-600">
                            Gold per gram (24K)
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`font-poppins font-semibold ${
                            goldPrice.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {goldPrice.change >= 0 ? '+' : ''}{formatPrice(goldPrice.change)}
                          </div>
                          <div className={`font-poppins text-sm ${
                            goldPrice.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {goldPrice.changePercent >= 0 ? '+' : ''}{goldPrice.changePercent.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm font-poppins text-gray-600">
                        <span>Last updated: {new Date(goldPrice.lastUpdated).toLocaleTimeString()}</span>
                        <span className="text-green-600">● Live</span>
                      </div>
                    </div>
                  )}

                  {/* Price Calculator */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
                    <h4 className="font-poppins font-semibold text-gray-800 mb-4">
                      💍 Ring Price Calculator
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="font-poppins text-sm text-gray-600 mb-2 block">
                          Base Ring Price
                        </label>
                        <input
                          type="number"
                          defaultValue="207500"
                          className="w-full p-3 border border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                          placeholder="207500"
                        />
                      </div>
                      <div>
                        <label className="font-poppins text-sm text-gray-600 mb-2 block">
                          Gold Weight (grams)
                        </label>
                        <input
                          type="number"
                          defaultValue="0.1"
                          step="0.01"
                          className="w-full p-3 border border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                          placeholder="0.1"
                        />
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-poppins font-semibold text-gray-800">
                            Total Price:
                          </span>
                          <span className="font-playfair text-xl font-bold text-green-600">
                            {formatPrice(calculateRingPrice(207500, 2.5))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price History Toggle */}
                  <button
                    onClick={() => setShowPriceHistory(!showPriceHistory)}
                    className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-poppins font-semibold text-gray-800">
                        📊 7-Day Price History
                      </span>
                      <span className="text-gray-500">
                        {showPriceHistory ? '▼' : '▶'}
                      </span>
                    </div>
                  </button>

                  {/* Price History Chart */}
                  {showPriceHistory && (
                    <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-6">
                      <div className="space-y-3">
                        {priceHistory.map((entry, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="font-poppins text-sm text-gray-600">
                              {new Date(entry.date).toLocaleDateString()}
                            </span>
                            <span className="font-poppins font-semibold text-gray-800">
                              {formatPrice(entry.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Methods */}
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-6">
                    🔒 Secure Payment Options
                  </h3>

                  <div className="space-y-4 mb-6">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                          selectedPayment === method.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{method.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-poppins font-semibold text-gray-800">
                              {method.name}
                            </h4>
                            <p className="font-poppins text-sm text-gray-600 mb-1">
                              {method.description}
                            </p>
                            <div className="flex justify-between text-xs">
                              <span className="text-green-600">{method.fee}</span>
                              <span className="text-gray-500">{method.security}</span>
                            </div>
                          </div>
                          {selectedPayment === method.id && (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm">✓</span>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Security Features */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6">
                    <h4 className="font-poppins font-semibold text-gray-800 mb-4">
                      🛡️ Security Features
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">🔐</span>
                        <span className="font-poppins text-gray-600">SSL Encryption</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">🔒</span>
                        <span className="font-poppins text-gray-600">PCI Compliant</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">🛡️</span>
                        <span className="font-poppins text-gray-600">Fraud Protection</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✅</span>
                        <span className="font-poppins text-gray-600">Money Back Guarantee</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Button */}
                  {selectedPayment && (
                    <button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing Payment...
                        </div>
                      ) : (
                        `Complete Purchase - ${formatPrice(calculateRingPrice(207500, 2.5))}`
                      )}
                    </button>
                  )}

                  {/* Trust Badges */}
                  <div className="mt-6 flex justify-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🏆</div>
                      <div className="font-poppins text-xs text-gray-600">A+ Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">🔒</div>
                      <div className="font-poppins text-xs text-gray-600">Secure</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">⭐</div>
                      <div className="font-poppins text-xs text-gray-600">Trusted</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
