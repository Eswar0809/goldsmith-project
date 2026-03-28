"use client";

import { useState } from "react";

interface CustomerStory {
  id: string;
  name: string;
  location: string;
  story: string;
  ring: string;
  images: string[];
  rating: number;
  date: string;
  verified: boolean;
}

export default function CustomerStoriesSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<CustomerStory | null>(null);
  const [filter, setFilter] = useState<'all' | 'engagement' | 'wedding' | 'anniversary' | 'custom'>('all');

  // Mock customer stories data
  const stories: CustomerStory[] = [
    {
      id: '1',
      name: 'Sarah & Michael',
      location: 'New York, NY',
      story: 'We worked with CHITTOJU SRINU to create the perfect engagement ring. Michael wanted something unique, and the AI customizer helped us design a vintage-inspired piece with a family heirloom diamond. The craftsmanship exceeded our expectations, and Sarah still gets compliments every day!',
      ring: 'Custom Vintage Engagement Ring',
      images: ['💍', '💎', '✨'],
      rating: 5,
      date: '2024-01-15',
      verified: true
    },
    {
      id: '2',
      name: 'Jennifer Martinez',
      location: 'Los Angeles, CA',
      story: 'As a jewelry designer myself, I was skeptical about AI recommendations. But the Smart Advisor helped me discover rose gold, which I never considered before. The ring size estimator was incredibly accurate, and my custom design came out exactly as I envisioned. Absolutely stunning quality!',
      ring: 'Modern Rose Gold Halo Ring',
      images: ['💫', '🌹', '👑'],
      rating: 5,
      date: '2024-01-10',
      verified: true
    },
    {
      id: '3',
      name: 'David & Emma',
      location: 'Chicago, IL',
      story: 'The virtual try-on feature was a game-changer! We could see how different rings looked on Emma\'s hand before making a decision. The 3D viewer helped us appreciate every detail. The AI chat support answered all our questions instantly. We\'re already planning our wedding bands!',
      ring: 'Classic Solitaire Diamond Ring',
      images: ['💍', '💎', '💫'],
      rating: 5,
      date: '2024-01-08',
      verified: true
    },
    {
      id: '4',
      name: 'Amanda Chen',
      location: 'Seattle, WA',
      story: 'I used the Try Before Buy simulation to see how different metals would look with my skin tone. The AI suggested white gold, and it was perfect! The gift recommendation feature helped my husband surprise me with matching earrings for our anniversary. The quality is exceptional.',
      ring: 'White Gold Diamond Band',
      images: ['✨', '💍', '💎'],
      rating: 5,
      date: '2024-01-05',
      verified: true
    },
    {
      id: '5',
      name: 'Robert & Lisa',
      location: 'Miami, FL',
      story: 'The AI Ring Recommendation Assistant was incredibly helpful. We answered a few questions about our style and budget, and it suggested the perfect Art Deco ring. The craftsmanship is outstanding, and the customer service is top-notch. Highly recommend!',
      ring: 'Vintage Art Deco Emerald Ring',
      images: ['👑', '💚', '✨'],
      rating: 5,
      date: '2024-01-02',
      verified: true
    }
  ];

  const filteredStories = stories.filter(story => {
    if (filter === 'all') return true;
    if (filter === 'engagement') return story.ring.toLowerCase().includes('engagement');
    if (filter === 'wedding') return story.ring.toLowerCase().includes('wedding');
    if (filter === 'anniversary') return story.ring.toLowerCase().includes('anniversary');
    if (filter === 'custom') return story.ring.toLowerCase().includes('custom');
    return true;
  });

  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      >
        📖 Customer Stories
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-gold">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-playfair text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 text-transparent bg-clip-text">
                  Customer Stories & Reviews
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 mb-8 overflow-x-auto">
                {[
                  { id: 'all', name: 'All Stories', icon: '📖' },
                  { id: 'engagement', name: 'Engagement', icon: '💍' },
                  { id: 'wedding', name: 'Wedding', icon: '💒' },
                  { id: 'anniversary', name: 'Anniversary', icon: '🎂' },
                  { id: 'custom', name: 'Custom', icon: '🎨' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id as typeof filter)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-poppins font-semibold transition-all duration-300 whitespace-nowrap ${
                      filter === tab.id
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>

              {/* Stories Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map((story) => (
                  <div
                    key={story.id}
                    onClick={() => setSelectedStory(story)}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-amber-200"
                  >
                    {/* Customer Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                        <span className="font-playfair font-bold text-amber-600">
                          {story.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-poppins font-semibold text-gray-800">
                          {story.name}
                          {story.verified && <span className="ml-1 text-blue-500" title="Verified Purchase">✓</span>}
                        </h3>
                        <p className="font-poppins text-sm text-gray-600">{story.location}</p>
                      </div>
                    </div>

                    {/* Story Preview */}
                    <p className="font-poppins text-gray-600 text-sm mb-4 line-clamp-3">
                      {story.story}
                    </p>

                    {/* Ring Info */}
                    <div className="mb-4">
                      <h4 className="font-playfair font-semibold text-gray-800 mb-1">
                        {story.ring}
                      </h4>
                      <div className="flex items-center gap-1">
                        <span>{getRatingStars(story.rating)}</span>
                        <span className="font-poppins text-sm text-gray-600 ml-2">
                          {new Date(story.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Images Preview */}
                    <div className="flex gap-2">
                      {story.images.slice(0, 3).map((image, index) => (
                        <div key={index} className="text-2xl opacity-70">
                          {image}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 text-center">
                      <span className="font-poppins text-sm text-amber-600 hover:text-amber-700">
                        Read Full Story →
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Your Story */}
              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8">
                  <div className="text-4xl mb-4">✨</div>
                  <h3 className="font-playfair text-xl font-bold text-gray-800 mb-2">
                    Share Your Story
                  </h3>
                  <p className="font-poppins text-gray-600 mb-6">
                    Have a CHITTOJU SRINU piece? We'd love to hear your story!
                  </p>
                  <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    Share Your Experience
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Story Detail Modal */}
          {selectedStory && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-gold">
                <div className="p-8">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-playfair text-2xl font-bold text-gray-800">
                      Customer Story
                    </h2>
                    <button
                      onClick={() => setSelectedStory(null)}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  {/* Customer Info */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                      <span className="font-playfair font-bold text-amber-600 text-xl">
                        {selectedStory.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold text-gray-800 text-lg">
                        {selectedStory.name}
                        {selectedStory.verified && <span className="ml-2 text-blue-500" title="Verified Purchase">✓</span>}
                      </h3>
                      <p className="font-poppins text-gray-600">{selectedStory.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span>{getRatingStars(selectedStory.rating)}</span>
                        <span className="font-poppins text-sm text-gray-500">
                          {new Date(selectedStory.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ring Details */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-6">
                    <h4 className="font-playfair text-xl font-bold text-gray-800 mb-2">
                      {selectedStory.ring}
                    </h4>
                    <div className="flex gap-4">
                      {selectedStory.images.map((image, index) => (
                        <div key={index} className="text-4xl">
                          {image}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Full Story */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h4 className="font-poppins font-semibold text-gray-800 mb-4">Their Story</h4>
                    <p className="font-poppins text-gray-600 leading-relaxed">
                      {selectedStory.story}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-6">
                    <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-poppins font-semibold rounded-full">
                      View Similar Rings
                    </button>
                    <button className="px-6 py-3 border-2 border-amber-500 text-amber-600 font-poppins font-semibold rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300">
                      Contact Customer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
