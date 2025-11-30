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

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6">
              <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-3 bg-white/20 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Loading Your Profile</h3>
            <p className="text-sm text-gray-400">Please wait...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !profile) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[80vh] px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
              {error || "Profile Not Found"}
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              {error === "Profile not found"
                ? "You haven't set up your profile yet. Let's get started!"
                : "Something went wrong while loading your profile."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={fetchProfile}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full text-sm font-bold transition-all"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push("/setup")}
                className="px-6 py-3 bg-white text-black rounded-full text-sm font-bold hover:bg-gray-100 transition-all"
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
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white"></div>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gray-400"></div>
                </div>
                <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">Tugo</h1>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                  onClick={() => toast.info("Share feature coming soon!")}
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                  onClick={() => toast.info("Settings coming soon!")}
                  aria-label="Settings"
                >
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          {/* Profile Header Card */}
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Profile Image */}
              <div className="flex justify-center sm:justify-start">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-white/10">
                  {profile.profilePicture ? (
                    <img
                      src={profile.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
                      <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white">
                        {profile.user?.fullName?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-3 sm:space-y-4">
                {/* Name and Edit Button */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 mb-2">
                      <h2 className="text-3xl sm:text-4xl font-black">
                        {profile.user?.fullName || "User"}
                      </h2>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/40">
                        VERIFIED
                      </span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-white/80 text-sm mb-1.5">
                      <GraduationCap className="w-4 h-4 flex-shrink-0" />
                      <span>{profile.major} • {profile.year}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-white/70 text-sm">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{profile.university}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="w-full sm:w-auto px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center sm:justify-start gap-6 sm:gap-8 py-3 sm:py-4 border-y border-white/10">
                  <div className="text-center">
                    <div className="text-2xl font-black">0</div>
                    <div className="text-xs text-white/70">Listings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black">0</div>
                    <div className="text-xs text-white/70">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black flex items-center gap-1 justify-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      5.0
                    </div>
                    <div className="text-xs text-white/70">Rating</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={() => toast.info("Messaging feature coming soon!")}
                    className="flex-1 px-4 py-2.5 sm:py-3 bg-white text-black rounded-full text-sm font-bold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                  <button
                    onClick={() => toast.success("Added to favorites!")}
                    className="px-4 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-bold transition-all flex items-center justify-center"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Column - About & Lifestyle */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* About Section */}
              <div className="rounded-2xl p-4 sm:p-6">
                <h3 className="text-xl font-black mb-3 sm:mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  About Me
                </h3>
                <p className="text-gray-300 leading-relaxed text-base">
                  {profile.bio}
                </p>
              </div>

              {/* Lifestyle */}
              <div className="rounded-2xl p-4 sm:p-6">
                <h3 className="text-xl font-black mb-3 sm:mb-4">My Lifestyle</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {profile.lifestyles.map((lifestyle: string, idx: number) => (
                    <div
                      key={idx}
                      className="px-3 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-xl flex items-center gap-2 hover:bg-white/20 transition"
                    >
                      <span className="text-2xl">
                        {lifestyleIcons[lifestyle] || "✨"}
                      </span>
                      <span className="text-sm font-bold truncate">
                        {getLifestyleLabel(lifestyle).replace(/^[^\s]+\s/, "")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Contact & Verification */}
            <div className="space-y-4 sm:space-y-6">
              {/* Contact Info */}
              <div className="rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg font-black mb-3 sm:mb-4">Contact</h3>
                <div className="space-y-3 sm:space-y-4">
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
                      <div className="text-sm font-semibold truncate">{profile.university}</div>
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
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border-2 border-blue-500/40 p-4 sm:p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white fill-current" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm mb-1">Verified Profile</h4>
                    <p className="text-xs text-gray-300">Verified by Tugo</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/20 space-y-1.5">
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