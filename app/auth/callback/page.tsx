// app/auth/callback/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth callback error:", error);
        router.push("/login?error=Authentication failed");
        return;
      }

      if (data.session) {
        // User is authenticated, redirect to dashboard
        router.push("/");
      } else {
        // No session found, redirect to login
        router.push("/login");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 relative overflow-hidden">
      {/* Neo-Brutalism Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-black rotate-12"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-400 border-4 border-black"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border-4 border-black rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-cyan-400 border-4 border-black rotate-45"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Loading Card */}
        <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
          {/* Animated Loader */}
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20">
              {/* Outer spinning square */}
              <div className="absolute inset-0 border-4 border-black bg-pink-400 animate-spin"></div>
              {/* Inner static square */}
              <div className="absolute inset-3 border-4 border-black bg-cyan-400"></div>
              {/* Center dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <h1 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter mb-4">
            AUTHENTICATING
          </h1>
          <p className="text-lg font-bold text-black mb-2">
            Completing sign in...
          </p>
          <p className="text-sm font-medium text-black/70">
            Please wait while we redirect you
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-80 mx-auto h-6 border-4 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="h-full bg-gradient-to-r from-pink-400 via-cyan-400 to-yellow-400 animate-pulse border-r-4 border-black w-full"></div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-4 h-4 bg-pink-400 border-2 border-black animate-bounce"></div>
          <div
            className="w-4 h-4 bg-cyan-400 border-2 border-black animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-4 h-4 bg-yellow-400 border-2 border-black animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
