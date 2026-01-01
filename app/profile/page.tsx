"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/component/ProtectedRoute";
import Navbar from "@/component/navbar";
import { FiUser, FiMail, FiCalendar } from "react-icons/fi";

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
}

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const { supabase } = await import("@/lib/supabase");
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (data && !error) {
            setProfile(data);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const getUserInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name.charAt(0)}${profile.last_name.charAt(
        0
      )}`.toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-yellow-50">
        <Navbar />

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 pt-24 md:pt-28">
          {/* Page Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-4">
              Your Profile
            </h1>
            <div className="inline-block bg-white border-4 border-black px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-black font-bold uppercase text-sm">
                Account Information
              </p>
            </div>
          </div>

          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            {/* Profile Avatar */}
            <div className="text-center mb-8 md:mb-12">
              <div className="relative inline-block">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Profile"
                    className="w-24 h-24 md:w-32 md:h-32 mx-auto border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-pink-400 mx-auto border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black text-3xl md:text-4xl font-black">
                    {getUserInitials()}
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 border-2 border-black flex items-center justify-center">
                  <span className="text-black font-black text-xs">✓</span>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              {/* First Name */}
              <div className="bg-yellow-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-black flex items-center justify-center">
                    <FiUser className="text-white" size={18} strokeWidth={3} />
                  </div>
                  <label className="text-xs font-black text-black uppercase tracking-wide">
                    First Name
                  </label>
                </div>
                <div className="text-black font-bold text-lg md:text-xl">
                  {profile?.first_name || "Not set"}
                </div>
              </div>

              {/* Last Name */}
              <div className="bg-cyan-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-black flex items-center justify-center">
                    <FiUser className="text-white" size={18} strokeWidth={3} />
                  </div>
                  <label className="text-xs font-black text-black uppercase tracking-wide">
                    Last Name
                  </label>
                </div>
                <div className="text-black font-bold text-lg md:text-xl">
                  {profile?.last_name || "Not set"}
                </div>
              </div>

              {/* Email */}
              <div className="bg-pink-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-black flex items-center justify-center">
                    <FiMail className="text-white" size={18} strokeWidth={3} />
                  </div>
                  <label className="text-xs font-black text-black uppercase tracking-wide">
                    Email Address
                  </label>
                </div>
                <div className="text-black font-bold text-lg md:text-xl break-all">
                  {profile?.email || user?.email || "Not set"}
                </div>
              </div>

              {/* Member Since */}
              {profile?.created_at && (
                <div className="bg-green-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-black flex items-center justify-center">
                      <FiCalendar
                        className="text-white"
                        size={18}
                        strokeWidth={3}
                      />
                    </div>
                    <label className="text-xs font-black text-black uppercase tracking-wide">
                      Member Since
                    </label>
                  </div>
                  <div className="text-black font-bold text-lg md:text-xl">
                    {new Date(profile.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/persona")}
                className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black border-4 border-black px-6 py-4 font-black uppercase text-sm md:text-base shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all"
              >
                Start Chatting
              </button>
              <button
                onClick={() => router.push("/history")}
                className="flex-1 bg-cyan-300 hover:bg-cyan-200 text-black border-4 border-black px-6 py-4 font-black uppercase text-sm md:text-base shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all"
              >
                View History
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-green-200 border-4 border-black px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-black font-bold text-sm">
                <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
                ACCOUNT ACTIVE
              </p>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
