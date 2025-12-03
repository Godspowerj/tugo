"use client";
import React, { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRequestReset = async () => {
    if (!email) return toast.error("Please enter your email");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/password-reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success(data.message);
        // Redirect to the new OTP page
        router.push(`/auth/resetPassword/otp?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(data.message || "Failed to send reset link");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Link href="/auth/login">
        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to login</span>
        </button>
      </Link>

      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black">Reset Password</h1>
        <p className="text-gray-400">
          Enter your email to receive a code
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@university.edu"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 outline-none focus:border-white/30 transition-all"
            />
          </div>
          <button
            onClick={handleRequestReset}
            disabled={loading}
            className="w-full py-4 mt-4 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all"
          >
            {loading ? "Sending..." : "Send Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
