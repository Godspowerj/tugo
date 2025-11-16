"use client";
import React, { useState } from "react";
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const ResetPassword = () => {
  const [formData, setformData] = useState({
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="space-y-8">
        {/* Back Button */}
        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to login</span>
        </button>

        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-black">Reset Password</h1>
          <p className="text-gray-400">
            Enter your email to receive a reset link
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

          {/* Submit Button */}
          <Link href="/auth/otp">
            <button className="w-full py-4 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95">
              Send Reset Link
            </button>
          </Link>

          {/* Info Box */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-sm text-gray-400 text-center">
              We'll send you an email with instructions to reset your password
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
