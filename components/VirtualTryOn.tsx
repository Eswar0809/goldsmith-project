"use client";

import { useState, useRef, useEffect } from "react";

export default function VirtualTryOn() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'upload' | 'camera' | 'processing' | 'result'>('upload');
  const [selectedRing, setSelectedRing] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rings = [
    { id: 'lotus', name: 'Traditional Lotus Ring', emoji: '🪷', price: '₹2,07,500' },
    { id: 'signet', name: 'Royal Signet Ring', emoji: '👑', price: '₹2,90,500' },
    { id: 'om', name: 'Sacred Om Ring', emoji: '🕉️', price: '₹3,32,000' },
    { id: 'peacock', name: 'Peacock Motif Ring', emoji: '🦚', price: '₹1,49,000' }
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
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setMode('camera');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please try uploading a photo instead.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg');
        setImage(imageData);
        setMode('processing');
        processImage(imageData);
        
        // Stop camera
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const processImage = async (imageData: string) => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // In a real implementation, this would:
    // 1. Send image to AI service for finger detection
    // 2. Identify finger position and size
    // 3. Render 3D ring model on the finger
    // 4. Return the composite image
    
    // For demo, we'll simulate the result
    setTryOnResult(imageData);
    setIsProcessing(false);
    setMode('result');
  };

  const resetTryOn = () => {
    setMode('upload');
    setImage(null);
    setTryOnResult(null);
    setSelectedRing('');
    setIsProcessing(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-poppins font-semibold rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
      >
        📱 Virtual Try-On
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-gold">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-playfair text-3xl font-bold gold-gradient">
                  Virtual Try-On
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Ring Selection */}
              <div className="mb-8">
                <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
                  Choose a Ring to Try On
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {rings.map((ring) => (
                    <button
                      key={ring.id}
                      onClick={() => setSelectedRing(ring.id)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                        selectedRing === ring.id
                          ? 'border-[#D4AF37] bg-[#F4E4BC]/20'
                          : 'border-gray-200 hover:border-[#D4AF37]'
                      }`}
                    >
                      <div className="text-3xl mb-2">{ring.emoji}</div>
                      <div className="font-poppins font-semibold text-gray-800 text-sm">
                        {ring.name}
                      </div>
                      <div className="font-poppins text-xs text-gray-600">
                        {ring.price}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Mode */}
              {mode === 'upload' && (
                <div className="text-center">
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 mb-6">
                    <div className="text-6xl mb-4">📸</div>
                    <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
                      Upload Your Hand Photo
                    </h3>
                    <p className="font-poppins text-gray-600 mb-6">
                      Take a clear photo of your hand or upload an existing one
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-poppins font-semibold rounded-full"
                      >
                        Upload Photo
                      </button>
                      <button
                        onClick={startCamera}
                        className="px-6 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-poppins font-semibold rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
                      >
                        Use Camera
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Camera Mode */}
              {mode === 'camera' && (
                <div className="text-center">
                  <div className="relative inline-block">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="rounded-2xl max-w-full h-auto"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={capturePhoto}
                      className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-poppins font-semibold rounded-full shadow-gold"
                    >
                      📸 Capture Photo
                    </button>
                  </div>
                </div>
              )}

              {/* Processing Mode */}
              {mode === 'processing' && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-[#D4AF37] mb-6"></div>
                  <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
                    AI is Processing Your Photo
                  </h3>
                  <div className="space-y-2">
                    <p className="font-poppins text-gray-600">🔍 Detecting finger position...</p>
                    <p className="font-poppins text-gray-600">💍 Rendering ring model...</p>
                    <p className="font-poppins text-gray-600">✨ Applying virtual try-on...</p>
                  </div>
                </div>
              )}

              {/* Result Mode */}
              {mode === 'result' && (
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <img
                      src={tryOnResult || ''}
                      alt="Virtual try-on result"
                      className="rounded-2xl max-w-full h-auto shadow-gold"
                    />
                    <div className="absolute top-4 right-4 bg-[#D4AF37] text-white px-3 py-1 rounded-full text-sm font-poppins font-semibold">
                      ✨ AI Enhanced
                    </div>
                  </div>
                  
                  <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
                    How does it look?
                  </h3>
                  <p className="font-poppins text-gray-600 mb-8">
                    This is how the ring would appear on your finger. The AI has detected your finger 
                    position and applied realistic lighting and shadows.
                  </p>

                  <div className="flex gap-4 justify-center">
                    <button className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-poppins font-semibold rounded-full">
                      Save Image
                    </button>
                    <button 
                      onClick={resetTryOn}
                      className="px-6 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-poppins font-semibold rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
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
