// ...existing code...
"use client";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [acceptCookies, setAcceptCookies] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(formData.email)) e.email = "Email is invalid";

    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 6)
      e.password = "Password must be at least 6 characters";

    return e;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  // ...existing code...
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validation = validate();
    console.log("Client validation result:", validation); // debug
    setErrors(validation);
    if (Object.keys(validation).length > 0) return; // client prevented submit

    setLoading(true);
    try {
      console.log("Sending login request...", { ...formData, acceptCookies });
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...formData, acceptCookies }),
      });

      const data = await response.json();
      console.log("Login response:", data);
      setLoading(false);
      toast.success("Login successful. Redirecting...");

      if (data.success) {
        localStorage.setItem("accessToken", data.accessToken);
        router.push("/home");
      } else {
        toast.error(data.message || "Login failed");
        if (data.errors) {
          const serverErrors: Record<string, string> = {};
          (data.errors as any[]).forEach((err) => {
            serverErrors[err.field || "general"] =
              err.message || JSON.stringify(err);
          });
          setErrors(serverErrors);
        } else {
          setErrors({ general: data.message || "Login failed" });
        }
      }
    } catch (err) {
      setLoading(false);
      setErrors({ general: "Network error. Please try again." });
      console.error("Login exception:", err);
    }
  };
  // ...existing code...

  return (
    <>
      <div>
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-black">Welcome Back</h1>
            <p className="text-gray-400">
              Sign in to find your perfect roommate
            </p>
          </div>

          <div className="space-y-5">
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
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

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
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="text-right">
              <Link href="/auth/resetPassword">
                <button className="text-sm text-gray-400 hover:text-white transition-colors">
                  Forgot password?
                </button>
              </Link>
            </div>

            {errors.general && (
              <p className="text-red-500 text-sm mt-1">{errors.general}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-4 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black text-gray-500">or</span>
              </div>
            </div>

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

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="acceptCookies"
            checked={acceptCookies}
            onChange={() => setAcceptCookies(!acceptCookies)}
            className="accent-white"
          />
          <label htmlFor="acceptCookies" className="text-gray-400 text-sm">
            I accept cookies to stay logged in
          </label>
        </div>
      </div>
    </>
  );
};

export default Login;
// ...existing code...
