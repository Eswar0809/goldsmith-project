"use client";

import { useState } from "react";

interface WeddingRing {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  materials: string[];
  features: string[];
}

export default function WeddingEngagementRings() {
  const [selectedRing, setSelectedRing] = useState<WeddingRing | null>(null);
  const [filter, setFilter] = useState<'all' | 'engagement' | 'wedding' | 'bridal' | 'sacred'>('all');

  const weddingRings: WeddingRing[] = [
    {
      id: '1',
      name: 'Sacred Union Engagement Ring',
      description: 'Traditional engagement ring with sacred union symbols and eternal love motifs',
      price: '₹3,45,000',
      image: '💍',
      category: 'engagement',
      materials: ['22K Gold', 'Diamond', 'Ruby'],
      features: ['Sacred Symbols', 'Eternal Love', 'Traditional Design']
    },
    {
      id: '2',
      name: 'Vedic Wedding Band',
      description: 'Sacred Vedic wedding band with traditional mantras and auspicious symbols',
      price: '₹2,25,000',
      image: '🤲',
      category: 'wedding',
      materials: ['22K Gold', 'Diamond'],
      features: ['Vedic Mantras', 'Auspicious Symbols', 'Sacred Design']
    },
    {
      id: '3',
      name: 'Bridal Solitaire Ring',
      description: 'Elegant bridal solitaire with traditional Indian bridal motifs and diamond centerpiece',
      price: '₹4,15,000',
      image: '👰',
      category: 'bridal',
      materials: ['18K Gold', 'Diamond', 'Emerald'],
      features: ['Bridal Motifs', 'Solitaire Design', 'Traditional Elegance']
    },
    {
      id: '4',
      name: 'Mangalsutra Wedding Ring',
      description: 'Sacred mangalsutra-inspired wedding ring with traditional black beads and gold work',
      price: '₹1,95,000',
      image: '🕉️',
      category: 'sacred',
      materials: ['22K Gold', 'Black Beads', 'Diamond'],
      features: ['Mangalsutra Design', 'Sacred Symbolism', 'Traditional Craft']
    },
    {
      id: '5',
      name: 'Lotus Engagement Ring',
      description: 'Beautiful lotus-inspired engagement ring symbolizing purity and divine love',
      price: '₹2,85,000',
      image: '🪷',
      category: 'engagement',
      materials: ['18K Gold', 'Diamond', 'Ruby'],
      features: ['Lotus Design', 'Divine Love', 'Purity Symbol']
    },
    {
      id: '6',
      name: 'Temple Architecture Ring',
      description: 'Ring inspired by sacred temple architecture with traditional carvings and divine motifs',
      price: '₹3,75,000',
      image: '🏛️',
      category: 'sacred',
      materials: ['22K Gold', 'Diamond', 'Emerald'],
      features: ['Temple Design', 'Divine Motifs', 'Sacred Architecture']
    }
  ];

  const filteredRings = filter === 'all' 
    ? weddingRings 
    : weddingRings.filter(ring => ring.category === filter);

  const categories = [
    { id: 'all', name: 'All Rings', icon: '💍' },
    { id: 'engagement', name: 'Engagement', icon: '💎' },
    { id: 'wedding', name: 'Wedding', icon: '🤲' },
    { id: 'bridal', name: 'Bridal', icon: '👰' },
    { id: 'sacred', name: 'Sacred', icon: '🕉️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-white to-[#F4E4BC]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4">
            Wedding & Engagement Rings
          </h1>
          <p className="font-poppins text-xl opacity-90 max-w-3xl mx-auto">
            Celebrate your sacred union with our traditional Indian wedding and engagement rings. 
            Each piece is crafted with love, blessed with tradition, and designed for eternity.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-playfair text-2xl font-bold gold-gradient">
              CHITTOJU SRINU
            </div>
            <div className="flex space-x-6">
              <a href="/" className="font-poppins text-gray-700 hover:text-[#D4AF37] transition-colors">Home</a>
              <a href="/collections" className="font-poppins text-gray-700 hover:text-[#D4AF37] transition-colors">Collections</a>
              <a href="/about" className="font-poppins text-gray-700 hover:text-[#D4AF37] transition-colors">About</a>
              <a href="/contact" className="font-poppins text-gray-700 hover:text-[#D4AF37] transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Filter Categories */}
      <div className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id as typeof filter)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-poppins font-semibold transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-[#D4AF37] text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Rings Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRings.map((ring) => (
              <div
                key={ring.id}
                onClick={() => setSelectedRing(ring)}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#D4AF37]"
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{ring.image}</div>
                  <h3 className="font-playfair text-xl font-bold text-gray-800 mb-2">
                    {ring.name}
                  </h3>
                  <p className="font-poppins text-gray-600 text-sm mb-4">
                    {ring.description}
                  </p>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {ring.materials.map((material, index) => (
                      <span key={index} className="px-3 py-1 bg-[#F4E4BC] text-gray-700 rounded-full text-xs font-poppins">
                        {material}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ring.features.map((feature, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-poppins">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-playfair text-2xl font-bold text-[#D4AF37]">
                    {ring.price}
                  </span>
                  <button className="px-4 py-2 bg-[#D4AF37] text-white font-poppins font-semibold rounded-full hover:bg-[#B8941F] transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ring Detail Modal */}
      {selectedRing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-gold">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-playfair text-3xl font-bold gold-gradient">
                  {selectedRing.name}
                </h2>
                <button
                  onClick={() => setSelectedRing(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-8xl mb-6">{selectedRing.image}</div>
                  <div className="bg-gradient-to-r from-[#F4E4BC] to-[#D4AF37] rounded-2xl p-6">
                    <h3 className="font-playfair text-3xl font-bold text-gray-800 mb-2">
                      {selectedRing.price}
                    </h3>
                    <p className="font-poppins text-gray-600">
                      Free shipping & lifetime warranty
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-poppins text-gray-600 mb-6 leading-relaxed">
                    {selectedRing.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-poppins font-semibold text-gray-800 mb-3">Materials</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedRing.materials.map((material, index) => (
                          <span key={index} className="px-3 py-1 bg-[#F4E4BC] text-gray-700 rounded-full text-sm font-poppins">
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-poppins font-semibold text-gray-800 mb-3">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedRing.features.map((feature, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-poppins">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button className="flex-1 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-poppins font-semibold rounded-full shadow-gold hover:shadow-xl transition-all duration-300">
                        Add to Cart
                      </button>
                      <button className="flex-1 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-poppins font-semibold rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
                        Save to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
