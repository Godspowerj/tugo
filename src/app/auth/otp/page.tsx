"use client";
import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Mail } from "lucide-react";

export default function TugoOTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Email from previous screen (in real app, pass this as prop or context)
  const email = "john.doe@university.edu";

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: {
    preventDefault: () => void;
    clipboardData: { getData: (arg0: string) => string };
  }) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .slice(0, 6)
      .split("");

    if (pastedData.every((char) => /^\d$/.test(char))) {
      const newOtp = [...otp];
      pastedData.forEach((char, index) => {
        if (index < 6) newOtp[index] = char;
      });
      setOtp(newOtp);

      // Focus last filled input
      const lastIndex = Math.min(pastedData.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      setIsVerifying(true);
      // Simulate verification
      setTimeout(() => {
        setIsVerifying(false);
        alert("OTP Verified! Redirecting...");
        // In real app: navigate to next page
      }, 2000);
    }
  };

  const handleResend = () => {
    if (countdown === 0) {
      setIsResending(true);
      // Simulate resend
      setTimeout(() => {
        setIsResending(false);
        setCountdown(60);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }, 1000);
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="relative flex  w-full text-white font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="space-y-8">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>

          {/* Email Icon Animation */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Mail className="w-10 h-10 text-white animate-bounce-slow" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-black">Verify Your Email</h1>
            <p className="text-gray-400 leading-relaxed">
              We sent a 6-digit code to
              <br />
              <span className="text-white font-semibold">{email}</span>
            </p>
          </div>

          {/* OTP Input */}
          <div className="space-y-6">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el; // now returns void
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-white/5 border-2 border-white/10 rounded-2xl text-white outline-none focus:border-white focus:bg-white/10 transition-all"
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={!isComplete || isVerifying}
              className={`w-full py-4 rounded-full font-bold transition-all transform ${
                isComplete && !isVerifying
                  ? "bg-white text-black hover:bg-gray-100 hover:scale-105 active:scale-95"
                  : "bg-white/20 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isVerifying ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  Verifying...
                </span>
              ) : (
                "Verify Code"
              )}
            </button>
          </div>

          {/* Resend Code */}
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-400">Didn't receive the code?</p>
            {countdown > 0 ? (
              <p className="text-sm text-gray-500">
                Resend code in{" "}
                <span className="text-white font-semibold">{countdown}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="text-sm text-white font-semibold hover:underline disabled:text-gray-500"
              >
                {isResending ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </span>
                ) : (
                  "Resend Code"
                )}
              </button>
            )}
          </div>

          {/* Help Text */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-xs text-center text-gray-400 leading-relaxed">
              💡 <strong className="text-white">Tip:</strong> Check your spam
              folder if you don't see the email
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap");

        @keyframes fade-in-up {
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
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
