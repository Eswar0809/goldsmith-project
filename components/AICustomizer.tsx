"use client";

import { useState } from "react";
import { formatINR } from "../utils/currency";

export default function AICustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesign, setGeneratedDesign] = useState<any>(null);
  const [designHistory, setDesignHistory] = useState<any[]>([]);

  const examplePrompts = [
    "A rose gold ring with a diamond in a leaf pattern",
    "Vintage emerald ring with art deco geometric design",
    "Modern minimalist ring with a single sapphire",
    "Classic engagement ring with halo setting",
    "Antique-inspired ring with intricate filigree work"
  ];

  const generateDesign = async () => {
    if (!description.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // In a real implementation, this would:
    // 1. Send description to AI model (GPT-4, Claude, etc.)
    // 2. Generate 3D model using Blender API or similar
    // 3. Apply materials and textures
    // 4. Render preview images
    
    // For demo, we'll simulate the result
    const mockDesign = {
      id: Date.now(),
      description: description,
      image: "🎨", // In real implementation, this would be a 3D render
      materials: extractMaterials(description),
      style: extractStyle(description),
      estimatedPrice: generatePrice(description),
      features: extractFeatures(description),
      createdAt: new Date().toISOString()
    };
    
    setGeneratedDesign(mockDesign);
    setDesignHistory(prev => [mockDesign, ...prev.slice(0, 4)]);
    setIsGenerating(false);
  };

  const extractMaterials = (desc: string) => {
    const materials = [];
    if (desc.toLowerCase().includes('gold')) materials.push('18K Gold');
    if (desc.toLowerCase().includes('rose gold')) materials.push('Rose Gold');
    if (desc.toLowerCase().includes('platinum')) materials.push('Platinum');
    if (desc.toLowerCase().includes('diamond')) materials.push('Diamond');
    if (desc.toLowerCase().includes('emerald')) materials.push('Emerald');
    if (desc.toLowerCase().includes('sapphire')) materials.push('Sapphire');
    if (desc.toLowerCase().includes('ruby')) materials.push('Ruby');
    return materials.length ? materials : ['18K Gold', 'Diamond'];
  };

  const extractStyle = (desc: string) => {
    if (desc.toLowerCase().includes('vintage') || desc.toLowerCase().includes('antique')) return 'Vintage';
    if (desc.toLowerCase().includes('modern') || desc.toLowerCase().includes('minimalist')) return 'Modern';
    if (desc.toLowerCase().includes('classic')) return 'Classic';
    if (desc.toLowerCase().includes('art deco')) return 'Art Deco';
    return 'Contemporary';
  };

  const extractFeatures = (desc: string) => {
    const features = [];
    if (desc.toLowerCase().includes('halo')) features.push('Halo Setting');
    if (desc.toLowerCase().includes('filigree')) features.push('Filigree Work');
    if (desc.toLowerCase().includes('leaf')) features.push('Leaf Motif');
    if (desc.toLowerCase().includes('geometric')) features.push('Geometric Design');
    if (desc.toLowerCase().includes('solitaire')) features.push('Solitaire Setting');
    return features.length ? features : ['Custom Design'];
  };

  const generatePrice = (desc: string) => {
    let basePrice = 207500; // ₹2,07,500 base price
    if (desc.toLowerCase().includes('platinum')) basePrice += 83000;
    if (desc.toLowerCase().includes('diamond')) basePrice += 166000;
    if (desc.toLowerCase().includes('emerald') || desc.toLowerCase().includes('sapphire')) basePrice += 124500;
    if (desc.toLowerCase().includes('filigree') || desc.toLowerCase().includes('intricate')) basePrice += 66400;
    return `${formatINR(basePrice)} - ${formatINR(basePrice * 2)}`;
  };

  const useExamplePrompt = (prompt: string) => {
    setDescription(prompt);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      >
        🎨 AI Customizer
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-gold">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-playfair text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                  AI Ring Customizer
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Description Input */}
              <div className="mb-8">
                <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                  Describe Your Dream Ring
                </h3>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your ideal ring... e.g., 'A rose gold ring with a diamond in a leaf pattern'"
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#D4AF37] focus:outline-none font-poppins resize-none"
                  rows={4}
                />
                
                {/* Example Prompts */}
                <div className="mt-4">
                  <p className="font-poppins text-sm text-gray-600 mb-2">Try these examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {examplePrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => useExamplePrompt(prompt)}
                        className="px-3 py-1 bg-gray-100 hover:bg-[#F4E4BC] text-gray-700 rounded-full text-sm font-poppins transition-colors duration-200"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateDesign}
                  disabled={!description.trim() || isGenerating}
                  className="mt-4 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-poppins font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
                >
                  {isGenerating ? 'Generating...' : '✨ Generate Design'}
                </button>
              </div>

              {/* Generation Progress */}
              {isGenerating && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mb-6"></div>
                  <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
                    AI is Creating Your Design
                  </h3>
                  <div className="space-y-2">
                    <p className="font-poppins text-gray-600">🧠 Analyzing your description...</p>
                    <p className="font-poppins text-gray-600">🎨 Generating 3D model...</p>
                    <p className="font-poppins text-gray-600">💎 Applying materials and textures...</p>
                    <p className="font-poppins text-gray-600">✨ Rendering final preview...</p>
                  </div>
                </div>
              )}

              {/* Generated Design */}
              {generatedDesign && !isGenerating && (
                <div className="border-t pt-8">
                  <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-6">
                    Your Custom Design
                  </h3>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Design Preview */}
                    <div className="text-center">
                      <div className="w-full h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-4">
                        <div className="text-8xl">{generatedDesign.image}</div>
                      </div>
                      <p className="font-poppins text-sm text-gray-600 italic">
                        "3D render of your custom design"
                      </p>
                    </div>

                    {/* Design Details */}
                    <div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-poppins font-semibold text-gray-800 mb-2">Style</h4>
                          <p className="font-poppins text-gray-600">{generatedDesign.style}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-poppins font-semibold text-gray-800 mb-2">Materials</h4>
                          <div className="flex flex-wrap gap-2">
                            {generatedDesign.materials.map((material: string, index: number) => (
                              <span key={index} className="px-3 py-1 bg-[#F4E4BC] text-gray-700 rounded-full text-sm font-poppins">
                                {material}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-poppins font-semibold text-gray-800 mb-2">Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {generatedDesign.features.map((feature: string, index: number) => (
                              <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-poppins">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-[#F4E4BC] to-[#D4AF37] rounded-2xl p-4">
                          <h4 className="font-poppins font-semibold text-gray-800 mb-2">Estimated Price</h4>
                          <p className="font-playfair text-2xl font-bold text-gray-800">
                            {generatedDesign.estimatedPrice}
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <button className="flex-1 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-poppins font-semibold rounded-full">
                            Request Quote
                          </button>
                          <button className="flex-1 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-poppins font-semibold rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
                            Save Design
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Design History */}
              {designHistory.length > 0 && (
                <div className="border-t pt-8 mt-8">
                  <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                    Recent Designs
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {designHistory.map((design) => (
                      <div key={design.id} className="bg-gray-50 rounded-2xl p-4">
                        <div className="text-4xl mb-2">{design.image}</div>
                        <p className="font-poppins text-sm text-gray-600 mb-2 line-clamp-2">
                          {design.description}
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          {design.style} • {design.estimatedPrice}
                        </p>
                      </div>
                    ))}
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
