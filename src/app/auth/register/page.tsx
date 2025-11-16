"use client";
import { useState } from "react";
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    university: "",
    confirmPassword: "",
  });
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    router.push("/setup")
  };

  return (
    <>
      <div>
        <div className="space-y-8">
          {/* Back Button */}
          <Link href="/auth/login">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to login</span>
            </button>
          </Link>

          {/* Title */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-black">Join Tugo</h1>
            <p className="text-gray-400">
              Create your account and start matching
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                University Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@university.edu"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all"
                />
              </div>
            </div>

            {/* University */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                University
              </label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                placeholder="University of Lagos"
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95"
            >
              Create Account
            </button>

            {/* Terms */}
            <p className="text-xs text-center text-gray-500">
              By signing up, you agree to our{" "}
              <a href="#" className="text-white hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-white hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
