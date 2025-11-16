// ExplorePage.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  MessageCircle,
  Check,
  MapPin,
  GraduationCap,
  DollarSign,
  Home,
  User,
  Send,
} from "lucide-react";

// Types
interface Profile {
  id: number;
  name: string;
  age: number;
  university: string;
  major: string;
  year: string;
  bio: string;
  lookingFor: string;
  lifestyle: string[];
  budget: string;
  preferences: string[];
  location: string;
  matchScore: number;
  image: string;
}

interface DragOffset {
  x: number;
  y: number;
}

interface DragStart {
  x: number;
  y: number;
}

const TugoExploreMatches: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [showMessageModal, setShowMessageModal] = useState<boolean>(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [message, setMessage] = useState<string>("");
  const [dragStart, setDragStart] = useState<DragStart | null>(null);
  const [dragOffset, setDragOffset] = useState<DragOffset>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Sample profiles data
  const profiles: Profile[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 20,
      university: "University of Lagos",
      major: "Computer Science",
      year: "2nd Year",
      bio: "Looking for a clean, organized roommate who values study time but also enjoys weekend hangouts. I love cooking and trying new recipes!",
      lookingFor:
        "A tidy roommate who respects quiet hours during exams. Someone who enjoys good music and occasional movie nights.",
      lifestyle: ["Early Bird", "Clean", "Foodie", "Social"],
      budget: "₦50,000 - ₦100,000",
      preferences: ["Shared Room", "Apartment"],
      location: "Yaba, Lagos",
      matchScore: 92,
      image:
          "https://plus.unsplash.com/premium_photo-1705018501151-4045c97658a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdvbWFufGVufDB8fDB8fHww"
    },
    {
      id: 2,
      name: "Michael Okafor",
      age: 21,
      university: "University of Lagos",
      major: "Engineering",
      year: "3rd Year",
      bio: "Chill guy who loves gaming and tech. Looking for someone who doesn't mind occasional late nights and respects personal space.",
      lookingFor:
        "A laid-back roommate who is okay with gaming sessions. Someone who keeps their space relatively clean and communicates well.",
      lifestyle: ["Night Owl", "Gamer", "Introvert", "Tech Enthusiast"],
      budget: "₦50,000 - ₦100,000",
      preferences: ["Shared Room"],
      location: "Akoka, Lagos",
      matchScore: 85,
      image:
        "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW58ZW58MHx8MHx8fDA%3D,"
    },
    {
      id: 3,
      name: "Amara Williams",
      age: 19,
      university: "University of Lagos",
      major: "Mass Communication",
      year: "1st Year",
      bio: "Outgoing and creative! I love hosting small gatherings and making new friends. Looking for someone with similar energy.",
      lookingFor:
        "An extroverted, social roommate who enjoys activities together. Someone who appreciates a lively environment and good vibes.",
      lifestyle: ["Social Butterfly", "Creative", "Early Bird", "Organized"],
      budget: "₦100,000 - ₦200,000",
      preferences: ["Studio", "Apartment"],
      location: "Surulere, Lagos",
      matchScore: 78,
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tYW58ZW58MHx8MHx8fDA%3D",
    },
  ];

  const currentProfile = profiles[currentCardIndex];

  const handleSkip = (): void => {
    if (currentCardIndex < profiles.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setDragOffset({ x: 0, y: 0 });
    } else {
      alert("No more profiles to show!");
    }
  };

  const handleConnect = (): void => {
    alert(`Connected with ${currentProfile.name}! You can now message them.`);
    if (currentCardIndex < profiles.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleMessage = (): void => {
    setSelectedProfile(currentProfile);
    setShowMessageModal(true);
  };

  const handleSendMessage = (): void => {
    if (message.trim() && selectedProfile) {
      alert(`Message sent to ${selectedProfile.name}: "${message}"`);
      setShowMessageModal(false);
      setMessage("");
      if (currentCardIndex < profiles.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      }
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent): void => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent): void => {
    if (!isDragging || !dragStart) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    setDragOffset({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  };

  const handleDragEnd = (): void => {
    if (!isDragging) return;

    if (dragOffset.x > 100) {
      handleConnect();
    } else if (dragOffset.x < -100) {
      handleSkip();
    }

    setIsDragging(false);
    setDragStart(null);
    setDragOffset({ x: 0, y: 0 });
  };

  if (!currentProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold">No more profiles</h2>
          <p className="text-gray-400">Check back later for new matches!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white"></div>
              <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-gray-400"></div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Tugo
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-gray-400 font-semibold">
            Explore Matches
          </div>
        </div>
      </header>

      {/* Main Card Area */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-4 sm:py-8 pb-28 sm:pb-32">
        <div className="w-full max-w-md">
          {/* Profile Card */}
          <div
            className="relative bg-gradient-to-b from-white/10 to-white/5 rounded-2xl sm:rounded-3xl border border-white/20 overflow-hidden shadow-2xl transition-transform cursor-grab active:cursor-grabbing"
            style={{
              transform: `translate(${dragOffset.x}px, ${
                dragOffset.y
              }px) rotate(${dragOffset.x * 0.05}deg)`,
              opacity: 1 - Math.abs(dragOffset.x) / 300,
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {/* Drag indicators */}
            {isDragging && dragOffset.x > 50 && (
              <div className="absolute inset-0 bg-green-500/20 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-4xl sm:text-6xl animate-bounce">✓</div>
              </div>
            )}
            {isDragging && dragOffset.x < -50 && (
              <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-4xl sm:text-6xl animate-bounce">✕</div>
              </div>
            )}

            {/* Match Score Badge */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/90 backdrop-blur-sm rounded-full">
                <span className="text-black font-bold text-xs sm:text-sm">
                  {currentProfile.matchScore}% Match
                </span>
              </div>
            </div>

            {/* Profile Image/Avatar */}
            <div className="relative h-48 sm:h-64 bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
              <img
                src={currentProfile.image}
                alt="profile"
                width={600} // you can adjust
                height={600} // you can adjust
                className="object-cover w-full h-full"
              />

              <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            {/* Profile Info */}
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {/* Name & Basic Info */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-black mb-2">
                  {currentProfile.name}, {currentProfile.age}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <GraduationCap className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  <span className="text-xs sm:text-sm">
                    {currentProfile.major} • {currentProfile.year}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  <span className="text-xs sm:text-sm">
                    {currentProfile.location}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <h4 className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wide">
                  About
                </h4>
                <p className="text-white text-xs sm:text-sm leading-relaxed">
                  {currentProfile.bio}
                </p>
              </div>

              {/* Looking For */}
              <div className="space-y-2">
                <h4 className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wide">
                  Looking For
                </h4>
                <p className="text-white text-xs sm:text-sm leading-relaxed">
                  {currentProfile.lookingFor}
                </p>
              </div>

              {/* Lifestyle Tags */}
              <div className="space-y-2">
                <h4 className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wide">
                  Lifestyle
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {currentProfile.lifestyle.map((trait, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 rounded-full text-xs font-semibold"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Budget & Preferences */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400" />
                    <span className="text-xs text-gray-400 font-semibold">
                      Budget
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold">
                    {currentProfile.budget}
                  </p>
                </div>
                <div className="p-2.5 sm:p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Home className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400" />
                    <span className="text-xs text-gray-400 font-semibold">
                      Prefers
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold">
                    {currentProfile.preferences.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
            {/* Skip Button */}
            <button
              onClick={handleSkip}
              className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white/10 hover:bg-white/20 border-2 border-white/20 rounded-full transition-all transform hover:scale-110 active:scale-95"
            >
              <X className="w-7 sm:w-8 h-7 sm:h-8 text-red-400" />
            </button>

            {/* Message Button */}
            <button
              onClick={handleMessage}
              className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white/10 hover:bg-white/20 border-2 border-white/20 rounded-full transition-all transform hover:scale-110 active:scale-95"
            >
              <MessageCircle className="w-6 sm:w-7 h-6 sm:h-7 text-blue-400" />
            </button>

            {/* Connect Button */}
            <button
              onClick={handleConnect}
              className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white hover:bg-gray-100 rounded-full transition-all transform hover:scale-110 active:scale-95 shadow-lg"
            >
              <Check className="w-7 sm:w-8 h-7 sm:h-8 text-black" />
            </button>
          </div>

          {/* Swipe Hint */}
          <p className="text-center text-gray-500 text-xs mt-4 sm:mt-6">
            Swipe left to skip • Swipe right to connect
          </p>
        </div>
      </div>

      {/* Bottom Navigation - Fixed at Bottom */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 px-4 sm:px-6 py-3 sm:py-4 bg-black/80 backdrop-blur-lg border-t border-white/10 safe-area-bottom">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {/* Explore - Active */}
          <button className="flex flex-col items-center gap-1 sm:gap-1.5 group min-w-[60px] sm:min-w-[70px]">
            <div className="relative">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white flex items-center justify-center transition-all">
                <svg
                  className="w-5 sm:w-6 h-5 sm:h-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <span className="text-xs font-bold text-white">Explore</span>
          </button>

          {/* Matches */}
          <button
            onClick={() => alert("Navigate to Matches page")}
            className="flex flex-col items-center gap-1 sm:gap-1.5 group min-w-[60px] sm:min-w-[70px]"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all group-hover:scale-110">
              <svg
                className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <span className="text-xs font-semibold text-gray-400 group-hover:text-white transition-colors">
              Matches
            </span>
          </button>

          {/* Profile */}
          <button
            onClick={() => alert("Navigate to Profile page")}
            className="flex flex-col items-center gap-1 sm:gap-1.5 group min-w-[60px] sm:min-w-[70px]"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all group-hover:scale-110">
              <User className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <span className="text-xs font-semibold text-gray-400 group-hover:text-white transition-colors">
              Profile
            </span>
          </button>
        </div>
      </nav>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-gradient-to-b from-white/10 to-white/5 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 sm:space-y-6 animate-scale-in max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-black">
                  Send a Message
                </h3>
                <p className="text-gray-400 text-sm">
                  to {selectedProfile?.name}
                </p>
              </div>
              <button
                onClick={() => setShowMessageModal(false)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Message Suggestions */}
            <div className="space-y-2">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                Quick Messages
              </p>
              <div className="space-y-2">
                {[
                  "Hey! I'd love to learn more about you as a potential roommate 👋",
                  "Your profile looks great! When are you looking to move in?",
                  "Hi! I think we'd be a great match. Let's chat!",
                ].map((quickMsg, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(quickMsg)}
                    className="w-full text-left p-2.5 sm:p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs sm:text-sm transition-colors"
                  >
                    {quickMsg}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Message */}
            <div className="space-y-3">
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                Or write your own
              </label>
              <textarea
                value={message}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setMessage(e.target.value)
                }
                placeholder="Type your message here..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all resize-none text-sm"
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`w-full py-3 sm:py-4 rounded-full font-bold transition-all transform text-sm sm:text-base ${
                message.trim()
                  ? "bg-white text-black hover:bg-gray-100 hover:scale-105 active:scale-95"
                  : "bg-white/20 text-gray-500 cursor-not-allowed"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                Send Message
                <Send className="w-4 sm:w-5 h-4 sm:h-5" />
              </span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        /* Safe area for mobile devices with notches */
        .safe-area-bottom {
          padding-bottom: max(12px, env(safe-area-inset-bottom));
        }

        /* Smooth scrolling for modal */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default TugoExploreMatches;
