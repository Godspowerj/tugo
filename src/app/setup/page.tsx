"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  GraduationCap,
  Home,
  DollarSign,
  Sparkles,
} from "lucide-react";

type Lifestyle = {
  id: string; // or number — whichever your data actually uses
  icon: string;
  label: string;
  desc: string;
};
type ProfileData = {
  university: string;
  major: string;
  year: string;
  bio: string;
  lifestyle: string[]; // or number[] depending on your lifestyle.id
  budget: string;
  preferences: string[]; // or number[]
};

export default function TugoProfileSetup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData>({
    university: "",
    major: "",
    year: "",
    bio: "",
    lifestyle: [], // now typed correctly
    budget: "",
    preferences: [],
  });

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

  const years = [
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
    "5th Year",
    "Graduate",
  ];

  const lifestyles: Lifestyle[] = [
    {
      id: "early-bird",
      icon: "🌅",
      label: "Early Bird",
      desc: "Up before sunrise",
    },
    {
      id: "night-owl",
      icon: "🌙",
      label: "Night Owl",
      desc: "Late night energy",
    },
    {
      id: "social",
      icon: "🎉",
      label: "Social Butterfly",
      desc: "Love hosting & hangouts",
    },
    {
      id: "introvert",
      icon: "📚",
      label: "Quiet & Focused",
      desc: "Value peace & quiet",
    },
    { id: "clean", icon: "✨", label: "Super Clean", desc: "Organized & tidy" },
    { id: "relaxed", icon: "😌", label: "Relaxed", desc: "Go with the flow" },
    {
      id: "fitness",
      icon: "💪",
      label: "Fitness Enthusiast",
      desc: "Active lifestyle",
    },
    {
      id: "foodie",
      icon: "🍕",
      label: "Foodie",
      desc: "Love cooking & eating",
    },
    {
      id: "minimalist",
      icon: "🎨",
      label: "Minimalist",
      desc: "Simple & minimal",
    },
    {
      id: "pet-lover",
      icon: "🐕",
      label: "Pet Lover",
      desc: "Animal friendly",
    },
    { id: "gamer", icon: "🎮", label: "Gamer", desc: "Gaming enthusiast" },
    {
      id: "creative",
      icon: "🎨",
      label: "Creative",
      desc: "Artistic & expressive",
    },
  ];

  const budgetRanges = [
    { value: "0-50k", label: "₦0 - ₦50,000", desc: "Budget friendly" },
    { value: "50k-100k", label: "₦50,000 - ₦100,000", desc: "Moderate" },
    { value: "100k-200k", label: "₦100,000 - ₦200,000", desc: "Comfortable" },
    { value: "200k+", label: "₦200,000+", desc: "Premium" },
  ];

  const roomPreferences = [
    { id: "single", icon: "🛏️", label: "Single Room", desc: "My own space" },
    { id: "shared", icon: "👥", label: "Shared Room", desc: "2-3 roommates" },
    { id: "studio", icon: "🏠", label: "Studio", desc: "Self-contained" },
    {
      id: "apartment",
      icon: "🏢",
      label: "Apartment",
      desc: "Full apartment share",
    },
  ];

  const steps = [
    {
      id: 0,
      title: "University Info",
      subtitle: "Tell us where you study",
      icon: GraduationCap,
      progress: 16,
    },
    {
      id: 1,
      title: "About You",
      subtitle: "Share your story",
      icon: User,
      progress: 33,
    },
    {
      id: 2,
      title: "Your Lifestyle",
      subtitle: "Pick what describes you",
      icon: Sparkles,
      progress: 50,
    },
    {
      id: 3,
      title: "Budget Range",
      subtitle: "What can you afford?",
      icon: DollarSign,
      progress: 66,
    },
    {
      id: 4,
      title: "Room Preferences",
      subtitle: "Your ideal living space",
      icon: Home,
      progress: 83,
    },
    {
      id: 5,
      title: "All Set!",
      subtitle: "Review and finish",
      icon: Check,
      progress: 100,
    },
  ];

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

  const handleLifestyleToggle = (id: string) => {
    setProfileData((prev) => ({
      ...prev,
      lifestyle: prev.lifestyle.includes(id)
        ? prev.lifestyle.filter((item) => item !== id)
        : [...prev.lifestyle, id],
    }));
  };

  const handlePreferenceToggle = (id:string) => {
    setProfileData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(id)
        ? prev.preferences.filter((item) => item !== id)
        : [...prev.preferences, id],
    }));
  };

  const handleFinish = () => {
    console.log("Profile Data:", profileData);
    alert("Profile setup complete! 🎉");
    // Navigate to main app
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return profileData.university && profileData.major && profileData.year;
      case 1:
        return profileData.bio.length >= 20;
      case 2:
        return profileData.lifestyle.length >= 3;
      case 3:
        return profileData.budget;
      case 4:
        return profileData.preferences.length >= 1;
      default:
        return true;
    }
  };

  return (
    <div className="relative flex min-h-screen w-full bg-black text-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header with Progress */}
      <header className="absolute top-0 left-0 right-0 z-10 px-8 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Tugo
            </h2>
          </div>
          <div className="text-sm text-gray-400 font-medium">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${steps[currentStep].progress}%` }}
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-2xl">
          {/* Step 0: University Info */}
          {currentStep === 0 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-black">{steps[0].title}</h1>
                <p className="text-gray-400 text-lg">{steps[0].subtitle}</p>
              </div>

              <div className="space-y-5">
                {/* University Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-300">
                    University
                  </label>
                  <select
                    value={profileData.university}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        university: e.target.value,
                      })
                    }
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-white/30 transition-all"
                  >
                    <option value="" className="bg-black">
                      Select your university
                    </option>
                    {universities.map((uni) => (
                      <option key={uni} value={uni} className="bg-black">
                        {uni}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Major Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-300">
                    Major / Course of Study
                  </label>
                  <select
                    value={profileData.major}
                    onChange={(e) =>
                      setProfileData({ ...profileData, major: e.target.value })
                    }
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-white/30 transition-all"
                  >
                    <option value="" className="bg-black">
                      What are you studying?
                    </option>
                    {majors.map((major) => (
                      <option key={major} value={major} className="bg-black">
                        {major}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-300">
                    Current Year
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => setProfileData({ ...profileData, year })}
                        className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                          profileData.year === year
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
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
                  <User className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-black">{steps[1].title}</h1>
                <p className="text-gray-400 text-lg">{steps[1].subtitle}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-300">
                    Write a short bio
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    placeholder="Tell potential roommates about yourself, your interests, and what you're looking for in a living situation..."
                    rows={6}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all resize-none"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Minimum 20 characters</span>
                    <span
                      className={`font-semibold ${
                        profileData.bio.length >= 20
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    >
                      {profileData.bio.length} / 500
                    </span>
                  </div>
                </div>

                {/* Example prompt */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-xs text-gray-400">
                    💡{" "}
                    <span className="text-white font-semibold">Example:</span>{" "}
                    "I'm a 2nd year Computer Science student who loves gaming
                    and coding. I'm looking for a chill roommate who respects
                    quiet study time but is down for weekend hangouts!"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Lifestyle */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-black">{steps[2].title}</h1>
                <p className="text-gray-400 text-lg">
                  Select at least 3 that describe you
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {lifestyles.map((lifestyle) => (
                  <button
                    key={lifestyle.id}
                    onClick={() => handleLifestyleToggle(lifestyle.id)}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                      profileData.lifestyle.includes(lifestyle.id)
                        ? "bg-white text-black border-white"
                        : "bg-white/5 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="text-3xl mb-2">{lifestyle.icon}</div>
                    <div className="font-bold text-sm mb-1">
                      {lifestyle.label}
                    </div>
                    <div
                      className={`text-xs ${
                        profileData.lifestyle.includes(lifestyle.id)
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
                Selected:{" "}
                <span className="text-white font-semibold">
                  {profileData.lifestyle.length}
                </span>{" "}
                / 12
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
                  <DollarSign className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-black">{steps[3].title}</h1>
                <p className="text-gray-400 text-lg">{steps[3].subtitle}</p>
              </div>

              <div className="space-y-4">
                {budgetRanges.map((budget) => (
                  <button
                    key={budget.value}
                    onClick={() =>
                      setProfileData({ ...profileData, budget: budget.value })
                    }
                    className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                      profileData.budget === budget.value
                        ? "bg-white text-black border-white"
                        : "bg-white/5 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-lg mb-1">
                          {budget.label}
                        </div>
                        <div
                          className={`text-sm ${
                            profileData.budget === budget.value
                              ? "text-black/70"
                              : "text-gray-400"
                          }`}
                        >
                          {budget.desc}
                        </div>
                      </div>
                      {profileData.budget === budget.value && (
                        <Check className="w-6 h-6" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Room Preferences */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
                  <Home className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-black">{steps[4].title}</h1>
                <p className="text-gray-400 text-lg">
                  Select your preferred living arrangement
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roomPreferences.map((pref) => (
                  <button
                    key={pref.id}
                    onClick={() => handlePreferenceToggle(pref.id)}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      profileData.preferences.includes(pref.id)
                        ? "bg-white text-black border-white"
                        : "bg-white/5 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="text-4xl mb-3">{pref.icon}</div>
                    <div className="font-bold text-lg mb-1">{pref.label}</div>
                    <div
                      className={`text-sm ${
                        profileData.preferences.includes(pref.id)
                          ? "text-black/70"
                          : "text-gray-400"
                      }`}
                    >
                      {pref.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Review & Finish */}
          {currentStep === 5 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-4 animate-bounce-slow">
                  <Check className="w-10 h-10" />
                </div>
                <h1 className="text-5xl font-black">You're All Set! 🎉</h1>
                <p className="text-gray-400 text-xl max-w-lg mx-auto">
                  Your profile is complete. Start discovering your perfect
                  roommate matches now!
                </p>
              </div>

              {/* Profile Summary */}
              <div className="space-y-4 max-w-lg mx-auto">
                <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-400">University</div>
                      <div className="font-semibold">
                        {profileData.university}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-400">Major</div>
                      <div className="font-semibold">
                        {profileData.major} • {profileData.year}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-400">Budget</div>
                      <div className="font-semibold">
                        {
                          budgetRanges.find(
                            (b) => b.value === profileData.budget
                          )?.label
                        }
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-400">
                        Lifestyle Traits
                      </div>
                      <div className="font-semibold">
                        {profileData.lifestyle.length} selected
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4 mt-12">
            {currentStep > 0 && currentStep < 5 ? (
              <button
                onClick={handlePrev}
                className="flex items-center gap-2 px-6 py-3 text-gray-400 hover:text-white transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all ${
                  canProceed()
                    ? "bg-white text-black hover:bg-gray-100 transform hover:scale-105 active:scale-95"
                    : "bg-white/20 text-gray-500 cursor-not-allowed"
                }`}
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 animate-pulse-slow"
              >
                Start Matching
                <Sparkles className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap");

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
