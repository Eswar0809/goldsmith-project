"use client";

import { useState, useRef } from "react";

export default function AIImageEnhancer() {
  const [isOpen, setIsOpen] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [enhancementType, setEnhancementType] = useState<'lighting' | 'shine' | 'reflection' | 'all'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const enhancementTypes = [
    {
      id: 'lighting' as const,
      name: 'Lighting Enhancement',
      description: 'Improves brightness, contrast, and color balance',
      icon: '💡'
    },
    {
      id: 'shine' as const,
      name: 'Shine Enhancement',
      description: 'Enhances metallic luster and gemstone brilliance',
      icon: '✨'
    },
    {
      id: 'reflection' as const,
      name: 'Reflection Enhancement',
      description: 'Adds realistic reflections and depth',
      icon: '🔮'
    },
    {
      id: 'all' as const,
      name: 'Full Enhancement',
      description: 'Complete AI enhancement for professional results',
      icon: '🎨'
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setEnhancedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const enhanceImage = async () => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // In a real implementation, this would:
    // 1. Send image to AI enhancement service (like Adobe AI, Topaz, or custom model)
    // 2. Apply specific enhancements based on type
    // 3. Return enhanced image
    
    // For demo, we'll simulate the result
    setEnhancedImage(originalImage); // In real app, this would be the enhanced version
    setIsProcessing(false);
  };

  const downloadEnhancedImage = () => {
    if (enhancedImage) {
      const link = document.createElement('a');
      link.download = 'enhanced-jewelry-image.jpg';
      link.href = enhancedImage;
      link.click();
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      >
        📸 AI Enhancer
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-gold">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-playfair text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text">
                  AI Image Enhancer
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Upload Section */}
              {!originalImage && (
                <div className="text-center mb-8">
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12">
                    <div className="text-6xl mb-4">📸</div>
                    <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
                      Upload Your Jewelry Photo
                    </h3>
                    <p className="font-poppins text-gray-600 mb-6">
                      Enhance your jewelry photos with AI-powered improvements
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-poppins font-semibold rounded-full shadow-lg"
                    >
                      Choose Image
                    </button>
                  </div>
                </div>
              )}

              {/* Enhancement Options */}
              {originalImage && !enhancedImage && !isProcessing && (
                <div className="mb-8">
                  <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-6">
                    Choose Enhancement Type
                  </h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {enhancementTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setEnhancementType(type.id)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                          enhancementType === type.id
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">{type.icon}</div>
                        <h4 className="font-poppins font-semibold text-gray-800 mb-2">
                          {type.name}
                        </h4>
                        <p className="font-poppins text-sm text-gray-600">
                          {type.description}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={enhanceImage}
                      className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      🎨 Enhance Image
                    </button>
                    <button
                      onClick={() => setOriginalImage(null)}
                      className="px-8 py-4 border-2 border-gray-300 text-gray-600 font-poppins font-semibold rounded-full hover:bg-gray-50 transition-all duration-300"
                    >
                      Upload Different Image
                    </button>
                  </div>
                </div>
              )}

              {/* Processing State */}
              {isProcessing && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mb-6"></div>
                  <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
                    AI is Enhancing Your Image
                  </h3>
                  <div className="space-y-2">
                    <p className="font-poppins text-gray-600">🔍 Analyzing image composition...</p>
                    <p className="font-poppins text-gray-600">💡 Optimizing lighting and contrast...</p>
                    <p className="font-poppins text-gray-600">✨ Enhancing shine and reflections...</p>
                    <p className="font-poppins text-gray-600">🎨 Applying final enhancements...</p>
                  </div>
                </div>
              )}

              {/* Before/After Comparison */}
              {originalImage && enhancedImage && !isProcessing && (
                <div>
                  <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Enhancement Results
                  </h3>
                  
                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Before */}
                    <div className="text-center">
                      <h4 className="font-poppins font-semibold text-gray-800 mb-4">Before</h4>
                      <div className="relative">
                        <img
                          src={originalImage}
                          alt="Original image"
                          className="w-full h-64 object-cover rounded-2xl shadow-lg"
                        />
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-poppins font-semibold">
                          Original
                        </div>
                      </div>
                    </div>

                    {/* After */}
                    <div className="text-center">
                      <h4 className="font-poppins font-semibold text-gray-800 mb-4">After</h4>
                      <div className="relative">
                        <img
                          src={enhancedImage}
                          alt="Enhanced image"
                          className="w-full h-64 object-cover rounded-2xl shadow-lg"
                        />
                        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-poppins font-semibold">
                          AI Enhanced
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhancement Details */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 mb-8">
                    <h4 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                      Enhancement Applied: {enhancementTypes.find(t => t.id === enhancementType)?.name}
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl mb-2">📈</div>
                        <p className="font-poppins font-semibold text-gray-800">Quality</p>
                        <p className="font-poppins text-sm text-gray-600">Enhanced</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-2">🎨</div>
                        <p className="font-poppins font-semibold text-gray-800">Style</p>
                        <p className="font-poppins text-sm text-gray-600">Professional</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-2">⚡</div>
                        <p className="font-poppins font-semibold text-gray-800">Processing</p>
                        <p className="font-poppins text-sm text-gray-600">AI-Powered</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={downloadEnhancedImage}
                      className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-poppins font-semibold rounded-full shadow-gold hover:shadow-xl transition-all duration-300"
                    >
                      💾 Download Enhanced
                    </button>
                    <button
                      onClick={() => {
                        setOriginalImage(null);
                        setEnhancedImage(null);
                      }}
                      className="px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-poppins font-semibold rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
                    >
                      Enhance Another
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
