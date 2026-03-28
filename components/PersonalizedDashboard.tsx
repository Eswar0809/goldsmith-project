"use client";

import { useState } from "react";
import { ringPrices } from "../utils/currency";

interface SavedDesign {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  createdAt: string;
}

interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: string;
  addedAt: string;
}

interface RingSizeHistory {
  id: string;
  finger: string;
  size: string;
  measuredAt: string;
  method: string;
}

export default function PersonalizedDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'designs' | 'wishlist' | 'sizes' | 'profile'>('designs');

  // Mock data - in real app, this would come from API/database
  const savedDesigns: SavedDesign[] = [
    {
      id: '1',
      name: 'Custom Engagement Ring',
      description: 'Rose gold with emerald cut diamond',
      image: '💍',
      price: ringPrices.customEngagement,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Vintage Wedding Band',
      description: 'Antique style with filigree details',
      image: '💫',
      price: ringPrices.royalWedding,
      createdAt: '2024-01-10'
    }
  ];

  const wishlistItems: WishlistItem[] = [
    {
      id: '1',
      name: 'Traditional Lotus Ring',
      image: '🪷',
      price: ringPrices.traditionalLotus,
      addedAt: '2024-01-20'
    },
    {
      id: '2',
      name: 'Royal Signet Ring',
      image: '👑',
      price: ringPrices.royalSignet,
      addedAt: '2024-01-18'
    },
    {
      id: '3',
      name: 'Sacred Om Ring',
      image: '🕉️',
      price: ringPrices.sacredOm,
      addedAt: '2024-01-12'
    }
  ];

  const ringSizeHistory: RingSizeHistory[] = [
    {
      id: '1',
      finger: 'Left Ring Finger',
      size: '6.5',
      measuredAt: '2024-01-20',
      method: 'AI Measurement'
    },
    {
      id: '2',
      finger: 'Right Ring Finger',
      size: '6.75',
      measuredAt: '2024-01-15',
      method: 'Ring Sizer Tool'
    }
  ];

  const tabs = [
    { id: 'designs' as const, name: 'My Designs', icon: '🎨', count: savedDesigns.length },
    { id: 'wishlist' as const, name: 'Wishlist', icon: '❤️', count: wishlistItems.length },
    { id: 'sizes' as const, name: 'Ring Sizes', icon: '📏', count: ringSizeHistory.length },
    { id: 'profile' as const, name: 'Profile', icon: '👤', count: null }
  ];

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      >
        📊 My Dashboard
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-gold">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="font-playfair text-2xl font-bold gold-gradient">
                Personalized Dashboard
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="flex h-[calc(90vh-120px)]">
              {/* Sidebar */}
              <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-[#D4AF37] text-white shadow-lg'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{tab.icon}</span>
                        <span className="font-poppins font-medium">{tab.name}</span>
                      </div>
                      {tab.count !== null && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-8 p-4 bg-white rounded-xl shadow-sm">
                  <h3 className="font-poppins font-semibold text-gray-800 mb-3">Quick Stats</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Designs Saved:</span>
                      <span className="font-semibold text-[#D4AF37]">{savedDesigns.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Wishlist Items:</span>
                      <span className="font-semibold text-[#D4AF37]">{wishlistItems.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ring Sizes:</span>
                      <span className="font-semibold text-[#D4AF37]">{ringSizeHistory.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {/* Saved Designs Tab */}
                {activeTab === 'designs' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-playfair text-2xl font-bold text-gray-800">
                        My Custom Designs
                      </h3>
                      <button className="px-4 py-2 bg-[#D4AF37] text-white font-poppins font-semibold rounded-full hover:bg-[#B8941F] transition-colors duration-300">
                        + New Design
                      </button>
                    </div>

                    {savedDesigns.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🎨</div>
                        <h4 className="font-playfair text-xl font-semibold text-gray-800 mb-2">
                          No designs yet
                        </h4>
                        <p className="font-poppins text-gray-600 mb-6">
                          Create your first custom design using our AI customizer
                        </p>
                        <button className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-poppins font-semibold rounded-full">
                          Start Designing
                        </button>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedDesigns.map((design) => (
                          <div key={design.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="text-4xl mb-4 text-center">{design.image}</div>
                            <h4 className="font-playfair text-lg font-bold text-gray-800 mb-2">
                              {design.name}
                            </h4>
                            <p className="font-poppins text-sm text-gray-600 mb-4">
                              {design.description}
                            </p>
                            <div className="flex justify-between items-center mb-4">
                              <span className="font-playfair text-xl font-bold text-[#D4AF37]">
                                {design.price}
                              </span>
                              <span className="font-poppins text-xs text-gray-500">
                                {new Date(design.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <button className="flex-1 py-2 bg-[#D4AF37] text-white font-poppins font-semibold rounded-lg text-sm hover:bg-[#B8941F] transition-colors duration-300">
                                View
                              </button>
                              <button className="flex-1 py-2 border border-[#D4AF37] text-[#D4AF37] font-poppins font-semibold rounded-lg text-sm hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
                                Edit
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Wishlist Tab */}
                {activeTab === 'wishlist' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-playfair text-2xl font-bold text-gray-800">
                        My Wishlist
                      </h3>
                      <button className="px-4 py-2 bg-[#D4AF37] text-white font-poppins font-semibold rounded-full hover:bg-[#B8941F] transition-colors duration-300">
                        Share Wishlist
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <div className="text-4xl mb-4 text-center">{item.image}</div>
                          <h4 className="font-playfair text-lg font-bold text-gray-800 mb-2">
                            {item.name}
                          </h4>
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-playfair text-xl font-bold text-[#D4AF37]">
                              {item.price}
                            </span>
                            <span className="font-poppins text-xs text-gray-500">
                              Added {new Date(item.addedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-[#D4AF37] text-white font-poppins font-semibold rounded-lg text-sm hover:bg-[#B8941F] transition-colors duration-300">
                              Add to Cart
                            </button>
                            <button className="py-2 px-4 border border-red-300 text-red-500 font-poppins font-semibold rounded-lg text-sm hover:bg-red-50 transition-colors duration-300">
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ring Sizes Tab */}
                {activeTab === 'sizes' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-playfair text-2xl font-bold text-gray-800">
                        Ring Size History
                      </h3>
                      <button className="px-4 py-2 bg-[#D4AF37] text-white font-poppins font-semibold rounded-full hover:bg-[#B8941F] transition-colors duration-300">
                        + Measure Size
                      </button>
                    </div>

                    <div className="space-y-4">
                      {ringSizeHistory.map((size) => (
                        <div key={size.id} className="bg-white rounded-2xl p-6 shadow-lg">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-playfair text-lg font-bold text-gray-800">
                                {size.finger}
                              </h4>
                              <p className="font-poppins text-gray-600">
                                Measured on {new Date(size.measuredAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-center">
                              <div className="font-playfair text-3xl font-bold text-[#D4AF37]">
                                {size.size}
                              </div>
                              <div className="font-poppins text-sm text-gray-600">
                                Ring Size
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-poppins text-sm text-gray-600">
                              Method: {size.method}
                            </span>
                            <button className="px-4 py-2 border border-[#D4AF37] text-[#D4AF37] font-poppins font-semibold rounded-lg text-sm hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
                              Use for Filtering
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-6">
                      Profile Settings
                    </h3>

                    <div className="max-w-2xl space-y-6">
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h4 className="font-poppins font-semibold text-gray-800 mb-4">Personal Information</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="font-poppins text-sm text-gray-600 mb-2 block">First Name</label>
                            <input type="text" className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:outline-none" defaultValue="John" />
                          </div>
                          <div>
                            <label className="font-poppins text-sm text-gray-600 mb-2 block">Last Name</label>
                            <input type="text" className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:outline-none" defaultValue="Doe" />
                          </div>
                          <div>
                            <label className="font-poppins text-sm text-gray-600 mb-2 block">Email</label>
                            <input type="email" className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:outline-none" defaultValue="john@example.com" />
                          </div>
                          <div>
                            <label className="font-poppins text-sm text-gray-600 mb-2 block">Phone</label>
                            <input type="tel" className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:outline-none" defaultValue="+1 (555) 123-4567" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h4 className="font-poppins font-semibold text-gray-800 mb-4">Preferences</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="font-poppins text-sm text-gray-600 mb-2 block">Preferred Metal</label>
                            <select className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:outline-none">
                              <option>18K Gold</option>
                              <option>22K Gold</option>
                              <option>Platinum</option>
                              <option>Rose Gold</option>
                              <option>White Gold</option>
                            </select>
                          </div>
                          <div>
                            <label className="font-poppins text-sm text-gray-600 mb-2 block">Budget Range</label>
                            <select className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#D4AF37] focus:outline-none">
                              <option>₹83,000 - ₹2,49,000</option>
                              <option>₹2,49,000 - ₹6,22,500</option>
                              <option>₹6,22,500 - ₹12,45,000</option>
                              <option>₹12,45,000+</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button className="px-6 py-3 bg-[#D4AF37] text-white font-poppins font-semibold rounded-full hover:bg-[#B8941F] transition-colors duration-300">
                          Save Changes
                        </button>
                        <button className="px-6 py-3 border border-gray-300 text-gray-600 font-poppins font-semibold rounded-full hover:bg-gray-50 transition-colors duration-300">
                          Export Data
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
