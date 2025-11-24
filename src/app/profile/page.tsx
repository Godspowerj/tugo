"use client"
import React, { useState } from "react";
import {
  GraduationCap,
  MapPin,
  Edit,
  Settings,
  Home,
  Bed,
  Users,
  Star,
  CheckCircle,
  MessageCircle,
  Share2,
  Heart,
  Calendar,
  Mail,
  Phone,
  Sparkles,
  ChevronRight,
  Eye,
} from "lucide-react";

const TugoProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Sample profile data
  const profileData = {
    name: "Sarah Johnson",
    profileImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    university: "University of Lagos",
    major: "Computer Science",
    year: "2nd Year",
    bio: "I'm a 2nd year Computer Science student who loves gaming and coding. I'm looking for a chill roommate who respects quiet study time but is down for weekend hangouts!",
    lifestyle: [
      "Early Bird",
      "Clean",
      "Foodie",
      "Gamer",
      "Social Butterfly",
      "Fitness Enthusiast",
    ],
    location: "Yaba, Lagos",
    email: "sarah.j@unilag.edu.ng",
    phone: "+234 801 234 5678",
    verified: true,
    joinedDate: "November 2024",
    listingsCount: 3,
    viewsCount: 248,
  };

  const lifestyleIcons: Record<string, string> = {
    "Early Bird": "🌅",
    "Night Owl": "🌙",
    "Social Butterfly": "🎉",
    "Quiet & Focused": "📚",
    "Super Clean": "✨",
    Relaxed: "😌",
    "Fitness Enthusiast": "💪",
    Foodie: "🍕",
    Minimalist: "🎨",
    "Pet Lover": "🐕",
    Gamer: "🎮",
    Creative: "🎨",
    Clean: "✨",
  };

  // Sample listings
  const myListings = [
    {
      id: "1",
      type: "roommate",
      title: "Looking for Clean Roommate",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop",
      status: "active",
      views: 124,
    },
    {
      id: "2",
      type: "bunkmate",
      title: "Female Bunkmate Needed",
      price: 200,
      image:
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&h=200&fit=crop",
      status: "active",
      views: 89,
    },
    {
      id: "3",
      type: "rental",
      title: "Studio Apartment Available",
      price: 600,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop",
      status: "inactive",
      views: 35,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="z-10 bg-black/80 backdrop-blur-xl border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
              </div>
              <h1 className="text-xl font-black text-white tracking-tight">
                Tugo
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded-lg transition">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 pb-24">
        {/* Profile Header Section */}
        <div className="bg-linear-to-b from-white/10 to-white/5 rounded-3xl border border-white/20 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="relative shrink-0">
              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0">
                <img
                  src={profileData.profileImage}
                  alt={profileData.name}
                  className="w-full h-full rounded-3xl object-cover border-4 border-white/20"
                />
                {profileData.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2 border-4 border-black">
                    <CheckCircle className="w-6 h-6 text-white fill-current" />
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="text-2xl md:text-4xl font-black">
                      {profileData.name}
                    </h2>
                    {profileData.verified && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/40">
                        VERIFIED
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>
                      {profileData.major} • {profileData.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{profileData.university}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-bold transition-all flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit Profile</span>
                  <span className="sm:hidden">Edit</span>
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-4 md:gap-6 py-4 border-y border-white/10 justify-center md:justify-start">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-black">
                    {profileData.listingsCount}
                  </div>
                  <div className="text-xs text-gray-400">Listings</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-black">
                    {profileData.viewsCount}
                  </div>
                  <div className="text-xs text-gray-400">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-black flex items-center gap-1 justify-center">
                    <Star className="w-4 md:w-5 h-4 md:h-5 text-yellow-400 fill-yellow-400" />
                    4.9
                  </div>
                  <div className="text-xs text-gray-400">Rating</div>
                </div>
              </div>


              {/* <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </button>
                <button className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-bold transition-all flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-linear-to-b from-white/10 to-white/5 rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                About Me
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {profileData.bio}
              </p>
            </div>

            {/* Lifestyle */}
            <div className="bg-linear-to-b from-white/10 to-white/5 rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-black mb-4">My Lifestyle</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {profileData.lifestyle.map((trait, idx) => (
                  <div
                    key={idx}
                    className="px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-xl flex items-center gap-2 md:gap-3 hover:bg-white/20 transition"
                  >
                    <span className="text-xl md:text-2xl">
                      {lifestyleIcons[trait] || "✨"}
                    </span>
                    <span className="text-xs md:text-sm font-bold">{trait}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* My Listings */}
            <div className="bg-linear-to-b from-white/10 to-white/5 rounded-2xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black">My Listings</h3>
                <button className="text-xs md:text-sm font-bold text-gray-400 hover:text-white transition flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {myListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="flex gap-3 md:gap-4 bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 hover:border-white/30 transition group"
                  >
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-bold text-sm line-clamp-1">
                          {listing.title}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-black flex-shrink-0 ${
                            listing.status === "active"
                              ? "bg-green-500/20 text-green-400 border border-green-500/40"
                              : "bg-gray-500/20 text-gray-400 border border-gray-500/40"
                          }`}
                        >
                          {listing.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 md:gap-4 text-xs text-gray-400 flex-wrap">
                        <span className="flex items-center gap-1">
                          {listing.type === "roommate" && <Users className="w-3 h-3" />}
                          {listing.type === "bunkmate" && <Bed className="w-3 h-3" />}
                          {listing.type === "rental" && <Home className="w-3 h-3" />}
                          {listing.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {listing.views}
                        </span>
                        <span className="font-bold text-white">
                          ₦{listing.price}/mo
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-black mb-4">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400">Email</div>
                    <div className="text-sm font-semibold truncate">
                      {profileData.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400">Phone</div>
                    <div className="text-sm font-semibold">{profileData.phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400">Location</div>
                    <div className="text-sm font-semibold">{profileData.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400">Member Since</div>
                    <div className="text-sm font-semibold">{profileData.joinedDate}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
      `}</style>
    </div>
  );
};

export default TugoProfilePage;