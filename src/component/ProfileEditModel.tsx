// components/ProfileEditModal.tsx
// Reusable modal for editing profile

"use client";
import React, { useState, useEffect } from "react";
import { X, User, GraduationCap, Sparkles, Loader2 } from "lucide-react";
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
  const [formData, setFormData] = useState<ProfileData>({
    university: currentProfile.university,
    major: currentProfile.major,
    year: currentProfile.year,
    bio: currentProfile.bio,
    lifestyle: currentProfile.lifestyles,
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        university: currentProfile.university,
        major: currentProfile.major,
        year: currentProfile.year,
        bio: currentProfile.bio,
        lifestyle: currentProfile.lifestyles,
      });
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
    { id: "social", icon: "🎉", label: "Social Butterfly", desc: "Love hosting & hangouts" },
    { id: "introvert", icon: "📚", label: "Quiet & Focused", desc: "Value peace & quiet" },
    { id: "clean", icon: "✨", label: "Super Clean", desc: "Organized & tidy" },
    { id: "relaxed", icon: "😌", label: "Relaxed", desc: "Go with the flow" },
    { id: "fitness", icon: "💪", label: "Fitness Enthusiast", desc: "Active lifestyle" },
    { id: "foodie", icon: "🍕", label: "Foodie", desc: "Love cooking & eating" },
    { id: "minimalist", icon: "🎨", label: "Minimalist", desc: "Simple & minimal" },
    { id: "pet-lover", icon: "🐕", label: "Pet Lover", desc: "Animal friendly" },
    { id: "gamer", icon: "🎮", label: "Gamer", desc: "Gaming enthusiast" },
    { id: "creative", icon: "🎭", label: "Creative", desc: "Artistic & expressive" },
  ];

  const steps = [
    { id: 0, title: "University Info", icon: GraduationCap },
    { id: 1, title: "About You", icon: User },
    { id: 2, title: "Lifestyle", icon: Sparkles },
  ];

  const handleLifestyleToggle = (id: string) => {
    setFormData((prev:any) => ({
      ...prev,
      lifestyle: prev.lifestyle.includes(id)
        ? prev.lifestyle.filter((item:any) => item !== id)
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
          response.errors.forEach((error:any) => {
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
        return formData.university && formData.major && formData.year;
      case 1:
        return formData.bio.length >= 20 && formData.bio.length <= 500;
      case 2:
        return formData.lifestyle.length >= 3 && formData.lifestyle.length <= 12;
      default:
        return true;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-gray-900 to-black rounded-3xl border border-white/20 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Steps */}
        <div className="sticky top-0 bg-black/90 backdrop-blur-xl border-b border-white/10 p-6 pb-4 z-10">
          <h2 className="text-2xl font-black mb-4">Edit Profile</h2>
          <div className="flex items-center gap-2">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div
                  className={`flex-1 h-2 rounded-full transition-all ${
                    idx <= currentStep ? "bg-white" : "bg-white/20"
                  }`}
                />
              </React.Fragment>
            ))}
          </div>
          <div className="mt-3 text-sm text-gray-400 font-medium">
            Step {currentStep + 1} of {steps.length} - {steps[currentStep].title}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pb-24">
          {/* Step 0: University Info */}
          {currentStep === 0 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-3">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black">University Info</h3>
                <p className="text-gray-400 text-sm">Update your academic details</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    University
                  </label>
                  <select
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-white/30 transition-all"
                  >
                    {universities.map((uni) => (
                      <option key={uni} value={uni} className="bg-black">
                        {uni}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Major / Course
                  </label>
                  <select
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-white/30 transition-all"
                  >
                    {majors.map((major) => (
                      <option key={major} value={major} className="bg-black">
                        {major}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Current Year
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => setFormData({ ...formData, year })}
                        className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
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

          {/* Step 1: Bio */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-3">
                  <User className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black">About You</h3>
                <p className="text-gray-400 text-sm">Update your bio</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell potential roommates about yourself..."
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all resize-none"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">20-500 characters</span>
                  <span
                    className={`font-semibold ${
                      formData.bio.length >= 20 && formData.bio.length <= 500
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {formData.bio.length} / 500
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Lifestyle */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-3">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black">Lifestyle</h3>
                <p className="text-gray-400 text-sm">Select 3-12 traits</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                    <div className="text-2xl mb-1">{lifestyle.icon}</div>
                    <div className="font-bold text-xs mb-0.5">{lifestyle.label}</div>
                    <div
                      className={`text-[10px] ${
                        formData.lifestyle.includes(lifestyle.id)
                          ? "text-black/70"
                          : "text-gray-500"
                      }`}
                    >
                      {lifestyle.desc}
                    </div>
                  </button>
                ))}
              </div>

              <div className="text-center text-sm text-gray-400">
                Selected: <span className="text-white font-semibold">{formData.lifestyle.length}</span> / 12
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-black/90 backdrop-blur-xl border-t border-white/10 p-6 flex items-center justify-between gap-3">
          <button
            onClick={currentStep > 0 ? handlePrev : onClose}
            disabled={loading}
            className="px-5 py-3 text-gray-400 hover:text-white font-semibold transition-colors disabled:opacity-50"
          >
            {currentStep > 0 ? "Back" : "Cancel"}
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                canProceed()
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-white/20 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={loading || !canProceed()}
              className="px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
      `}</style>

      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        `}</style>
    </div>
  );
}