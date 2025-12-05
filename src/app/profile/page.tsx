"use client";
import React, { useEffect, useState } from "react";
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
  Trash2,        // ← ADD THIS
  DollarSign,
  LogOut,
} from "lucide-react";
import { getLifestyleLabel } from "@/src/api/profileApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ProfileEditModal from "@/src/components/ProfileEditModal";
import MainLayout from "@/src/components/MainLayout";
import PageLoading from "@/src/components/PageLoading";
import ErrorPage from "@/src/components/ErrorPage";
import { useProfile } from "@/src/context/ProfileContext";
import { listingApi, ListingResponse } from "@/src/api/listingApi";
import { useAuth } from "@/src/context/authContext";


const TugoProfilePage = () => {
  const router = useRouter();
  const {
    currentProfile: profile,
    loading,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    fetchProfile,
  } = useProfile();
  const { logout } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [listings, setListings] = useState<ListingResponse[]>([]);
  const [listingsLoading, setListingsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);


  useEffect(() => {
    fetchProfile();
    fetchMyListings();  // ← ADD THIS LINE
  }, []);

  const fetchMyListings = async () => {
    setListingsLoading(true);
    try {
      const result = await listingApi.getMyListings();
      if (result.data) {
        setListings(result.data.listings);
      } else if (result.error) {
        console.error('Error fetching listings:', result.error);
      }
    } catch (err) {
      console.error('Error fetching my listings:', err);
    } finally {
      setListingsLoading(false);
    }
  };
  const handleDeleteListing = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) {
      return;
    }
    setDeletingId(id);
    try {
      const result = await listingApi.deleteListing(id);
      if (result.success) {
        toast.success('Listing deleted successfully!');
        setListings(prev => prev.filter(listing => listing.id !== id));
      } else {
        toast.error(result.error || 'Failed to delete listing');
      }
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete listing');
    } finally {
      setDeletingId(null);
    }
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
      <MainLayout fullWidth={true}>
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
      <MainLayout fullWidth={true}>
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
      <MainLayout fullWidth={true}>
        {/* Header */}
        <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  className="p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition"
                  onClick={() => {
                    if (confirm("Are you sure you want to logout?")) {
                      logout();
                      router.push("/auth/login");
                    }
                  }}
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* Profile Header Card */}
          <div className="rounded-2xl lg:rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-6 lg:p-8 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Profile Image */}
              <div className="flex justify-center sm:justify-start shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-white/10">
                  {profile.profilePicture ? (
                    <img
                      src={profile.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
                      <span className="text-3xl sm:text-4xl font-black text-white">
                        {profile.user?.fullName?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-3 min-w-0">
                {/* Name and Edit Button */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 mb-1.5">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-black">
                        {profile.user?.fullName || "User"}
                      </h2>
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/40 whitespace-nowrap">
                        VERIFIED
                      </span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-white/80 text-xs sm:text-sm mb-1">
                      <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span>{profile.major} • {profile.year}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-white/70 text-xs sm:text-sm">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span className="truncate">{profile.university}</span>
                    </div>
                  </div>

                  <button
                    onClick={openEditModal}
                    className="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shrink-0"
                  >
                    <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center sm:justify-start gap-6 sm:gap-8 py-3 border-y border-white/10">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-black">{listings.length}</div>
                    <div className="text-xs text-white/70">Listings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-black">0</div>
                    <div className="text-xs text-white/70">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-black flex items-center gap-1 justify-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      5.0
                    </div>
                    <div className="text-xs text-white/70">Rating</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => toast.info("Messaging feature coming soon!")}
                    className="flex-1 px-4 py-2.5 bg-white text-black rounded-full text-sm font-bold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Message</span>
                  </button>

                  <button
                    onClick={() => toast.success("Added to favorites!")}
                    className="sm:w-auto px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-bold transition-all flex items-center justify-center gap-2 sm:gap-0"
                  >
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="sm:hidden ml-2 text-sm">Add to Favorites</span>
                  </button>
                </div>
              </div>
            </div>
          </div>


          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6 mb-6">
            <h3 className="text-xl font-black mb-4">My Listings</h3>

            {listingsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto mb-3"></div>
                  <p className="text-sm text-gray-400">Loading your listings...</p>
                </div>
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">No Listings Yet</h4>
                <p className="text-sm text-gray-400 mb-6">Start by creating your first listing</p>
                <button
                  onClick={() => router.push('/post')}
                  className="px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all"
                >
                  Create Listing
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {listings.map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Listing Image */}
                      <div className="w-full sm:w-20 h-32 sm:h-20 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={listing.propertyImage}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Listing Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-bold text-white text-base sm:text-lg truncate">{listing.title}</h4>
                          <button
                            onClick={() => handleDeleteListing(listing.id)}
                            disabled={deletingId === listing.id}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition text-red-400 hover:text-red-300 disabled:opacity-50 shrink-0"
                            title="Delete listing"
                          >
                            {deletingId === listing.id ? (
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-400"></div>
                            ) : (
                              <Trash2 className="w-5 h-5" />
                            )}
                          </button>
                        </div>

                        <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                          {listing.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-semibold text-white">${listing.price}</span>
                            <span className="text-gray-400">/{listing.priceType}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span>{listing.location}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{listing.availableFrom}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>


          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - About & Lifestyle */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6">
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  About Me
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  {profile.bio}
                </p>
              </div>

              {/* Lifestyle */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6">
                <h3 className="text-xl font-black mb-4">My Lifestyle</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {profile.lifestyles.map((lifestyle: string, idx: number) => (
                    <div
                      key={idx}
                      className="px-3 sm:px-4 py-3 bg-white/10 border border-white/20 rounded-xl flex items-center gap-2 sm:gap-3 hover:bg-white/20 transition"
                    >
                      <span className="text-xl sm:text-2xl shrink-0">
                        {lifestyleIcons[lifestyle] || "✨"}
                      </span>
                      <span className="text-xs sm:text-sm font-bold truncate">
                        {getLifestyleLabel(lifestyle).replace(/^[^\s]+\s/, "")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Contact & Verification */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6">
                <h3 className="text-lg font-black mb-4">Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
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
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-400">Location</div>
                      <div className="text-sm font-semibold truncate">{profile.university}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
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
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6 text-white fill-current" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm mb-1">Verified Profile</h4>
                    <p className="text-xs text-gray-300">Verified by Tugo</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle className="w-3 h-3 shrink-0" />
                    <span>Email verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle className="w-3 h-3 shrink-0" />
                    <span>Student ID verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>

      {/* Edit Modal */}
      <ProfileEditModal />
    </>
  );
};

export default TugoProfilePage;