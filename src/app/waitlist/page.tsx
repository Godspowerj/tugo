"use client"
import React, { useState } from 'react';
import { Users, Shield, MessageSquare } from 'lucide-react';

export default function TugoWaitlist() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header - Evra Style */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 animate-fade-in-down">
        <div className="flex items-center gap-3">
          {/* Logo with two dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-4.5 h-2.5 rounded-full bg-white"></div>
            <div className="w-4.5 h-2.5 rounded-full bg-gray-400"></div>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Tugo
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Learn More
          </button>
          {/* <button className="px-5 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-100 transition-all">
            iOS
          </button> */}
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 grow flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full animate-pulse bg-green-600 "></span>
            <p className="text-sm text-gray-300">Coming Soon  •  Join the Waitlist</p>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight">
              Find Your Perfect Roommate,{' '}
              <span className="text-white">
                Stress-Free.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Tugo is the social platform for students to connect with compatible roommates you'll actually like.
            </p>
          </div>

          {/* Email Input */}
          <div className="max-w-md mx-auto w-full">
            <div className="relative group">
              <div className="absolute -inset-1 bg-white/10 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative flex items-center bg-white/5 backdrop-blur-sm rounded-full border border-white/10 shadow-2xl overflow-hidden">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-transparent text-white placeholder-gray-500 outline-none text-base"
                />
                <button
                  onClick={handleSubmit}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black hover:bg-gray-100 font-bold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 mr-1"
                >
                  Join Waitlist
                </button>
              </div>
            </div>

            {submitted && (
              <div className="mt-4 text-white text-sm font-medium animate-fade-in">
                ✓ You're on the list! We'll notify you when we launch.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              How Tugo Works
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover a seamless and secure way to find your next roommate with our powerful features.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-white/5 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative flex flex-col gap-4 p-8 bg-linear-to-b from-white/5 to-black rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Smart Matching</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Our compatibility algorithm connects you with roommates who share your lifestyle and preferences.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-white/5 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative flex flex-col gap-4 p-8 bg-linear-to-b from-white/5 to-black rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Verified Profiles</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Feel secure with our student verification process, ensuring a safe and trustworthy community.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-white/5 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative flex flex-col gap-4 p-8 bg-linear-to-b from-white/5 to-black rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Seamless Chat</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Get to know potential roommates with our built-in chat before deciding to meet up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-10 border-t border-gray-900">
        <div className="max-w-6xl mx-auto space-y-6">
          <p className="text-center text-gray-600 text-sm">
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