"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth"; // Import the useAuth hook we created earlier

interface User {
  id: number;
  name: string;
  avatar: string;
}

interface UserProfile {
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar_url?: string;
}

const HeroSection: React.FC = () => {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const users: User[] = [
    { id: 1, name: "User 1", avatar: "/hiteshchoudhary.png" },
    { id: 2, name: "User 2", avatar: "/avatars/user2.jpg" },
    { id: 3, name: "User 3", avatar: "/avatars/user3.jpg" },
    { id: 4, name: "User 4", avatar: "/avatars/user4.jpg" },
    { id: 5, name: "User 5", avatar: "/avatars/user5.jpg" },
    { id: 6, name: "User 6", avatar: "/avatars/user6.jpg" },
    { id: 7, name: "User 7", avatar: "/avatars/user7.jpg" },
    { id: 8, name: "User 8", avatar: "/avatars/user8.jpg" },
  ];

  // Fetch user profile data when user is logged in
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const { supabase } = await import("@/lib/supabase");
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (data && !error) {
            setUserProfile(data);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      setUserProfile(null);
      setShowDropdown(false);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleViewHistory = () => {
    setShowDropdown(false);
    router.push("/history");
  };

  const handleViewProfile = () => {
    setShowDropdown(false);
    router.push("/profile");
  };

  const handleMobileMenuClick = (action: () => void) => {
    action();
    setShowMobileMenu(false);
  };

  // Generate user initials for avatar
  const getUserInitials = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name.charAt(0)}${userProfile.last_name.charAt(
        0
      )}`.toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  // Generate display name
  const getDisplayName = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name} ${userProfile.last_name}`;
    }
    if (userProfile?.first_name) {
      return userProfile.first_name;
    }
    if (user?.email) {
      return user.email.split("@")[0];
    }
    return "User";
  };

  return (
    <div className="relative flex flex-col">
      {/* Main Hero Content */}
      <main className="flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto z-10 mt-12 mb-12">
        {/* Badge */}
        <div className="mb-8 inline-block bg-green-400 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-2 transform -rotate-2">
          <span className="font-black text-sm uppercase tracking-wider text-black">
            Now with advanced Memory 🧠
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-black mb-6 md:mb-8 leading-tight tracking-tight">
          CONVERSATIONS WITH THE <br className="md:hidden" />
          <span className="relative inline-block bg-purple-500 text-white px-2 md:px-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 mt-2 md:mt-0 mx-0 md:mx-2">
            GREATEST MINDS
          </span>
        </h1>

        <div className="max-w-3xl border-2 border-black bg-white p-4 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8 md:mb-12 transform rotate-1">
          <p className="text-lg md:text-2xl font-bold text-black leading-relaxed">
            Chhaya Persona uses cutting-edge AI to bring famous figures to life,
            allowing for conversations and insights like never before.
          </p>
        </div>

        <button
          onClick={() => {
            if (user) {
              router.push("/persona");
            } else {
              router.push("/persona");
            }
          }}
          className="group relative inline-flex items-center justify-center"
        >
          <div className="relative bg-yellow-400 hover:bg-yellow-300 text-black border-4 border-black px-6 py-4 md:px-10 md:py-5 font-black text-lg md:text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group-hover:translate-x-[2px] group-hover:translate-y-[2px] md:group-hover:translate-x-[4px] md:group-hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] md:active:translate-x-[8px] md:active:translate-y-[8px] active:shadow-none">
            {user ? "START CHATTING" : "GET INSTANT ACCESS"}
          </div>
        </button>
      </main>

      {/* Decorative Geometric Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-blue-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce hidden md:block"></div>
      <div className="absolute bottom-40 right-20 w-20 h-20 bg-green-400 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden md:block"></div>
      <div className="absolute top-40 right-32 w-0 h-0 border-l-[30px] border-l-transparent border-t-[50px] border-t-red-500 border-r-[30px] border-r-transparent filter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] transform rotate-12 hidden md:block"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-orange-400 rotate-45 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden md:block"></div>
    </div>
  );
};
export default HeroSection;
