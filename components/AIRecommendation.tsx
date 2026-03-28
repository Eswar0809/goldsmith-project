"use client";

import { useState } from "react";
import { priceRanges, formatINR } from "../utils/currency";

interface RecommendationData {
  style: string;
  budget: string;
  occasion: string;
  metal: string;
  gemstone: string;
}

interface RecommendationResult {
  style: string;
  description: string;
  priceRange: string;
  image: string;
  features: string[];
}

export default function AIRecommendation() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [recommendationData, setRecommendationData] = useState<RecommendationData>({
    style: "",
    budget: "",
    occasion: "",
    metal: "",
    gemstone: ""
  });
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const questions = [
    {
      question: "What's your personal style?",
      options: ["Traditional Indian", "Royal & Regal", "Spiritual & Sacred", "Artistic & Intricate", "Classic & Elegant"]
    },
    {
      question: "What's your budget range?",
      options: priceRanges.budget
    },
    {
      question: "What's the occasion?",
      options: ["Engagement", "Wedding", "Anniversary", "Religious Ceremony", "Traditional Festival"]
    },
    {
      question: "Preferred metal type?",
      options: ["18K Gold", "22K Gold", "Platinum", "Rose Gold", "White Gold"]
    },
    {
      question: "Gemstone preference?",
      options: ["Diamond", "Ruby", "Sapphire", "Emerald", "No Gemstone"]
    }
  ];

  const handleAnswer = (field: keyof RecommendationData, value: string) => {
    setRecommendationData(prev => ({ ...prev, [field]: value }));
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendation({ ...recommendationData, [field]: value });
    }
  };

  const generateRecommendation = async (data: RecommendationData) => {
    setIsLoading(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // AI-powered recommendation logic (simplified for demo)
    const recommendations: RecommendationResult[] = [
      {
        style: "Traditional Lotus Ring",
        description: "A sacred lotus-inspired ring featuring traditional Indian motifs and diamond centerpiece. Perfect for those who value spiritual elegance and cultural heritage.",
        priceRange: "₹2,07,500 - ₹6,64,000",
        image: "🪷",
        features: ["Lotus design", "Traditional motifs", "22K gold band", "Sacred symbolism"]
      },
      {
        style: "Royal Signet Ring",
        description: "Majestic signet ring with traditional Indian royal seal design and family crest engraving. Ideal for those who appreciate regal elegance and heritage.",
        priceRange: "₹2,90,500 - ₹9,96,000",
        image: "👑",
        features: ["Royal design", "Family crest", "Hand engraved", "Regal elegance"]
      },
      {
        style: "Sacred Om Ring",
        description: "Spiritual Om symbol ring with traditional Sanskrit inscriptions and sacred geometry. Perfect for the spiritual soul who values divine connection.",
        priceRange: "₹3,32,000 - ₹12,45,000",
        image: "🕉️",
        features: ["Om symbol", "Sanskrit inscriptions", "Sacred geometry", "Spiritual design"]
      }
    ];
    
    // Simple AI logic based on user preferences
    let selectedRecommendation = recommendations[0];
    
    if (data.style.includes("Royal")) selectedRecommendation = recommendations[1];
    if (data.style.includes("Spiritual")) selectedRecommendation = recommendations[2];
    if (data.occasion === "Engagement") selectedRecommendation = recommendations[0];
    if (data.budget.includes("₹12,50,000+")) selectedRecommendation = recommendations[2];
    
    setRecommendation(selectedRecommendation);
    setIsLoading(false);
  };

  const resetRecommendation = () => {
    setCurrentStep(0);
    setRecommendationData({
      style: "",
      budget: "",
      occasion: "",
      metal: "",
      gemstone: ""
    });
    setRecommendation(null);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-poppins font-semibold rounded-full shadow-gold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <span className="relative z-10 flex items-center gap-2">
          🤖 AI Ring Assistant
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-[#B8941F] to-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-gold">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-playfair text-3xl font-bold gold-gradient">
                  AI Ring Assistant
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm font-poppins text-gray-600 mb-2">
                  <span>Step {currentStep + 1} of {questions.length}</span>
                  <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Questions */}
              {!recommendation && !isLoading && (
                <div className="mb-8">
                  <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-6">
                    {questions[currentStep].question}
                  </h3>
                  <div className="space-y-3">
                    {questions[currentStep].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(
                          Object.keys(recommendationData)[currentStep] as keyof RecommendationData,
                          option
                        )}
                        className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-[#D4AF37] hover:bg-[#F4E4BC]/20 transition-all duration-300 font-poppins"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mb-4"></div>
                  <p className="font-poppins text-gray-600">AI is analyzing your preferences...</p>
                  <p className="font-poppins text-sm text-gray-500 mt-2">Finding your perfect ring match</p>
                </div>
              )}

              {/* Recommendation Result */}
              {recommendation && !isLoading && (
                <div className="text-center">
                  <div className="text-8xl mb-6">{recommendation.image}</div>
                  <h3 className="font-playfair text-3xl font-bold gold-gradient mb-4">
                    {recommendation.style}
                  </h3>
                  <p className="font-poppins text-gray-600 mb-6 leading-relaxed">
                    {recommendation.description}
                  </p>
                  
                  <div className="bg-gradient-to-r from-[#F4E4BC] to-[#D4AF37] rounded-2xl p-6 mb-6">
                    <p className="font-poppins font-semibold text-gray-800 mb-2">Price Range</p>
                    <p className="font-playfair text-2xl font-bold text-gray-800">
                      {recommendation.priceRange}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-poppins font-semibold text-gray-800 mb-4">Key Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {recommendation.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                          <span className="font-poppins text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-poppins font-semibold rounded-full">
                      View Similar Rings
                    </button>
                    <button 
                      onClick={resetRecommendation}
                      className="flex-1 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-poppins font-semibold rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
                    >
                      Try Again
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
