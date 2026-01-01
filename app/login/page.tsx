"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authHelpers } from "@/lib/supabase";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  useEffect(() => {
    const urlMessage = searchParams?.get("message");
    if (urlMessage) {
      setMessage(urlMessage);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await authHelpers.signIn(
        formData.email,
        formData.password
      );

      if (error) {
        if (error.message === "Invalid login credentials") {
          setError("Invalid email or password. Please try again.");
        } else if (error.message === "Email not confirmed") {
          setError("Please verify your email address before logging in.");
        } else {
          setError(error.message);
        }
      } else if (data.user) {
        router.push("/");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await authHelpers.signInWithGoogle();
      if (error) {
        setError(error.message);
        setIsLoading(false);
      }
    } catch {
      setError("Failed to sign in with Google. Please try again.");
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPasswordEmail.trim()) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await authHelpers.resetPassword(forgotPasswordEmail);

      if (error) {
        setError(error.message);
      } else {
        setMessage("Password reset email sent! Check your inbox.");
        setShowForgotPassword(false);
        setForgotPasswordEmail("");
      }
    } catch {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      <main className="max-w-md mx-auto px-4 py-8 pt-24 md:pt-28">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
          {!showForgotPassword ? (
            <>
              {/* Form Header */}
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter mb-2">
                  Welcome Back
                </h1>
                <p className="text-black font-bold uppercase text-sm">
                  Login to continue
                </p>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="mb-4 p-4 bg-red-200 border-4 border-black">
                  <p className="text-black font-bold text-sm">{error}</p>
                </div>
              )}

              {message && (
                <div className="mb-4 p-4 bg-green-200 border-4 border-black">
                  <p className="text-black font-bold text-sm">{message}</p>
                </div>
              )}

              {/* Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full bg-white border-4 border-black py-3 px-4 flex items-center justify-center gap-3 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-4 border-black border-t-transparent animate-spin"></div>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                <span className="text-black">
                  {isLoading ? "Signing in..." : "Continue with Google"}
                </span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-6">
                <div className="border-t-4 border-black w-full"></div>
                <span className="bg-white px-4 text-sm font-black text-black absolute uppercase">
                  Or
                </span>
              </div>

              {/* Email Login Form */}
              <form onSubmit={handleEmailLogin} className="space-y-4">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-black text-black mb-2 uppercase flex items-center gap-2"
                  >
                    <FiMail size={16} strokeWidth={3} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border-4 border-black font-medium text-black focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-black text-black mb-2 uppercase flex items-center gap-2"
                  >
                    <FiLock size={16} strokeWidth={3} />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 pr-12 border-4 border-black font-medium text-black focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black disabled:cursor-not-allowed"
                    >
                      {showPassword ? (
                        <FiEyeOff size={20} strokeWidth={3} />
                      ) : (
                        <FiEye size={20} strokeWidth={3} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-black font-black uppercase hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-pink-400 hover:bg-pink-300 text-black border-4 border-black px-6 py-4 font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              {/* Sign up link */}
              <div className="mt-6 text-center">
                <p className="text-black font-bold text-sm">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="text-black p-2 font-black uppercase hover:bg-yellow-200 rounded-md"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </>
          ) : (
            /* Forgot Password Form */
            <>
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter mb-2">
                  Reset Password
                </h1>
                <p className="text-black font-bold uppercase text-sm">
                  We'll send you a reset link
                </p>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-200 border-4 border-black">
                  <p className="text-black font-bold text-sm">{error}</p>
                </div>
              )}

              {message && (
                <div className="mb-4 p-4 bg-green-200 border-4 border-black">
                  <p className="text-black font-bold text-sm">{message}</p>
                </div>
              )}

              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label
                    htmlFor="forgotEmail"
                    className="block text-xs font-black text-black mb-2 uppercase flex items-center gap-2"
                  >
                    <FiMail size={16} strokeWidth={3} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="forgotEmail"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border-4 border-black font-medium text-black focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-cyan-400 hover:bg-cyan-300 text-black border-4 border-black px-6 py-4 font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotPasswordEmail("");
                      setError(null);
                    }}
                    className="text-sm text-black font-black uppercase hover:underline"
                  >
                    Back to login
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
