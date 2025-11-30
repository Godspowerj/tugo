"use client";
import React, { useState, useEffect, useRef } from "react";
import { X, User, GraduationCap, Sparkles, Loader2, Camera, Upload } from "lucide-react";
import { profileApi, ProfileData, ProfileResponse } from "../api/profileApi";
import { toast } from "sonner";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: ProfileResponse;
  onProfileUpdated: (updatedProfile: ProfileResponse) => void;
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  currentProfile,
  onProfileUpdated,
}: ProfileEditModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    university: currentProfile.university,
    major: currentProfile.major,
    year: currentProfile.year,
    bio: currentProfile.bio,
    lifestyle: currentProfile.lifestyles,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(currentProfile.profilePicture || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        university: currentProfile.university,
        major: currentProfile.major,
        year: currentProfile.year,
        bio: currentProfile.bio,
        lifestyle: currentProfile.lifestyles,
      });
      setPreviewImage(currentProfile.profilePicture || null);
      setCurrentStep(0);
    }
  }, [isOpen, currentProfile]);

  const universities = [
    "University of Lagos",
    "University of Ibadan",
    "Obafemi Awolowo University",
    "University of Nigeria",
    "Covenant University",
    "Ahmadu Bello University",
    "Lagos State University",
    "Other",
  ];

  const majors = [
    "Computer Science",
    "Engineering",
    "Medicine",
    "Business Administration",
    "Law",
    "Architecture",
    "Psychology",
    "Mass Communication",
    "Other",
  ];

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Graduate"];

  const lifestyles = [
    { id: "early-bird", icon: "🌅", label: "Early Bird", desc: "Up before sunrise" },
    { id: "night-owl", icon: "🌙", label: "Night Owl", desc: "Late night energy" },
    { id: "social", icon: "🎉", label: "Social Butterfly", desc: "Love hosting" },
    { id: "introvert", icon: "📚", label: "Quiet & Focused", desc: "Value peace" },
    { id: "clean", icon: "✨", label: "Super Clean", desc: "Organized & tidy" },
    { id: "relaxed", icon: "😌", label: "Relaxed", desc: "Go with flow" },
    { id: "fitness", icon: "💪", label: "Fitness", desc: "Active lifestyle" },
    { id: "foodie", icon: "🍕", label: "Foodie", desc: "Love cooking" },
    { id: "minimalist", icon: "🎨", label: "Minimalist", desc: "Simple & minimal" },
    { id: "pet-lover", icon: "🐕", label: "Pet Lover", desc: "Animal friendly" },
    { id: "gamer", icon: "🎮", label: "Gamer", desc: "Gaming enthusiast" },
    { id: "creative", icon: "🎭", label: "Creative", desc: "Artistic" },
  ];

  const steps = [
    { id: 0, title: "Photo", icon: Camera },
    { id: 1, title: "University", icon: GraduationCap },
    { id: 2, title: "Bio", icon: User },
    { id: 3, title: "Lifestyle", icon: Sparkles },
  ];

  const handleLifestyleToggle = (id: string) => {
    setFormData((prev: any) => ({
      ...prev,
      lifestyle: prev.lifestyle.includes(id)
        ? prev.lifestyle.filter((item: any) => item !== id)
        : [...prev.lifestyle, id],
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);

    const formData = new FormData();
    formData.append('profilePicture', file);

    setUploading(true);
    try {
      const response = await profileApi.uploadProfilePicture(formData);
      if (response.success && response.data) {
        toast.success("Profile picture uploaded!");
        onProfileUpdated(response.data.profile);
      } else {
        toast.error(response.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await profileApi.updateProfile(formData);

      if (response.success && response.data) {
        toast.success("Profile updated successfully! 🎉");
        onProfileUpdated(response.data);
        onClose();
      } else {
        if (response.errors && response.errors.length > 0) {
          response.errors.forEach((error: any) => {
            toast.error(`${error.field}: ${error.message}`);
          });
        } else {
          toast.error(response.message || "Failed to update profile");
        }
      }
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true;
      case 1:
        return formData.university && formData.major && formData.year;
      case 2:
        return formData.bio.length >= 20 && formData.bio.length <= 500;
      case 3:
        return formData.lifestyle.length >= 3 && formData.lifestyle.length <= 12;
      default:
        return true;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full sm:max-w-2xl lg:max-w-4xl h-[95vh] sm:h-auto sm:max-h-[85vh] flex flex-col bg-gradient-to-b from-gray-900 to-black rounded-t-3xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex-shrink-0 bg-black/90 backdrop-blur-xl border-b border-white/10 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-black">Edit Profile</h2>
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-3">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={`flex-1 h-2 rounded-full transition-all ${
                  idx <= currentStep ? "bg-white" : "bg-white/20"
                }`}
              />
            ))}
          </div>
          
          <div className="text-xs sm:text-sm text-gray-400 font-medium">
            Step {currentStep + 1} of {steps.length} - {steps[currentStep].title}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6">
          {/* Step 0: Profile Photo */}
          {currentStep === 0 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-2xl mb-3">
                  <Camera className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black mb-2">Profile Photo</h3>
                <p className="text-gray-400 text-xs sm:text-sm">Upload a clear photo</p>
              </div>

              <div className="flex flex-col items-center gap-4 sm:gap-6">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white/10 group">
                  {previewImage ? (
                    <img src={previewImage} alt="Profile Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-3xl sm:text-4xl font-black text-white">
                        {currentProfile.user?.fullName?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                  )}

                  <div 
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>

                  {uploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-spin" />
                    </div>
                  )}
                </div>

                <div className="text-center w-full">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-bold transition-all"
                  >
                    {uploading ? "Uploading..." : "Choose Photo"}
                  </button>
                  <p className="mt-2 text-xs text-gray-500">Max 5MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: University Info */}
          {currentStep === 1 && (
            <div className="space-y-4 sm:space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-2xl mb-3">
                  <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black mb-2">University Info</h3>
                <p className="text-gray-400 text-xs sm:text-sm">Your academic details</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">University</label>
                  <select
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm sm:text-base text-white outline-none focus:border-white/30 transition-all"
                  >
                    {universities.map((uni) => (
                      <option key={uni} value={uni} className="bg-black">{uni}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">Major</label>
                  <select
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm sm:text-base text-white outline-none focus:border-white/30 transition-all"
                  >
                    {majors.map((major) => (
                      <option key={major} value={major} className="bg-black">{major}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">Year</label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => setFormData({ ...formData, year })}
                        className={`px-2 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          formData.year === year
                            ? "bg-white text-black"
                            : "bg-white/5 border border-white/10 hover:border-white/30"
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Bio */}
          {currentStep === 2 && (
            <div className="space-y-4 sm:space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-2xl mb-3">
                  <User className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black mb-2">About You</h3>
                <p className="text-gray-400 text-xs sm:text-sm">Tell us about yourself</p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell potential roommates about yourself..."
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm sm:text-base text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all resize-none"
                />
                <div className="flex justify-between text-xs sm:text-sm mt-2">
                  <span className="text-gray-500">20-500 characters</span>
                  <span className={`font-semibold ${
                    formData.bio.length >= 20 && formData.bio.length <= 500 ? "text-white" : "text-gray-500"
                  }`}>
                    {formData.bio.length} / 500
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Lifestyle */}
          {currentStep === 3 && (
            <div className="space-y-4 sm:space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-2xl mb-3">
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black mb-2">Lifestyle</h3>
                <p className="text-gray-400 text-xs sm:text-sm">Select 3-12 traits</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {lifestyles.map((lifestyle) => (
                  <button
                    key={lifestyle.id}
                    onClick={() => handleLifestyleToggle(lifestyle.id)}
                    className={`p-3 rounded-xl border-2 transition-all text-left ${
                      formData.lifestyle.includes(lifestyle.id)
                        ? "bg-white text-black border-white"
                        : "bg-white/5 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="text-xl sm:text-2xl mb-1">{lifestyle.icon}</div>
                    <div className="font-bold text-xs mb-0.5">{lifestyle.label}</div>
                    <div className={`text-[10px] ${
                      formData.lifestyle.includes(lifestyle.id) ? "text-black/70" : "text-gray-500"
                    }`}>
                      {lifestyle.desc}
                    </div>
                  </button>
                ))}
              </div>

              <div className="text-center text-xs sm:text-sm text-gray-400">
                Selected: <span className="text-white font-semibold">{formData.lifestyle.length}</span> / 12
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 bg-black/90 backdrop-blur-xl border-t border-white/10 p-4 sm:p-6 flex items-center justify-between gap-3">
          <button
            onClick={currentStep > 0 ? handlePrev : onClose}
            disabled={loading || uploading}
            className="px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base text-gray-400 hover:text-white font-semibold transition-colors disabled:opacity-50"
          >
            {currentStep > 0 ? "Back" : "Cancel"}
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed() || uploading}
              className={`px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-full font-bold transition-all ${
                canProceed() && !uploading
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-white/20 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={loading || !canProceed() || uploading}
              className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}