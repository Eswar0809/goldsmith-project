"use client";

import { useState, useEffect } from "react";
import AIRecommendation from "../components/AIRecommendation";
import VirtualTryOn from "../components/VirtualTryOn";
import AICustomizer from "../components/AICustomizer";
import GemstoneAdvisor from "../components/GemstoneAdvisor";
import AIImageEnhancer from "../components/AIImageEnhancer";
import Product3DViewer from "../components/Product3DViewer";
import PersonalizedDashboard from "../components/PersonalizedDashboard";
import AIChatSupport from "../components/AIChatSupport";
import VirtualGiftRecommendation from "../components/VirtualGiftRecommendation";
import RingSizeEstimator from "../components/RingSizeEstimator";
import TryBeforeBuySimulation from "../components/TryBeforeBuySimulation";
import CustomerStoriesSection from "../components/CustomerStoriesSection";
import PaymentAndPriceTracker from "../components/PaymentAndPriceTracker";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-white to-[#F4E4BC]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 marble-bg shadow-soft backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-playfair text-2xl font-extrabold text-black drop-shadow-[0_0_6px_rgba(255,215,0,0.8)]">
              CHITTOJU SRINU
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="font-poppins text-gray-700 hover:text-[#D4AF37] transition-colors">Home</a>
              <a href="#collections" className="font-poppins text-gray-700 hover:text-[#D4AF37] transition-colors">Collections</a>
              <a href="#ai-features" className="font-poppins text-gray-700 hover:text-[#D4AF37] transition-colors">AI Features</a>
              <a href="#modern-features" className="font-poppins text-gray-700 hover:text-[#D4AF37] transition-colors">Modern Features</a>
              <a href="#about" className="font-poppins text-gray-700 hover:text-[#D4AF37] transition-colors">About</a>
              <a href="#contact" className="font-poppins text-gray-700 hover:text-[#D4AF37] transition-colors">Contact</a>
            </div>
            <button className="md:hidden text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#D4AF37] to-[#F4E4BC] rounded-full opacity-20 blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-[#F4E4BC] to-[#D4AF37] rounded-full opacity-15 blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-[#D4AF37] to-[#F4E4BC] rounded-full opacity-25 blur-lg animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold mb-6">
              <span className="gold-gradient">Traditional</span>
              <br />
              <span className="text-gray-800">Royal</span>
            </h1>
            <p className="font-poppins text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover the artistry of master goldsmiths. Each piece tells a story of tradition, 
              passion, and timeless elegance that transcends generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <AIRecommendation />
              <VirtualTryOn />
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#D4AF37] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#D4AF37] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section id="collections" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold gold-gradient mb-6">
              Signature Collections
            </h2>
            <p className="font-poppins text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our exquisite collection of traditional Indian rings for both men and women. 
              Each piece embodies the rich heritage of Indian craftsmanship with timeless elegance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Collection 1 - Traditional Women's Rings */}
            <div className="group marble-bg rounded-3xl p-8 shadow-soft hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-full h-64 bg-gradient-to-br from-[#D4AF37] to-[#F4E4BC] rounded-2xl mb-6 flex items-center justify-center">
                <div className="text-6xl">👸</div>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4">Traditional Women's Rings</h3>
              <p className="font-poppins text-gray-600 mb-6">Elegant traditional rings for women featuring intricate Indian designs, precious stones, and timeless craftsmanship.</p>
              <button className="w-full py-3 border border-[#D4AF37] text-[#D4AF37] font-poppins font-semibold rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
                <a href="/collections/traditional-women">View Collection</a>
              </button>
            </div>

            {/* Collection 2 - Traditional Men's Rings */}
            <div className="group marble-bg rounded-3xl p-8 shadow-soft hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-full h-64 bg-gradient-to-br from-[#F4E4BC] to-[#D4AF37] rounded-2xl mb-6 flex items-center justify-center">
                <div className="text-6xl">👑</div>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4">Traditional Men's Rings</h3>
              <p className="font-poppins text-gray-600 mb-6">Bold and masculine traditional rings for men with classic Indian motifs, signet styles, and premium materials.</p>
              <button className="w-full py-3 border border-[#D4AF37] text-[#D4AF37] font-poppins font-semibold rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
                <a href="/collections/traditional-men">View Collection</a>
              </button>
            </div>

            {/* Collection 3 - Wedding & Engagement */}
            <div className="group marble-bg rounded-3xl p-8 shadow-soft hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-full h-64 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl mb-6 flex items-center justify-center">
                <div className="text-6xl">💍</div>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4">Wedding & Engagement</h3>
              <p className="font-poppins text-gray-600 mb-6">Sacred wedding bands and engagement rings with traditional Indian designs, auspicious symbols, and eternal love motifs.</p>
              <button className="w-full py-3 border border-[#D4AF37] text-[#D4AF37] font-poppins font-semibold rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
                <a href="/collections/wedding-engagement">View Collection</a>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section id="ai-features" className="py-20 px-6 bg-gradient-to-br from-[#F5F5F5] via-white to-[#F4E4BC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold gold-gradient mb-6">
              AI-Powered Experience
            </h2>
            <p className="font-poppins text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of jewelry shopping with our cutting-edge AI technology. 
              Get personalized recommendations, try rings virtually, and create custom designs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* AI Recommendation */}
            <div className="text-center p-8 marble-bg rounded-3xl shadow-soft hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4">AI Recommendation</h3>
              <p className="font-poppins text-gray-600 mb-6">Get personalized ring suggestions based on your style, budget, and occasion.</p>
              <AIRecommendation />
            </div>

            {/* Virtual Try-On */}
            <div className="text-center p-8 marble-bg rounded-3xl shadow-soft hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4">Virtual Try-On</h3>
              <p className="font-poppins text-gray-600 mb-6">Upload your hand photo or use your camera to see how rings look on you.</p>
              <VirtualTryOn />
            </div>

            {/* AI Customizer */}
            <div className="text-center p-8 marble-bg rounded-3xl shadow-soft hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4">AI Customizer</h3>
              <p className="font-poppins text-gray-600 mb-6">Describe your dream ring and watch AI bring it to life.</p>
              <AICustomizer />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Smart Advisor */}
            <div className="text-center p-8 marble-bg rounded-3xl shadow-soft hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-6xl mb-4">🧠</div>
              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4">Smart Advisor</h3>
              <p className="font-poppins text-gray-600 mb-6">Learn about gemstones, metals, and get expert advice on materials.</p>
              <GemstoneAdvisor />
            </div>

            {/* AI Image Enhancer */}
            <div className="text-center p-8 marble-bg rounded-3xl shadow-soft hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-4">AI Enhancer</h3>
              <p className="font-poppins text-gray-600 mb-6">Enhance your jewelry photos with AI-powered improvements.</p>
              <AIImageEnhancer />
            </div>
          </div>

          {/* AI Features Highlight */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white px-8 py-4 rounded-full shadow-gold">
              <div className="text-2xl">✨</div>
              <span className="font-poppins font-semibold">Powered by Advanced AI Technology</span>
              <div className="text-2xl">🚀</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Web Features Section */}
      <section id="modern-features" className="py-20 px-6 bg-gradient-to-r from-[#F5F5F5] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold gold-gradient mb-6">
              Modern Web Features
            </h2>
            <p className="font-poppins text-xl text-gray-600 max-w-3xl mx-auto">
              Experience cutting-edge technology with our advanced web features. 
              From 3D viewing to real-time gold pricing, we bring the future of jewelry shopping to you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* 3D Product Viewer */}
            <div className="text-center p-6 marble-bg rounded-3xl shadow-soft hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="font-playfair text-xl font-bold text-gray-800 mb-3">3D Product Viewer</h3>
              <p className="font-poppins text-gray-600 mb-4 text-sm">Rotate, zoom, and inspect rings in 360° detail</p>
              <Product3DViewer />
            </div>

            {/* Personalized Dashboard */}
            <div className="text-center p-6 marble-bg rounded-3xl shadow-soft hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="font-playfair text-xl font-bold text-gray-800 mb-3">Personal Dashboard</h3>
              <p className="font-poppins text-gray-600 mb-4 text-sm">Save designs, wishlist, and ring size history</p>
              <PersonalizedDashboard />
            </div>

            {/* AI Chat Support */}
            <div className="text-center p-6 marble-bg rounded-3xl shadow-soft hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="font-playfair text-xl font-bold text-gray-800 mb-3">AI Chat Support</h3>
              <p className="font-poppins text-gray-600 mb-4 text-sm">Virtual gold expert chatbot for instant answers</p>
              <AIChatSupport />
            </div>

            {/* Gift Recommendation */}
            <div className="text-center p-6 marble-bg rounded-3xl shadow-soft hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="font-playfair text-xl font-bold text-gray-800 mb-3">Gift Recommender</h3>
              <p className="font-poppins text-gray-600 mb-4 text-sm">AI suggests matching earrings and bracelets</p>
              <VirtualGiftRecommendation />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Ring Size Estimator */}
            <div className="text-center p-6 marble-bg rounded-3xl shadow-soft hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">📏</div>
              <h3 className="font-playfair text-xl font-bold text-gray-800 mb-3">Ring Size Estimator</h3>
              <p className="font-poppins text-gray-600 mb-4 text-sm">AI measures ring size from hand photos</p>
              <RingSizeEstimator />
            </div>

            {/* Try Before Buy */}
            <div className="text-center p-6 marble-bg rounded-3xl shadow-soft hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="font-playfair text-xl font-bold text-gray-800 mb-3">Try Before Buy</h3>
              <p className="font-poppins text-gray-600 mb-4 text-sm">Simulate rings with your skin tone and lighting</p>
              <TryBeforeBuySimulation />
            </div>

            {/* Customer Stories */}
            <div className="text-center p-6 marble-bg rounded-3xl shadow-soft hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">📖</div>
              <h3 className="font-playfair text-xl font-bold text-gray-800 mb-3">Customer Stories</h3>
              <p className="font-poppins text-gray-600 mb-4 text-sm">Real stories and photos from happy customers</p>
              <CustomerStoriesSection />
            </div>

            {/* Payment & Gold Tracker */}
            <div className="text-center p-6 marble-bg rounded-3xl shadow-soft hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="font-playfair text-xl font-bold text-gray-800 mb-3">Payment & Gold Tracker</h3>
              <p className="font-poppins text-gray-600 mb-4 text-sm">Secure payment with real-time gold pricing</p>
              <PaymentAndPriceTracker />
            </div>
          </div>

          {/* Technology Showcase */}
          <div className="text-center">
            <div className="inline-flex items-center gap-6 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white px-8 py-6 rounded-full shadow-gold">
              <div className="text-3xl">🚀</div>
              <span className="font-poppins font-semibold text-lg">Powered by Advanced Web Technology</span>
              <div className="text-3xl">⚡</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gradient-to-r from-[#F5F5F5] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-5xl md:text-6xl font-bold gold-gradient mb-8">
                Master Craftsmanship
              </h2>
              <p className="font-poppins text-lg text-gray-600 mb-6 leading-relaxed">
                For over three generations, our family of master goldsmiths has dedicated their lives 
                to the art of jewelry making. Each piece is meticulously crafted using traditional 
                techniques passed down through the ages, combined with modern precision.
              </p>
              <p className="font-poppins text-lg text-gray-600 mb-8 leading-relaxed">
                We believe that true luxury lies not just in the materials we use, but in the passion, 
                skill, and attention to detail that goes into every creation.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="font-playfair text-4xl font-bold gold-gradient mb-2">100+</div>
                  <div className="font-poppins text-gray-600">Years of Tradition</div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-4xl font-bold gold-gradient mb-2">10K+</div>
                  <div className="font-poppins text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-[#D4AF37] to-[#F4E4BC] rounded-3xl shadow-gold flex items-center justify-center">
                <div className="text-8xl opacity-30">⚒️</div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-[#F4E4BC] to-[#D4AF37] rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold gold-gradient mb-8">
            Begin Your Journey
          </h2>
          <p className="font-poppins text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Ready to own a piece of luxury? Contact us to schedule a consultation or explore 
            our exclusive collections.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-poppins font-semibold rounded-full shadow-gold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Schedule Consultation
            </button>
            <button className="px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-poppins font-semibold rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
              Call +91 98765 43210
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 marble-bg border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-playfair text-2xl font-bold gold-gradient mb-4">Luxe Goldsmith</div>
              <p className="font-poppins text-gray-600">Crafting luxury jewelry with timeless elegance and masterful precision.</p>
            </div>
            <div>
              <h3 className="font-poppins font-semibold text-gray-800 mb-4">Collections</h3>
              <ul className="space-y-2">
                <li><a href="#" className="font-poppins text-gray-600 hover:text-[#D4AF37] transition-colors">Engagement Rings</a></li>
                <li><a href="#" className="font-poppins text-gray-600 hover:text-[#D4AF37] transition-colors">Wedding Bands</a></li>
                <li><a href="#" className="font-poppins text-gray-600 hover:text-[#D4AF37] transition-colors">Necklaces</a></li>
                <li><a href="#" className="font-poppins text-gray-600 hover:text-[#D4AF37] transition-colors">Bracelets</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-poppins font-semibold text-gray-800 mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="font-poppins text-gray-600 hover:text-[#D4AF37] transition-colors">Custom Design</a></li>
                <li><a href="#" className="font-poppins text-gray-600 hover:text-[#D4AF37] transition-colors">Repairs</a></li>
                <li><a href="#" className="font-poppins text-gray-600 hover:text-[#D4AF37] transition-colors">Appraisals</a></li>
                <li><a href="#" className="font-poppins text-gray-600 hover:text-[#D4AF37] transition-colors">Consultation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-poppins font-semibold text-gray-800 mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="font-poppins text-gray-600 hover:text-[#D4AF37] transition-colors">Instagram</a></li>
                <li><a href="#" className="font-poppins text-gray-600 hover:text-[#D4AF37] transition-colors">Facebook</a></li>
                <li><a href="#" className="font-poppins text-gray-600 hover:text-[#D4AF37] transition-colors">Pinterest</a></li>
                <li><a href="#" className="font-poppins text-gray-600 hover:text-[#D4AF37] transition-colors">Youtube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="font-poppins text-gray-600">
              © 2024 Luxe Goldsmith. All rights reserved. Crafted with passion and precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
