"use client";

import { useState } from "react";
import { priceRanges } from "../utils/currency";

interface Gemstone {
  name: string;
  color: string;
  meaning: string;
  durability: string;
  care: string;
  idealFor: string[];
  priceRange: string;
  emoji: string;
}

interface Metal {
  name: string;
  purity: string;
  color: string;
  durability: string;
  maintenance: string;
  idealFor: string[];
  pricePerGram: string;
  emoji: string;
}

export default function GemstoneAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'gemstones' | 'metals'>('gemstones');
  const [selectedItem, setSelectedItem] = useState<Gemstone | Metal | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const gemstones: Gemstone[] = [
    {
      name: "Diamond",
      color: "Colorless, Yellow, Pink, Blue",
      meaning: "Eternal love, strength, and purity. The hardest natural substance on Earth.",
      durability: "10/10 - Extremely durable",
      care: "Regular cleaning with warm soapy water. Avoid harsh chemicals.",
      idealFor: ["Engagement rings", "Everyday wear", "Heirloom pieces"],
      priceRange: priceRanges.gemstones.diamond,
      emoji: "💎"
    },
    {
      name: "Ruby",
      color: "Deep red to pink-red",
      meaning: "Passion, love, and courage. Known as the 'king of gemstones'.",
      durability: "9/10 - Very durable",
      care: "Gentle cleaning with warm water. Avoid ultrasonic cleaners.",
      idealFor: ["Anniversary gifts", "Statement pieces", "Vintage styles"],
      priceRange: priceRanges.gemstones.ruby,
      emoji: "❤️"
    },
    {
      name: "Sapphire",
      color: "Blue, Pink, Yellow, Green",
      meaning: "Wisdom, truth, and nobility. Symbol of faithfulness and sincerity.",
      durability: "9/10 - Very durable",
      care: "Safe for ultrasonic cleaning. Regular professional maintenance.",
      idealFor: ["Engagement rings", "Formal jewelry", "Colorful designs"],
      priceRange: priceRanges.gemstones.sapphire,
      emoji: "💙"
    },
    {
      name: "Emerald",
      color: "Rich green",
      meaning: "Growth, renewal, and fertility. Associated with nature and prosperity.",
      durability: "7.5/10 - Good durability",
      care: "Gentle cleaning only. Avoid heat and harsh chemicals.",
      idealFor: ["Vintage styles", "Nature-inspired designs", "Special occasions"],
      priceRange: priceRanges.gemstones.emerald,
      emoji: "💚"
    },
    {
      name: "Pearl",
      color: "White, Cream, Pink, Black",
      meaning: "Purity, innocence, and femininity. Formed by living organisms.",
      durability: "6/10 - Moderate durability",
      care: "Wipe with soft cloth after wearing. Avoid perfumes and cosmetics.",
      idealFor: ["Bridal jewelry", "Classic styles", "Delicate pieces"],
      priceRange: priceRanges.gemstones.pearl,
      emoji: "🤍"
    }
  ];

  const metals: Metal[] = [
    {
      name: "18K Gold",
      purity: "75% gold, 25% alloy",
      color: "Rich yellow",
      durability: "8/10 - Good durability",
      maintenance: "Regular polishing. Professional cleaning recommended.",
      idealFor: ["Classic designs", "Everyday wear", "Traditional styles"],
      pricePerGram: priceRanges.metals.gold18k,
      emoji: "🟡"
    },
    {
      name: "22K Gold",
      purity: "91.7% gold, 8.3% alloy",
      color: "Deep yellow",
      durability: "6/10 - Soft, requires care",
      maintenance: "Gentle handling. Frequent professional maintenance.",
      idealFor: ["Cultural jewelry", "Investment pieces", "Special occasions"],
      pricePerGram: priceRanges.metals.gold22k,
      emoji: "🟨"
    },
    {
      name: "Rose Gold",
      purity: "75% gold, 25% copper",
      color: "Warm pink",
      durability: "8/10 - Good durability",
      maintenance: "Regular cleaning with soft cloth. Avoid harsh chemicals.",
      idealFor: ["Romantic designs", "Vintage styles", "Modern pieces"],
      pricePerGram: priceRanges.metals.roseGold,
      emoji: "🌹"
    },
    {
      name: "White Gold",
      purity: "75% gold, 25% white metals",
      color: "Silvery white",
      durability: "8/10 - Good durability",
      maintenance: "Rhodium plating every 1-2 years. Regular cleaning.",
      idealFor: ["Modern designs", "Diamond settings", "Contemporary styles"],
      pricePerGram: priceRanges.metals.whiteGold,
      emoji: "⚪"
    },
    {
      name: "Platinum",
      purity: "95% platinum, 5% other metals",
      color: "Cool white",
      durability: "9/10 - Excellent durability",
      maintenance: "Minimal maintenance. Professional cleaning occasionally.",
      idealFor: ["Luxury pieces", "Diamond rings", "Investment jewelry"],
      pricePerGram: priceRanges.metals.platinum,
      emoji: "🔷"
    }
  ];

  const filteredItems = selectedCategory === 'gemstones' 
    ? gemstones.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : metals.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.meaning?.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      >
        🧠 Smart Advisor
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-gold">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-playfair text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
                  Smart Gemstone & Material Advisor
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Category Tabs */}
              <div className="flex gap-2 mb-8">
                <button
                  onClick={() => setSelectedCategory('gemstones')}
                  className={`px-6 py-3 rounded-full font-poppins font-semibold transition-all duration-300 ${
                    selectedCategory === 'gemstones'
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  💎 Gemstones
                </button>
                <button
                  onClick={() => setSelectedCategory('metals')}
                  className={`px-6 py-3 rounded-full font-poppins font-semibold transition-all duration-300 ${
                    selectedCategory === 'metals'
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  🏅 Metals
                </button>
              </div>

              {/* Search */}
              <div className="mb-8">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Search ${selectedCategory}...`}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#D4AF37] focus:outline-none font-poppins"
                />
              </div>

              {/* Items Grid */}
              {!selectedItem ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedItem(item)}
                      className="text-left p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="text-4xl mb-4">{item.emoji}</div>
                      <h3 className="font-playfair text-xl font-bold text-gray-800 mb-2">
                        {item.name}
                      </h3>
                      <p className="font-poppins text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.meaning || `${item.color} • ${item.durability}`}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-poppins font-semibold text-[#D4AF37]">
                          {selectedCategory === 'gemstones' ? (item as Gemstone).priceRange : (item as Metal).pricePerGram}
                        </span>
                        <span className="text-[#D4AF37]">→</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                /* Detailed View */
                <div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="mb-6 flex items-center gap-2 text-[#D4AF37] hover:text-[#B8941F] font-poppins font-semibold"
                  >
                    ← Back to {selectedCategory}
                  </button>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Item Info */}
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-6xl">{selectedItem.emoji}</div>
                        <div>
                          <h3 className="font-playfair text-3xl font-bold text-gray-800">
                            {selectedItem.name}
                          </h3>
                          <p className="font-poppins text-gray-600">
                            {selectedCategory === 'gemstones' ? (selectedItem as Gemstone).color : (selectedItem as Metal).color}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="font-poppins font-semibold text-gray-800 mb-2">Meaning & Symbolism</h4>
                          <p className="font-poppins text-gray-600">
                            {selectedCategory === 'gemstones' ? (selectedItem as Gemstone).meaning : 'Precious metal with cultural significance'}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-poppins font-semibold text-gray-800 mb-2">Durability</h4>
                          <p className="font-poppins text-gray-600">{selectedItem.durability}</p>
                        </div>

                        <div>
                          <h4 className="font-poppins font-semibold text-gray-800 mb-2">Care & Maintenance</h4>
                          <p className="font-poppins text-gray-600">
                            {selectedCategory === 'gemstones' ? (selectedItem as Gemstone).care : (selectedItem as Metal).maintenance}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-poppins font-semibold text-gray-800 mb-2">Ideal For</h4>
                          <div className="flex flex-wrap gap-2">
                            {(selectedCategory === 'gemstones' ? (selectedItem as Gemstone).idealFor : (selectedItem as Metal).idealFor).map((use, index) => (
                              <span key={index} className="px-3 py-1 bg-[#F4E4BC] text-gray-700 rounded-full text-sm font-poppins">
                                {use}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-[#F4E4BC] to-[#D4AF37] rounded-2xl p-4">
                          <h4 className="font-poppins font-semibold text-gray-800 mb-2">Price Range</h4>
                          <p className="font-playfair text-2xl font-bold text-gray-800">
                            {selectedCategory === 'gemstones' ? (selectedItem as Gemstone).priceRange : (selectedItem as Metal).pricePerGram}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* AI Recommendations */}
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6">
                      <h4 className="font-playfair text-xl font-bold text-gray-800 mb-4">
                        🤖 AI Recommendations
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <h5 className="font-poppins font-semibold text-gray-800 mb-2">Best Matches</h5>
                          <p className="font-poppins text-sm text-gray-600">
                            {selectedCategory === 'gemstones' 
                              ? `This ${selectedItem.name} pairs beautifully with 18K gold or platinum settings.`
                              : `${selectedItem.name} works excellently with diamonds and colored gemstones.`
                            }
                          </p>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <h5 className="font-poppins font-semibold text-gray-800 mb-2">Care Tips</h5>
                          <p className="font-poppins text-sm text-gray-600">
                            {selectedItem.durability.includes('9') || selectedItem.durability.includes('10')
                              ? 'This material is very durable and suitable for everyday wear.'
                              : 'Handle with care and avoid exposure to harsh conditions.'
                            }
                          </p>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <h5 className="font-poppins font-semibold text-gray-800 mb-2">Investment Value</h5>
                          <p className="font-poppins text-sm text-gray-600">
                            {selectedItem.name === 'Diamond' || selectedItem.name === 'Platinum'
                              ? 'Excellent investment potential with stable market value.'
                              : 'Good value retention with potential for appreciation.'
                            }
                          </p>
                        </div>
                      </div>

                      <button className="w-full mt-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-poppins font-semibold rounded-full">
                        Get Personalized Advice
                      </button>
                    </div>
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
