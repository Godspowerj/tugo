"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

const OTPContent = () => {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (value && !/^\d$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError("");
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;
        const newOtp = [...otp];
        pastedData.split("").forEach((char, index) => {
            if (index < 6) newOtp[index] = char;
        });
        setOtp(newOtp);
        const lastIndex = Math.min(pastedData.length, 5);
        inputRefs.current[lastIndex]?.focus();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join("");
        if (otpValue.length !== 6) {
            setError("Please enter all 6 digits");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const response = await fetch("https://tugobackend.onrender.com/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp: otpValue }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success("Email verified successfully!");
                router.push("/auth/login");
            } else {
                setError(data.message || "Invalid OTP. Please try again.");
                toast.error(data.message || "Invalid OTP");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            toast.error("Network error. Please try again.");
            console.error("OTP verification error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/auth/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success("New OTP sent to your email!");
                setOtp(["", "", "", "", "", ""]);
                inputRefs.current[0]?.focus();
            } else {
                toast.error(data.message || "Failed to resend OTP");
            }
        } catch (err) {
            toast.error("Network error. Please try again.");
            console.error("Resend OTP error:", err);
        } finally {
            setLoading(false);
        }
    };

    const isDisabled = loading || otp.join("").length !== 6;

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="mb-8">
                    <Link href="/auth/register">
                        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back</span>
                        </button>
                    </Link>
                </div>
                <div className="space-y-8">
                    <div className="text-center space-y-3">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-black">Verify Your Email</h1>
                        <p className="text-gray-400">
                            We've sent a 6-digit code to<br />
                            <span className="text-white font-semibold">{email}</span>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex gap-3 justify-center">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el; }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold bg-white/5 border-2 border-white/10 rounded-xl text-white outline-none focus:border-white/40 transition-all"
                                />
                            ))}
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button
                            type="submit"
                            disabled={isDisabled}
                            className={`w-full py-4 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Verifying..." : "Verify Email"}
                        </button>
                        <div className="text-center">
                            <span className="text-gray-400 text-sm">Didn't receive the code? </span>
                            <button type="button" onClick={handleResend} disabled={loading} className="text-white font-semibold hover:underline text-sm disabled:opacity-50">
                                Resend
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const OTPVerification = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
            <OTPContent />
        </Suspense>
    );
};

export default OTPVerification;
