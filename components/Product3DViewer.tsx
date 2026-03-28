"use client";

import { useState, useRef, useEffect } from "react";

interface Product3DViewerProps {
  productId?: string;
  productName?: string;
}

export default function Product3DViewer({ productId = "classic-solitaire", productName = "Classic Solitaire Ring" }: Product3DViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [currentView, setCurrentView] = useState<'front' | 'side' | 'top' | 'back'>('front');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const views = [
    { id: 'front' as const, name: 'Front View', icon: '👁️' },
    { id: 'side' as const, name: 'Side View', icon: '👀' },
    { id: 'top' as const, name: 'Top View', icon: '🔍' },
    { id: 'back' as const, name: 'Back View', icon: '👁️‍🗨️' }
  ];

  useEffect(() => {
    if (autoRotate && isOpen) {
      const interval = setInterval(() => {
        setRotation(prev => ({
          ...prev,
          y: prev.y + 1
        }));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [autoRotate, isOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(3, prev * delta)));
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setZoom(1);
    setCurrentView('front');
  };

  const setView = (view: typeof currentView) => {
    setCurrentView(view);
    setAutoRotate(false);
    switch (view) {
      case 'front':
        setRotation({ x: 0, y: 0 });
        break;
      case 'side':
        setRotation({ x: 0, y: 90 });
        break;
      case 'top':
        setRotation({ x: -90, y: 0 });
        break;
      case 'back':
        setRotation({ x: 0, y: 180 });
        break;
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      >
        🎮 3D Viewer
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-gold">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="font-playfair text-2xl font-bold gold-gradient">
                3D Product Viewer - {productName}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="flex h-[calc(90vh-120px)]">
              {/* 3D Canvas Area */}
              <div className="flex-1 relative bg-gradient-to-br from-gray-50 to-gray-100">
                <div
                  className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onWheel={handleWheel}
                >
                  {/* 3D Ring Model (Simulated) */}
                  <div
                    className="relative"
                    style={{
                      transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
                      transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                    }}
                  >
                    <div className="w-64 h-64 bg-gradient-to-br from-[#D4AF37] via-[#FFD700] to-[#B8941F] rounded-full shadow-2xl relative">
                      {/* Ring Base */}
                      <div className="absolute inset-8 bg-gradient-to-br from-[#FFD700] to-[#D4AF37] rounded-full border-4 border-white shadow-inner"></div>
                      
                      {/* Diamond */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-full shadow-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full shadow-inner"></div>
                      </div>
                      
                      {/* Reflections */}
                      <div className="absolute top-2 left-4 w-12 h-2 bg-white/30 rounded-full blur-sm"></div>
                      <div className="absolute bottom-8 right-4 w-8 h-1 bg-white/20 rounded-full blur-sm"></div>
                    </div>
                  </div>
                </div>

                {/* 3D Controls Overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
                      autoRotate ? 'bg-[#D4AF37] text-white' : 'bg-white text-gray-600'
                    }`}
                    title="Auto Rotate"
                  >
                    🔄
                  </button>
                  <button
                    onClick={resetView}
                    className="p-3 bg-white text-gray-600 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-300"
                    title="Reset View"
                  >
                    🎯
                  </button>
                </div>

                {/* Zoom Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={() => setZoom(prev => Math.min(3, prev * 1.2))}
                    className="p-3 bg-white text-gray-600 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-300"
                    title="Zoom In"
                  >
                    ➕
                  </button>
                  <button
                    onClick={() => setZoom(prev => Math.max(0.5, prev * 0.8))}
                    className="p-3 bg-white text-gray-600 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-300"
                    title="Zoom Out"
                  >
                    ➖
                  </button>
                </div>

                {/* View Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {views.map((view) => (
                    <button
                      key={view.id}
                      onClick={() => setView(view.id)}
                      className={`p-2 rounded-full shadow-lg transition-all duration-300 ${
                        currentView === view.id
                          ? 'bg-[#D4AF37] text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                      title={view.name}
                    >
                      {view.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details Panel */}
              <div className="w-80 bg-gray-50 p-6 overflow-y-auto">
                <h3 className="font-playfair text-xl font-bold text-gray-800 mb-4">
                  Product Details
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-poppins font-semibold text-gray-800 mb-2">Materials</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="font-poppins text-gray-600">Metal:</span>
                        <span className="font-poppins text-gray-800">18K Gold</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-poppins text-gray-600">Stone:</span>
                        <span className="font-poppins text-gray-800">Diamond (1.0ct)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-poppins text-gray-600">Setting:</span>
                        <span className="font-poppins text-gray-800">Prong</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-poppins font-semibold text-gray-800 mb-2">Specifications</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="font-poppins text-gray-600">Ring Size:</span>
                        <span className="font-poppins text-gray-800">6-11</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-poppins text-gray-600">Width:</span>
                        <span className="font-poppins text-gray-800">2mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-poppins text-gray-600">Weight:</span>
                        <span className="font-poppins text-gray-800">3.2g</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#F4E4BC] to-[#D4AF37] rounded-2xl p-4">
                    <h4 className="font-poppins font-semibold text-gray-800 mb-2">Price</h4>
                    <p className="font-playfair text-2xl font-bold text-gray-800">
                      ₹3,73,500
                    </p>
                    <p className="font-poppins text-sm text-gray-600">
                      Free shipping & lifetime warranty
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-poppins font-semibold rounded-full shadow-gold hover:shadow-xl transition-all duration-300">
                      Add to Cart
                    </button>
                    <button className="w-full py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-poppins font-semibold rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
                      Save to Wishlist
                    </button>
                    <button className="w-full py-3 border-2 border-gray-300 text-gray-600 font-poppins font-semibold rounded-full hover:bg-gray-50 transition-all duration-300">
                      Share 3D View
                    </button>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-poppins font-semibold text-gray-800 mb-2">3D Controls</h4>
                    <div className="space-y-2 text-sm font-poppins text-gray-600">
                      <p>• Drag to rotate</p>
                      <p>• Scroll to zoom</p>
                      <p>• Click views for quick angles</p>
                      <p>• Auto-rotate toggle available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
