// ProfilePage.tsx
"use client"
import React, { useState } from 'react';
import { Edit, LogOut, User, Camera, GraduationCap, MapPin, DollarSign, Home } from 'lucide-react';
import BottomNav from '@/src/components/navigation';

// Types
interface ProfileData {
  name: string;
  age: number;
  image: string;
  university: string;
  major: string;
  year: string;
  location: string;
  bio: string;
  lifestyle: string[];
  budget: string;
  preferences: string[];
}

interface Stat {
  label: string;
  value: string;
  icon: string;
}

const TugoProfilePage: React.FC = () => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'John Doe',
    age: 21,
    image: '👨🏾‍🎓',
    university: 'University of Lagos',
    major: 'Computer Science',
    year: '3rd Year',
    location: 'Yaba, Lagos',
    bio: 'Tech enthusiast looking for a clean, organized roommate who values study time but also enjoys weekend hangouts.',
    lifestyle: ['Early Bird', 'Clean', 'Gamer', 'Introvert'],
    budget: '₦50,000 - ₦100,000',
    preferences: ['Shared Room', 'Apartment']
  });

  const stats: Stat[] = [
    { label: 'Matches', value: '24', icon: '❤️' },
    { label: 'Messages', value: '12', icon: '💬' },
    { label: 'Views', value: '156', icon: '👁️' }
  ];

  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white"></div>
              <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-gray-400"></div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Tugo</h2>
          </div>
          <button 
            onClick={() => alert('Logging out...')}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-6 pb-24 sm:pb-28">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          
          {/* Profile Card */}
          <div className="p-4 sm:p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl sm:rounded-3xl">
            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-white/10 flex items-center justify-center text-4xl sm:text-6xl">
                  {profileData.image}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-all">
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Name & Info */}
            <div className="text-center mb-4">
              <h1 className="text-2xl sm:text-3xl font-black mb-2">
                {profileData.name}, {profileData.age}
              </h1>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>{profileData.major}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-2 sm:p-3 bg-white/5 rounded-xl sm:rounded-2xl">
                  <div className="text-xl sm:text-2xl mb-1">{stat.icon}</div>
                  <div className="text-lg sm:text-xl font-bold">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setShowEditModal(true)}
              className="w-full py-2.5 sm:py-3 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all text-sm sm:text-base"
            >
              Edit Profile
            </button>
          </div>

          {/* About Section */}
          <div className="p-4 sm:p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl sm:rounded-3xl space-y-4">
            <h3 className="text-base sm:text-lg font-bold">About Me</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{profileData.bio}</p>
            
            {/* Lifestyle */}
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wide mb-2">Lifestyle</h4>
              <div className="flex flex-wrap gap-2">
                {profileData.lifestyle.map((trait, index) => (
                  <span key={index} className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/10 rounded-full text-xs font-semibold">
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Budget & Preferences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-400 font-semibold">Budget</span>
                </div>
                <p className="text-sm font-bold">{profileData.budget}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Home className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-400 font-semibold">Prefers</span>
                </div>
                <p className="text-sm font-bold">{profileData.preferences.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-gradient-to-b from-white/10 to-white/5 border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden animate-scale-in max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-black">Edit Profile</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({...profileData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-white/30 transition-all text-sm"
                />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProfileData({...profileData, bio: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-white/30 transition-all resize-none text-sm"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData({...profileData, location: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-white/30 transition-all text-sm"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  alert('Profile updated!');
                  setShowEditModal(false);
                }}
                className="w-full py-3 sm:py-4 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all text-sm sm:text-base"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-full py-3 sm:py-4 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-all text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation - Fixed */}
      <BottomNav />

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

        .safe-area-bottom {
          padding-bottom: max(12px, env(safe-area-inset-bottom));
        }
      `}</style>
    </div>
  );
};

export default TugoProfilePage;