"use client"
import React, { useState } from 'react';
import { Users, Shield, MessageSquare, ShoppingBag, Store, Sparkles, Home, TrendingUp, Heart } from 'lucide-react';
import { waitlistApi } from '../../api/waitlistApi';

export default function TugoWaitlist() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (email) {
      setLoading(true);
      setError('');
      setMessage('');

      try {
        const response = await waitlistApi.joinWaitlist(email);

        if (response.success) {
          setSubmitted(true);
          setEmail('');
          setMessage(response.message || "You're on the list! We'll notify you when we launch.");
          setTimeout(() => setSubmitted(false), 5000);
        } else {
          setError(response.error || response.message || 'Something went wrong. Please try again.');
        }
      } catch (err) {
        setError('Failed to join waitlist. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-black text-white overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 animate-fade-in-down">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white"></div>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gray-400"></div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Tugo
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-colors"
            type="button"
          >
            Learn More
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 grow flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-in-up w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full animate-pulse bg-green-600"></span>
            <p className="text-xs sm:text-sm text-gray-300">Coming Soon • Join the Waitlist</p>
          </div>

          {/* Main Heading */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight px-4">
              Your Complete{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Student Hub
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
              Find roommates, buy & sell student essentials, and discover local businesses — all in one platform built exclusively for students.
            </p>
          </div>

          {/* Email Input */}
          <div className="max-w-md mx-auto w-full px-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-full border border-white/10 shadow-2xl overflow-hidden gap-2 sm:gap-0 p-2 sm:p-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email"
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-transparent text-white placeholder-gray-500 outline-none text-sm sm:text-base rounded-xl sm:rounded-none"
                  disabled={loading}
                />
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 font-bold rounded-xl sm:rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 sm:mr-1 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {loading ? 'Joining...' : 'Join Waitlist'}
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-4 text-red-400 text-xs sm:text-sm font-medium animate-fade-in">
                {error}
              </div>
            )}

            {submitted && (
              <div className="mt-4 text-green-400 text-xs sm:text-sm font-medium animate-fade-in">
                ✓ {message}
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-6 sm:pt-8 text-xs sm:text-sm text-gray-400 px-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              <span>Smart Matching</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
              <span>Verified Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400" />
              <span>Safe & Trusted</span>
            </div>
          </div>
        </div>
      </main>

      {/* What You Can Do Section */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
          <div className="text-center space-y-3 sm:space-y-4 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight px-4">
              Everything You Need,{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                One Platform
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              TUGO brings together all the essential tools students need to thrive in campus life.
            </p>
          </div>

          {/* Main Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Roommate Matching */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative flex flex-col gap-4 sm:gap-6 p-6 sm:p-8 bg-gradient-to-b from-white/10 to-black rounded-2xl sm:rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2 h-full">
                <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 group-hover:scale-110 transition-transform duration-300">
                  <Home className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold">Find Roommates</h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    Connect with compatible roommates through our smart matching algorithm. Filter by lifestyle, major, and preferences to find your perfect match.
                  </p>
                </div>
                <div className="mt-auto pt-3 sm:pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Smart compatibility matching</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Marketplace */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative flex flex-col gap-4 sm:gap-6 p-6 sm:p-8 bg-gradient-to-b from-white/10 to-black rounded-2xl sm:rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2 h-full">
                <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 group-hover:scale-110 transition-transform duration-300">
                  <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold">Student Marketplace</h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    Buy and sell textbooks, furniture, electronics, and more. Connect directly with students on your campus for safe, convenient transactions.
                  </p>
                </div>
                <div className="mt-auto pt-3 sm:pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Campus-exclusive listings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Discovery */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative flex flex-col gap-4 sm:gap-6 p-6 sm:p-8 bg-gradient-to-b from-white/10 to-black rounded-2xl sm:rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2 h-full">
                <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-pink-600 to-rose-600 group-hover:scale-110 transition-transform duration-300">
                  <Store className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold">Discover Local Deals</h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    Find exclusive student discounts and promotions from local businesses. From food to services, save money on everything you need.
                  </p>
                </div>
                <div className="mt-auto pt-3 sm:pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Exclusive student offers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
          <div className="text-center space-y-3 sm:space-y-4 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight px-4">
              Built for Students,{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                By Students
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              We understand student life. That's why TUGO is designed with features that matter most to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-white/5 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative flex flex-col gap-3 sm:gap-4 p-6 sm:p-8 bg-gradient-to-b from-white/5 to-black rounded-2xl sm:rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/10 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-green-400" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold">Verified Students Only</h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    Every user is verified with their university email, ensuring a safe and trustworthy community of real students.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-white/5 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative flex flex-col gap-3 sm:gap-4 p-6 sm:p-8 bg-gradient-to-b from-white/5 to-black rounded-2xl sm:rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/10 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold">Built-in Messaging</h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    Chat directly with potential roommates or sellers without sharing personal contact information until you're ready.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-white/5 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative flex flex-col gap-3 sm:gap-4 p-6 sm:p-8 bg-gradient-to-b from-white/5 to-black rounded-2xl sm:rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/10 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold">Smart Recommendations</h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    Our AI-powered system learns your preferences and suggests the best matches, listings, and deals just for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight px-4">
              Ready to Transform Your{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Student Life?
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Join thousands of students on the waitlist. Be the first to experience TUGO when we launch.
            </p>
          </div>

          <div className="max-w-md mx-auto w-full px-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-full border border-white/10 shadow-2xl overflow-hidden gap-2 sm:gap-0 p-2 sm:p-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email"
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-transparent text-white placeholder-gray-500 outline-none text-sm sm:text-base rounded-xl sm:rounded-none"
                  disabled={loading}
                />
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 font-bold rounded-xl sm:rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 sm:mr-1 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {loading ? 'Joining...' : 'Get Early Access'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-6 py-8 sm:py-10 border-t border-gray-900">
        <div className="max-w-6xl mx-auto space-y-6">
          <p className="text-center text-gray-600 text-xs sm:text-sm">
            © 2024 Tugo. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.2s both;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}