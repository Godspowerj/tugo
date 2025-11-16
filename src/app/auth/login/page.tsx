"use client";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    router.push("/home");
  };

  return (
    <>
      <div>
        <div className="space-y-8">
          {/* Title */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-black">Welcome Back</h1>
            <p className="text-gray-400">
              Sign in to find your perfect roommate
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email</label>
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

            {/* Password Input */}
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
                  placeholder="Enter your password"
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

            {/* Forgot Password */}
            <div className="text-right">
              <Link href="/auth/resetPassword">
                <button className="text-sm text-gray-400 hover:text-white transition-colors">
                  Forgot password?
                </button>
              </Link>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black text-gray-500">or</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <span className="text-gray-400">Don't have an account? </span>
              <Link href="/auth/register">
                <button className="text-white font-semibold hover:underline">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
