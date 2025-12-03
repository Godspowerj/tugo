"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Users, Zap, Sparkles } from 'lucide-react';
import Header from '../component/header';

export default function TugoOnboarding() {
    const [currentScreen, setCurrentScreen] = useState(0);
    const [direction, setDirection] = useState('forward');
    const router = useRouter()

    const screens = [
        {
            id: 0,
            emoji: '🎓',
            headline: 'Welcome to Tugo',
            text: 'Your student life, simplified. Find roommates, make connections, and explore campus living.',
            icon: Sparkles,
            illustration: (
                <div className="relative w-64 h-64 mx-auto">
                    <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute inset-8 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-8xl animate-bounce-slow">🎓</div>
                    </div>
                    <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-white/20 rounded-full animate-float"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
                </div>
            )
        },
        {
            id: 1,
            emoji: '🤝',
            headline: 'Connect with the right people',
            text: 'Create your student profile and discover potential roommates that match your lifestyle and interests.',
            icon: Users,
            illustration: (
                <div className="relative w-72 h-64 mx-auto flex items-center justify-center">
                    {/* Profile Cards */}
                    <div className="absolute left-0 w-40 h-48 bg-linear-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 p-4 transform -rotate-12 hover:rotate-0 transition-transform duration-300 animate-slide-in-left">
                        <div className="w-12 h-12 bg-white/20 rounded-full mb-3"></div>
                        <div className="space-y-2">
                            <div className="w-3/4 h-2 bg-white/20 rounded"></div>
                            <div className="w-1/2 h-2 bg-white/20 rounded"></div>
                        </div>
                    </div>
                    <div className="relative z-10 w-40 h-48 bg-linear-to-br from-white/20 to-white/10 rounded-3xl border border-white/30 p-4 animate-scale-in">
                        <div className="w-12 h-12 bg-white/30 rounded-full mb-3 animate-pulse"></div>
                        <div className="space-y-2">
                            <div className="w-3/4 h-2 bg-white/30 rounded"></div>
                            <div className="w-1/2 h-2 bg-white/30 rounded"></div>
                        </div>
                    </div>
                    <div className="absolute right-0 w-40 h-48 bg-linear-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 p-4 transform rotate-12 hover:rotate-0 transition-transform duration-300 animate-slide-in-right">
                        <div className="w-12 h-12 bg-white/20 rounded-full mb-3"></div>
                        <div className="space-y-2">
                            <div className="w-3/4 h-2 bg-white/20 rounded"></div>
                            <div className="w-1/2 h-2 bg-white/20 rounded"></div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            emoji: '⚡',
            headline: 'Easy, fast setup',
            text: 'Answer a few questions about your preferences, and we\'ll show you the best matches.',
            icon: Zap,
            illustration: (
                <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
                    {/* Progress Steps */}
                    <div className="space-y-6 w-full">
                        <div className="flex items-center gap-4 animate-slide-in-left">
                            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full text-black font-bold">1</div>
                            <div className="flex-1 h-3 bg-white rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-4 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                            <div className="flex items-center justify-center w-12 h-12 bg-white/70 rounded-full text-black font-bold">2</div>
                            <div className="flex-1 h-3 bg-white/70 rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-4 animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
                            <div className="flex items-center justify-center w-12 h-12 bg-white/40 rounded-full text-white font-bold">3</div>
                            <div className="flex-1 h-3 bg-white/40 rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-4 animate-slide-in-left" style={{ animationDelay: '0.6s' }}>
                            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full text-white font-bold">4</div>
                            <div className="flex-1 h-3 bg-white/20 rounded-full"></div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            emoji: '🚀',
            headline: 'Start your journey with Tugo',
            text: 'Set up your student profile today and unlock your campus connections.',
            icon: Sparkles,
            illustration: (
                <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
                    {/* Celebration Icons */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-7xl animate-bounce-slow">🚀</div>
                    </div>
                    <div className="absolute top-10 left-10 text-3xl animate-float">✨</div>
                    <div className="absolute top-20 right-10 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>🎉</div>
                    <div className="absolute bottom-20 left-20 text-3xl animate-float" style={{ animationDelay: '1s' }}>⭐</div>
                    <div className="absolute bottom-10 right-20 text-3xl animate-float" style={{ animationDelay: '1.5s' }}>✨</div>
                    <div className="absolute top-1/2 left-5 text-2xl animate-float" style={{ animationDelay: '0.3s' }}>💫</div>
                    <div className="absolute top-1/2 right-5 text-2xl animate-float" style={{ animationDelay: '0.8s' }}>🌟</div>
                </div>
            )
        }
    ];

    const handleNext = () => {
        setDirection('forward');
        if (currentScreen < screens.length - 1) {
            setCurrentScreen(currentScreen + 1);
        }
    };

    const handlePrev = () => {
        setDirection('backward');
        if (currentScreen > 0) {
            setCurrentScreen(currentScreen - 1);
        }
    };

    const handleGetStarted = () => {
        router.push("/auth/login")
    };

    return (
        <div className="relative flex min-h-screen w-full bg-black text-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Skip Button */}
            <button
                onClick={handleGetStarted}
                className="absolute top-8 right-8 z-20 text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
                Skip
            </button>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
                {/* Logo */}
                <Header />
                {/* Content Container */}
                <div className="w-full max-w-2xl mx-auto space-y-12">
                    {/* Illustration */}
                    <div className={`transition-all duration-500 ${direction === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`} key={currentScreen}>
                        {screens[currentScreen].illustration}
                    </div>

                    {/* Text Content */}
                    <div className={`text-center space-y-4 transition-all duration-500 ${direction === 'forward' ? 'animate-fade-in-up' : 'animate-fade-in-down'}`} key={`text-${currentScreen}`}>
                        <h1 className="text-4xl sm:text-5xl font-black leading-tight">
                            {screens[currentScreen].headline} {screens[currentScreen].emoji}
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
                            {screens[currentScreen].text}
                        </p>
                    </div>

                    {/* Progress Dots */}
                    <div className="flex items-center justify-center gap-2">
                        {screens.map((screen, index) => (
                            <button
                                key={screen.id}
                                onClick={() => {
                                    setDirection(index > currentScreen ? 'forward' : 'backward');
                                    setCurrentScreen(index);
                                }}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentScreen
                                    ? 'w-8 bg-white'
                                    : 'w-2 bg-white/30 hover:bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
                        {currentScreen > 0 ? (
                            <button
                                onClick={handlePrev}
                                className="px-6 py-3 text-gray-400 hover:text-white transition-colors font-medium"
                            >
                                ← Back
                            </button>
                        ) : (
                            <div></div>
                        )}

                        {currentScreen < screens.length - 1 ? (
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95"
                            >
                                Next
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handleGetStarted}
                                className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 animate-pulse-slow"
                            >
                                Enter Tugo
                                <Sparkles className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-15px) translateX(10px); }
          66% { transform: translateY(-5px) translateX(-10px); }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}