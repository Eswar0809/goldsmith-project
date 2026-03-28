"use client";

import { useState, useRef } from "react";

interface SizeResult {
  size: string;
  confidence: number;
  method: string;
  recommendations: string[];
}

export default function RingSizeEstimator() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'upload' | 'camera' | 'manual' | 'processing' | 'result'>('upload');
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sizeResult, setSizeResult] = useState<SizeResult | null>(null);
  const [manualSize, setManualSize] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ringSizes = [
    { size: '4', diameter: '14.9mm', circumference: '46.8mm' },
    { size: '4.5', diameter: '15.3mm', circumference: '48.0mm' },
    { size: '5', diameter: '15.7mm', circumference: '49.3mm' },
    { size: '5.5', diameter: '16.1mm', circumference: '50.6mm' },
    { size: '6', diameter: '16.5mm', circumference: '51.9mm' },
    { size: '6.5', diameter: '16.9mm', circumference: '53.1mm' },
    { size: '7', diameter: '17.3mm', circumference: '54.4mm' },
    { size: '7.5', diameter: '17.7mm', circumference: '55.7mm' },
    { size: '8', diameter: '18.1mm', circumference: '56.9mm' },
    { size: '8.5', diameter: '18.5mm', circumference: '58.2mm' },
    { size: '9', diameter: '18.9mm', circumference: '59.5mm' },
    { size: '9.5', diameter: '19.3mm', circumference: '60.8mm' },
    { size: '10', diameter: '19.7mm', circumference: '62.0mm' },
    { size: '10.5', diameter: '20.1mm', circumference: '63.3mm' },
    { size: '11', diameter: '20.5mm', circumference: '64.6mm' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setMode('processing');
        processImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      // In a real implementation, you would capture the photo here
      alert('Camera feature would be implemented here. For demo, please upload a photo.');
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please try uploading a photo instead.');
    }
  };

  const processImage = async (imageData: string) => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // In a real implementation, this would:
    // 1. Send image to AI service for finger detection
    // 2. Measure finger width using reference objects
    // 3. Calculate ring size based on finger measurements
    // 4. Return confidence score and recommendations
    
    // For demo, we'll simulate a result
    const mockResult: SizeResult = {
      size: '6.5',
      confidence: 87,
      method: 'AI Photo Analysis',
      recommendations: [
        'Consider ordering both 6.5 and 7 for comfort',
        'Finger size can vary throughout the day',
        'Wide bands may need half size larger',
        'Professional fitting recommended for final purchase'
      ]
    };
    
    setSizeResult(mockResult);
    setIsProcessing(false);
    setMode('result');
  };

  const handleManualSizeSelect = (size: string) => {
    setManualSize(size);
    const mockResult: SizeResult = {
      size: size,
      confidence: 100,
      method: 'Manual Selection',
      recommendations: [
        'This is your selected size',
        'Consider trying on similar rings for verification',
        'Professional fitting recommended for final purchase'
      ]
    };
    setSizeResult(mockResult);
    setMode('result');
  };

  const resetEstimator = () => {
    setMode('upload');
    setImage(null);
    setSizeResult(null);
    setManualSize('');
    setIsProcessing(false);
  };

  const getSizeInfo = (size: string) => {
    return ringSizes.find(s => s.size === size);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      >
        📏 Ring Size Estimator
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-gold">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-playfair text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 text-transparent bg-clip-text">
                  AI Ring Size Estimator
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Method Selection */}
              {mode === 'upload' && (
                <div className="text-center">
                  <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-6">
                    Choose Your Measurement Method
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* AI Photo Analysis */}
                    <button
                      onClick={() => setMode('upload')}
                      className="p-6 border-2 border-teal-200 rounded-2xl hover:border-teal-400 hover:bg-teal-50 transition-all duration-300"
                    >
                      <div className="text-4xl mb-4">📸</div>
                      <h4 className="font-poppins font-semibold text-gray-800 mb-2">
                        AI Photo Analysis
                      </h4>
                      <p className="font-poppins text-sm text-gray-600">
                        Upload a photo of your hand with a reference object
                      </p>
                    </button>

                    {/* Camera Measurement */}
                    <button
                      onClick={startCamera}
                      className="p-6 border-2 border-teal-200 rounded-2xl hover:border-teal-400 hover:bg-teal-50 transition-all duration-300"
                    >
                      <div className="text-4xl mb-4">📷</div>
                      <h4 className="font-poppins font-semibold text-gray-800 mb-2">
                        Camera Measurement
                      </h4>
                      <p className="font-poppins text-sm text-gray-600">
                        Use your camera for real-time measurement
                      </p>
                    </button>

                    {/* Manual Selection */}
                    <button
                      onClick={() => setMode('manual')}
                      className="p-6 border-2 border-teal-200 rounded-2xl hover:border-teal-400 hover:bg-teal-50 transition-all duration-300"
                    >
                      <div className="text-4xl mb-4">✋</div>
                      <h4 className="font-poppins font-semibold text-gray-800 mb-2">
                        Manual Selection
                      </h4>
                      <p className="font-poppins text-sm text-gray-600">
                        Select your known ring size
                      </p>
                    </button>
                  </div>

                  {/* Upload Section */}
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12">
                    <div className="text-6xl mb-4">📸</div>
                    <h4 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                      Upload Hand Photo
                    </h4>
                    <p className="font-poppins text-gray-600 mb-6">
                      Take a clear photo of your hand with a coin or ruler for reference
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
                      className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Choose Photo
                    </button>
                  </div>
                </div>
              )}

              {/* Manual Size Selection */}
              {mode === 'manual' && (
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-6 text-center">
                    Select Your Ring Size
                  </h3>
                  
                  <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-3 mb-8">
                    {ringSizes.map((sizeInfo) => (
                      <button
                        key={sizeInfo.size}
                        onClick={() => handleManualSizeSelect(sizeInfo.size)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          manualSize === sizeInfo.size
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-gray-200 hover:border-teal-300'
                        }`}
                      >
                        <div className="font-playfair text-lg font-bold">
                          {sizeInfo.size}
                        </div>
                        <div className="font-poppins text-xs text-gray-600">
                          {sizeInfo.diameter}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setMode('upload')}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-600 font-poppins font-semibold rounded-full hover:bg-gray-50 transition-colors duration-300"
                    >
                      ← Back to Methods
                    </button>
                  </div>
                </div>
              )}

              {/* Processing State */}
              {mode === 'processing' && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-teal-500 mb-6"></div>
                  <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
                    AI is Analyzing Your Photo
                  </h3>
                  <div className="space-y-2">
                    <p className="font-poppins text-gray-600">🔍 Detecting finger position...</p>
                    <p className="font-poppins text-gray-600">📏 Measuring finger width...</p>
                    <p className="font-poppins text-gray-600">🧮 Calculating ring size...</p>
                    <p className="font-poppins text-gray-600">✅ Generating recommendations...</p>
                  </div>
                </div>
              )}

              {/* Results */}
              {mode === 'result' && sizeResult && (
                <div className="text-center">
                  <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-full mb-4">
                      <span className="text-3xl font-playfair font-bold text-teal-600">
                        {sizeResult.size}
                      </span>
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-2">
                      Your Estimated Ring Size
                    </h3>
                    <p className="font-poppins text-gray-600">
                      {sizeResult.method} • {sizeResult.confidence}% Confidence
                    </p>
                  </div>

                  {/* Size Details */}
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 mb-8">
                    <h4 className="font-poppins font-semibold text-gray-800 mb-4">Size Details</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="font-playfair text-xl font-bold text-teal-600">
                          {getSizeInfo(sizeResult.size)?.diameter}
                        </div>
                        <div className="font-poppins text-sm text-gray-600">Inner Diameter</div>
                      </div>
                      <div className="text-center">
                        <div className="font-playfair text-xl font-bold text-teal-600">
                          {getSizeInfo(sizeResult.size)?.circumference}
                        </div>
                        <div className="font-poppins text-sm text-gray-600">Circumference</div>
                      </div>
                      <div className="text-center">
                        <div className="font-playfair text-xl font-bold text-teal-600">
                          {sizeResult.confidence}%
                        </div>
                        <div className="font-poppins text-sm text-gray-600">Confidence</div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
                    <h4 className="font-poppins font-semibold text-gray-800 mb-4">Recommendations</h4>
                    <ul className="space-y-2">
                      {sizeResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-teal-500 mt-1">•</span>
                          <span className="font-poppins text-gray-600">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-center">
                    <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                      💾 Save to Profile
                    </button>
                    <button 
                      onClick={resetEstimator}
                      className="px-8 py-4 border-2 border-teal-500 text-teal-600 font-poppins font-semibold rounded-full hover:bg-teal-500 hover:text-white transition-all duration-300"
                    >
                      Measure Again
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
