"use client";

import { useState, useRef } from "react";

interface SimulationSettings {
  skinTone: 'fair' | 'medium' | 'olive' | 'tan' | 'deep';
  lighting: 'natural' | 'warm' | 'cool' | 'studio';
  environment: 'indoor' | 'outdoor' | 'formal' | 'casual';
}

export default function TryBeforeBuySimulation() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRing, setSelectedRing] = useState<string>('');
  const [simulationSettings, setSimulationSettings] = useState<SimulationSettings>({
    skinTone: 'medium',
    lighting: 'natural',
    environment: 'indoor'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const rings = [
    { id: 'classic', name: 'Classic Solitaire', emoji: '💍', metal: '18K Gold' },
    { id: 'modern', name: 'Modern Halo', emoji: '💎', metal: 'Platinum' },
    { id: 'vintage', name: 'Vintage Art Deco', emoji: '👑', metal: 'Rose Gold' },
    { id: 'minimalist', name: 'Minimalist Band', emoji: '💫', metal: 'White Gold' }
  ];

  const skinTones = [
    { id: 'fair' as const, name: 'Fair', color: '#FDBCB4', description: 'Light complexion with pink undertones' },
    { id: 'medium' as const, name: 'Medium', color: '#E8B4B8', description: 'Medium complexion with neutral undertones' },
    { id: 'olive' as const, name: 'Olive', color: '#D4A574', description: 'Olive complexion with warm undertones' },
    { id: 'tan' as const, name: 'Tan', color: '#C68642', description: 'Tan complexion with golden undertones' },
    { id: 'deep' as const, name: 'Deep', color: '#8D5524', description: 'Deep complexion with rich undertones' }
  ];

  const lightingOptions = [
    { id: 'natural' as const, name: 'Natural Light', icon: '☀️', description: 'Outdoor daylight conditions' },
    { id: 'warm' as const, name: 'Warm Light', icon: '🕯️', description: 'Indoor warm lighting' },
    { id: 'cool' as const, name: 'Cool Light', icon: '💡', description: 'Bright white lighting' },
    { id: 'studio' as const, name: 'Studio Light', icon: '📸', description: 'Professional studio lighting' }
  ];

  const environments = [
    { id: 'indoor' as const, name: 'Indoor', icon: '🏠', description: 'Home or office setting' },
    { id: 'outdoor' as const, name: 'Outdoor', icon: '🌳', description: 'Outdoor natural setting' },
    { id: 'formal' as const, name: 'Formal', icon: '🎩', description: 'Formal event or occasion' },
    { id: 'casual' as const, name: 'Casual', icon: '👕', description: 'Casual everyday setting' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // In a real implementation, this would process the uploaded image
        alert('Photo upload feature would be implemented here for advanced simulation.');
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSimulation = async () => {
    if (!selectedRing) return;

    setIsGenerating(true);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // In a real implementation, this would:
    // 1. Apply skin tone matching to ring appearance
    // 2. Adjust lighting conditions and shadows
    // 3. Apply environment-specific reflections
    // 4. Generate realistic composite image

    setSimulationResult('simulated-result');
    setIsGenerating(false);
  };

  const resetSimulation = () => {
    setSelectedRing('');
    setSimulationSettings({
      skinTone: 'medium',
      lighting: 'natural',
      environment: 'indoor'
    });
    setSimulationResult(null);
    setIsGenerating(false);
  };

  const getRingInfo = (ringId: string) => {
    return rings.find(ring => ring.id === ringId);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      >
        🌟 Try Before Buy
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-gold">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-playfair text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text">
                  Try Before You Buy Simulation
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {!simulationResult ? (
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Ring Selection */}
                  <div>
                    <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                      1. Select Ring to Try
                    </h3>
                    <div className="space-y-3 mb-6">
                      {rings.map((ring) => (
                        <button
                          key={ring.id}
                          onClick={() => setSelectedRing(ring.id)}
                          className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                            selectedRing === ring.id
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-3xl">{ring.emoji}</span>
                            <div>
                              <h4 className="font-poppins font-semibold text-gray-800">
                                {ring.name}
                              </h4>
                              <p className="font-poppins text-sm text-gray-600">
                                {ring.metal}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Custom Photo Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6">
                      <div className="text-center">
                        <div className="text-3xl mb-2">📸</div>
                        <h4 className="font-poppins font-semibold text-gray-800 mb-2">
                          Upload Your Hand Photo
                        </h4>
                        <p className="font-poppins text-sm text-gray-600 mb-4">
                          For more accurate simulation results
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
                          className="px-4 py-2 border border-emerald-500 text-emerald-600 font-poppins font-semibold rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300"
                        >
                          Upload Photo
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Simulation Settings */}
                  <div>
                    <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                      2. Customize Simulation
                    </h3>

                    {/* Skin Tone */}
                    <div className="mb-6">
                      <h4 className="font-poppins font-semibold text-gray-800 mb-3">Skin Tone</h4>
                      <div className="grid grid-cols-5 gap-2">
                        {skinTones.map((tone) => (
                          <button
                            key={tone.id}
                            onClick={() => setSimulationSettings(prev => ({ ...prev, skinTone: tone.id }))}
                            className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                              simulationSettings.skinTone === tone.id
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-gray-200 hover:border-emerald-300'
                            }`}
                            title={tone.description}
                          >
                            <div
                              className="w-8 h-8 rounded-full mx-auto mb-2"
                              style={{ backgroundColor: tone.color }}
                            ></div>
                            <span className="font-poppins text-xs text-gray-600">
                              {tone.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Lighting */}
                    <div className="mb-6">
                      <h4 className="font-poppins font-semibold text-gray-800 mb-3">Lighting</h4>
                      <div className="space-y-2">
                        {lightingOptions.map((light) => (
                          <button
                            key={light.id}
                            onClick={() => setSimulationSettings(prev => ({ ...prev, lighting: light.id }))}
                            className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                              simulationSettings.lighting === light.id
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-gray-200 hover:border-emerald-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{light.icon}</span>
                              <div>
                                <div className="font-poppins font-semibold text-gray-800">
                                  {light.name}
                                </div>
                                <div className="font-poppins text-xs text-gray-600">
                                  {light.description}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Environment */}
                    <div className="mb-6">
                      <h4 className="font-poppins font-semibold text-gray-800 mb-3">Environment</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {environments.map((env) => (
                          <button
                            key={env.id}
                            onClick={() => setSimulationSettings(prev => ({ ...prev, environment: env.id }))}
                            className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                              simulationSettings.environment === env.id
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-gray-200 hover:border-emerald-300'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{env.icon}</span>
                              <div>
                                <div className="font-poppins font-semibold text-gray-800 text-sm">
                                  {env.name}
                                </div>
                                <div className="font-poppins text-xs text-gray-600">
                                  {env.description}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Generate Button */}
                    {selectedRing && (
                      <button
                        onClick={generateSimulation}
                        className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        🌟 Generate Simulation
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Simulation Results */
                <div>
                  {isGenerating ? (
                    <div className="text-center py-12">
                      <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-500 mb-6"></div>
                      <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
                        Generating Your Simulation
                      </h3>
                      <div className="space-y-2">
                        <p className="font-poppins text-gray-600">🎨 Applying skin tone matching...</p>
                        <p className="font-poppins text-gray-600">💡 Adjusting lighting conditions...</p>
                        <p className="font-poppins text-gray-600">🌍 Applying environment reflections...</p>
                        <p className="font-poppins text-gray-600">✨ Finalizing realistic simulation...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-6">
                        Your Personalized Simulation
                      </h3>

                      <div className="grid lg:grid-cols-2 gap-8 mb-8">
                        {/* Simulation Preview */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
                          <div className="text-6xl mb-4">
                            {getRingInfo(selectedRing)?.emoji}
                          </div>
                          <h4 className="font-playfair text-xl font-bold text-gray-800 mb-2">
                            {getRingInfo(selectedRing)?.name}
                          </h4>
                          <div className="space-y-2 text-sm font-poppins text-gray-600">
                            <p>Skin Tone: {skinTones.find(t => t.id === simulationSettings.skinTone)?.name}</p>
                            <p>Lighting: {lightingOptions.find(l => l.id === simulationSettings.lighting)?.name}</p>
                            <p>Environment: {environments.find(e => e.id === simulationSettings.environment)?.name}</p>
                          </div>
                          <div className="mt-4 p-3 bg-emerald-100 rounded-xl">
                            <p className="font-poppins text-sm text-emerald-700">
                              ✨ AI-enhanced simulation showing realistic appearance
                            </p>
                          </div>
                        </div>

                        {/* Simulation Details */}
                        <div className="space-y-6">
                          <div className="bg-white border border-gray-200 rounded-2xl p-6">
                            <h4 className="font-poppins font-semibold text-gray-800 mb-4">Simulation Analysis</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="font-poppins text-gray-600">Metal Appearance:</span>
                                <span className="font-poppins font-semibold text-gray-800">
                                  {simulationSettings.skinTone === 'fair' ? 'Warm & Golden' : 
                                   simulationSettings.skinTone === 'deep' ? 'Rich & Luxurious' : 'Perfectly Balanced'}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-poppins text-gray-600">Lighting Effect:</span>
                                <span className="font-poppins font-semibold text-gray-800">
                                  {simulationSettings.lighting === 'natural' ? 'Natural Shine' :
                                   simulationSettings.lighting === 'studio' ? 'Professional Glow' : 'Ambient Radiance'}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-poppins text-gray-600">Environment Match:</span>
                                <span className="font-poppins font-semibold text-gray-800">
                                  {simulationSettings.environment === 'formal' ? 'Elegant & Sophisticated' : 'Perfect for Occasion'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6">
                            <h4 className="font-poppins font-semibold text-gray-800 mb-3">AI Recommendations</h4>
                            <ul className="space-y-2 text-sm font-poppins text-gray-600">
                              <li>• This ring complements your selected skin tone beautifully</li>
                              <li>• The {getRingInfo(selectedRing)?.metal} will maintain its luster in {lightingOptions.find(l => l.id === simulationSettings.lighting)?.name.toLowerCase()}</li>
                              <li>• Perfect for {environments.find(e => e.id === simulationSettings.environment)?.name.toLowerCase()} occasions</li>
                              <li>• Consider professional cleaning every 6 months</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 justify-center">
                        <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                          💾 Save Simulation
                        </button>
                        <button className="px-8 py-4 border-2 border-emerald-500 text-emerald-600 font-poppins font-semibold rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300">
                          📤 Share Result
                        </button>
                        <button 
                          onClick={resetSimulation}
                          className="px-8 py-4 border-2 border-gray-300 text-gray-600 font-poppins font-semibold rounded-full hover:bg-gray-50 transition-all duration-300"
                        >
                          Try Another
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
