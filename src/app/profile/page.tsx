// app/profile/page.tsx
// Fixed Profile Page with proper loading and error handling

"use client";
import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  MapPin,
  Edit,
  Settings,
  Star,
  CheckCircle,
  MessageCircle,
  Share2,
  Heart,
  Calendar,
  Mail,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { profileApi, ProfileResponse, getLifestyleLabel } from "@/src/api/profileApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ProfileEditModal from "@/src/component/ProfileEditModel";
import MainLayout from "@/src/component/MainLayout";

const TugoProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await profileApi.getProfile();

      if (response.success && response.data) {
        setProfile(response.data);
      } else {
        setError(response.message || "Profile not found");
        toast.error("Profile not found. Please complete your profile setup.");
      }
    } catch (err: any) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile");
      toast.error("Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdated = (updatedProfile: ProfileResponse) => {
    setProfile(updatedProfile);
    toast.success("Profile updated successfully!");
  };

  // Lifestyle icons mapping
  const lifestyleIcons: Record<string, string> = {
    "early-bird": "🌅",
    "night-owl": "🌙",
    "social": "🎉",
    "introvert": "📚",
    "clean": "✨",
    "relaxed": "😌",
    "fitness": "💪",
    "foodie": "🍕",
    "minimalist": "🎨",
    "pet-lover": "🐾",
    "gamer": "🎮",
    "creative": "🎭",
  };

  // Loading state with nice spinner
  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-3 bg-white/20 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Loading Your Profile</h3>
            <p className="text-gray-400">Please wait...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Error state with retry option
  if (error || !profile) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[80vh] px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">
              {error || "Profile Not Found"}
            </h3>
            <p className="text-gray-400 mb-6">
              {error === "Profile not found"
                ? "You haven't set up your profile yet. Let's get started!"
                : "Something went wrong while loading your profile."}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={fetchProfile}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full font-bold transition-all"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push("/setup")}
                className="px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all"
              >
                Setup Profile
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <>
      <MainLayout>
        {/* Header */}
        <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
                </div>
                <h1 className="text-xl font-black text-white tracking-tight">Tugo</h1>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                  onClick={() => toast.info("Share feature coming soon!")}
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                  onClick={() => toast.info("Settings coming soon!")}
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4">
          {/* Profile Header Section */}
            <div className="pt-10 pb-8 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-3xl border border-white/20 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Profile Image */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 rounded-full overflow-hidden flex-shrink-0">
                      {profile.profilePicture ? (
                        <img
                          src={profile.profilePicture}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
                          <span className="text-5xl md:text-6xl font-black text-white">
                            {profile.user?.fullName?.charAt(0).toUpperCase() || "U"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h2 className="text-2xl md:text-4xl font-black">
                              {profile.user?.fullName || "User"}
                            </h2>
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/40">
                              VERIFIED
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                            <GraduationCap className="w-4 h-4 flex-shrink-0" />
                            <span>{profile.major} • {profile.year}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/70 text-sm">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span>{profile.university}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setIsEditModalOpen(true)}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-bold transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                        >
                          <Edit className="w-4 h-4" />
                          <span className="hidden sm:inline">Edit Profile</span>
                          <span className="sm:hidden">Edit</span>
                        </button>
                      </div>

                      {/* Stats */}
                      <div className="flex gap-4 md:gap-6 py-4 border-y border-white/10">
                        <div className="text-center">
                          <div className="text-xl md:text-2xl font-black">0</div>
                          <div className="text-xs text-white/70">Listings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl md:text-2xl font-black">0</div>
                          <div className="text-xs text-white/70">Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl md:text-2xl font-black flex items-center gap-1 justify-center">
                            <Star className="w-4 md:w-5 h-4 md:h-5 text-yellow-400 fill-yellow-400" />
                            5.0
                          </div>
                          <div className="text-xs text-white/70">Rating</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => toast.info("Messaging feature coming soon!")}
                          className="flex-1 px-4 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Message
                        </button>
                        <button
                          onClick={() => toast.success("Added to favorites!")}
                          className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-bold transition-all flex items-center justify-center"
                        >
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
        

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-2xl border border-white/20 p-6">
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  About Me
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {profile.bio}
                </p>
              </div>

              {/* Lifestyle */}
              <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-2xl border border-white/20 p-6">
                <h3 className="text-xl font-black mb-4">My Lifestyle</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {profile.lifestyles.map((lifestyle: string, idx: number) => (
                    <div
                      key={idx}
                      className="px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-xl flex items-center gap-2 md:gap-3 hover:bg-white/20 transition"
                    >
                      <span className="text-xl md:text-2xl">
                        {lifestyleIcons[lifestyle] || "✨"}
                      </span>
                      <span className="text-xs md:text-sm font-bold">
                        {getLifestyleLabel(lifestyle).replace(/^[^\s]+\s/, "")}
                      </span>
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
                        {profile.user?.email || "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-400">Location</div>
                      <div className="text-sm font-semibold">{profile.university}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-400">Member Since</div>
                      <div className="text-sm font-semibold">
                        {new Date(profile.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification */}
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border-2 border-blue-500/40 p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white fill-current" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm mb-1">Verified Profile</h4>
                    <p className="text-xs text-gray-300">Verified by Tugo</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/20 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle className="w-3 h-3" />
                    <span>Email verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle className="w-3 h-3" />
                    <span>Student ID verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>

      {/* Edit Modal */}
      {profile && (
        <ProfileEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          currentProfile={profile}
          onProfileUpdated={handleProfileUpdated}
        />
      )}
    </>
  );
};

export default TugoProfilePage;