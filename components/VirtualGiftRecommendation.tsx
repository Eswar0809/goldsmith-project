"use client";

import { useState } from "react";
import { ringPrices } from "../utils/currency";

interface GiftItem {
  id: string;
  name: string;
  category: 'earrings' | 'bracelet' | 'necklace' | 'ring';
  image: string;
  price: string;
  description: string;
  matchScore: number;
}

interface SelectedRing {
  id: string;
  name: string;
  style: string;
  metal: string;
  stone: string;
  price: string;
}

export default function VirtualGiftRecommendation() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRing, setSelectedRing] = useState<SelectedRing | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [recommendedGifts, setRecommendedGifts] = useState<GiftItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const rings = [
    {
      id: '1',
      name: 'Traditional Lotus Ring',
      style: 'Traditional',
      metal: '22K Gold',
      stone: 'Diamond',
      price: ringPrices.traditionalLotus
    },
    {
      id: '2',
      name: 'Royal Signet Ring',
      style: 'Royal',
      metal: '22K Gold',
      stone: 'Diamond',
      price: ringPrices.royalSignet
    },
    {
      id: '3',
      name: 'Sacred Om Ring',
      style: 'Sacred',
      metal: '22K Gold',
      stone: 'Ruby',
      price: ringPrices.sacredOm
    }
  ];

  const occasions = [
    'Anniversary',
    'Birthday',
    'Valentine\'s Day',
    'Mother\'s Day',
    'Graduation',
    'Just Because'
  ];

  const generateRecommendations = async () => {
    if (!selectedRing || !selectedOccasion) return;

    setIsGenerating(true);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // AI-powered gift recommendations based on ring and occasion
    const recommendations: GiftItem[] = [
      {
        id: '1',
        name: 'Pearl Drop Earrings',
        category: 'earrings',
        image: '💫',
        price: '₹99,600',
        description: 'Elegant pearl drop earrings that complement the classic style',
        matchScore: 95
      },
      {
        id: '2',
        name: 'Diamond Tennis Bracelet',
        category: 'bracelet',
        image: '✨',
        price: '₹2,32,400',
        description: 'Timeless tennis bracelet with matching diamond quality',
        matchScore: 92
      },
      {
        id: '3',
        name: 'Delicate Chain Necklace',
        category: 'necklace',
        image: '📿',
        price: '₹78,850',
        description: 'Minimalist chain necklace perfect for layering',
        matchScore: 88
      }
    ];

    // Adjust recommendations based on ring style
    if (selectedRing.style === 'Royal') {
      recommendations[0] = {
        ...recommendations[0],
        name: 'Royal Pearl Earrings',
        description: 'Elegant pearl earrings that complement royal traditional style'
      };
    } else if (selectedRing.style === 'Sacred') {
      recommendations[0] = {
        ...recommendations[0],
        name: 'Sacred Om Earrings',
        description: 'Spiritual Om symbol earrings with traditional sacred styling'
      };
    }

    setRecommendedGifts(recommendations);
    setIsGenerating(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'earrings': return '👂';
      case 'bracelet': return '💪';
      case 'necklace': return '📿';
      case 'ring': return '💍';
      default: return '💎';
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-yellow-600 bg-yellow-50';
    return 'text-orange-600 bg-orange-50';
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      >
        🎁 Gift Recommender
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-gold">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-playfair text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 text-transparent bg-clip-text">
                  Virtual Gift Recommendation
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Step 1: Select Ring */}
              <div className="mb-8">
                <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                  1. Select the Ring You're Pairing With
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {rings.map((ring) => (
                    <button
                      key={ring.id}
                      onClick={() => setSelectedRing(ring)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                        selectedRing?.id === ring.id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">💍</div>
                      <h4 className="font-poppins font-semibold text-gray-800 mb-1">
                        {ring.name}
                      </h4>
                      <p className="font-poppins text-sm text-gray-600 mb-2">
                        {ring.style} • {ring.metal}
                      </p>
                      <p className="font-poppins font-semibold text-pink-600">
                        {ring.price}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Occasion */}
              {selectedRing && (
                <div className="mb-8">
                  <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                    2. What's the Occasion?
                  </h3>
                  <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {occasions.map((occasion) => (
                      <button
                        key={occasion}
                        onClick={() => setSelectedOccasion(occasion)}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 font-poppins text-sm ${
                          selectedOccasion === occasion
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-gray-200 hover:border-pink-300 text-gray-600'
                        }`}
                      >
                        {occasion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Generate Recommendations */}
              {selectedRing && selectedOccasion && !recommendedGifts.length && !isGenerating && (
                <div className="text-center mb-8">
                  <button
                    onClick={generateRecommendations}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    🎯 Get Gift Recommendations
                  </button>
                </div>
              )}

              {/* Loading State */}
              {isGenerating && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mb-6"></div>
                  <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
                    AI is Finding Perfect Matches
                  </h3>
                  <div className="space-y-2">
                    <p className="font-poppins text-gray-600">🎨 Analyzing ring style and materials...</p>
                    <p className="font-poppins text-gray-600">🎁 Matching occasion and budget preferences...</p>
                    <p className="font-poppins text-gray-600">✨ Curating complementary pieces...</p>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {recommendedGifts.length > 0 && (
                <div>
                  <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-6">
                    Perfect Matches for Your {selectedRing?.name}
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {recommendedGifts.map((gift) => (
                      <div key={gift.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                        <div className="flex items-start justify-between mb-4">
                          <div className="text-4xl">{gift.image}</div>
                          <div className={`px-3 py-1 rounded-full text-sm font-poppins font-semibold ${getMatchColor(gift.matchScore)}`}>
                            {gift.matchScore}% Match
                          </div>
                        </div>
                        
                        <h4 className="font-playfair text-lg font-bold text-gray-800 mb-2">
                          {gift.name}
                        </h4>
                        
                        <p className="font-poppins text-sm text-gray-600 mb-4">
                          {gift.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getCategoryIcon(gift.category)}</span>
                            <span className="font-poppins text-sm text-gray-600 capitalize">
                              {gift.category}
                            </span>
                          </div>
                          <span className="font-playfair text-xl font-bold text-pink-600">
                            {gift.price}
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-poppins font-semibold rounded-lg text-sm hover:shadow-lg transition-all duration-300">
                            Add to Cart
                          </button>
                          <button className="py-2 px-4 border border-pink-300 text-pink-600 font-poppins font-semibold rounded-lg text-sm hover:bg-pink-50 transition-colors duration-300">
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Gift Set Options */}
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 mb-8">
                    <h4 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                      💎 Complete Gift Sets
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-4">
                        <h5 className="font-poppins font-semibold text-gray-800 mb-2">
                          The Classic Set
                        </h5>
                        <p className="font-poppins text-sm text-gray-600 mb-3">
                          Ring + Earrings + Bracelet
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="font-playfair text-lg font-bold text-pink-600">
                            ₹6,22,500
                          </span>
                          <span className="font-poppins text-sm text-green-600">
                            Save ₹24,900
                          </span>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4">
                        <h5 className="font-poppins font-semibold text-gray-800 mb-2">
                          The Luxury Set
                        </h5>
                        <p className="font-poppins text-sm text-gray-600 mb-3">
                          Ring + Complete Jewelry Set
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="font-playfair text-lg font-bold text-pink-600">
                            ₹9,96,000
                          </span>
                          <span className="font-poppins text-sm text-green-600">
                            Save ₹66,400
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-center">
                    <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                      💝 Create Gift Box
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedRing(null);
                        setSelectedOccasion('');
                        setRecommendedGifts([]);
                      }}
                      className="px-8 py-4 border-2 border-pink-500 text-pink-600 font-poppins font-semibold rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300"
                    >
                      Try Another Ring
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
