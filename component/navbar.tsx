"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface UserProfile {
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar_url?: string;
}

const Navbar: React.FC = () => {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // If the click is inside any of the menus, do nothing.
      if (
        desktopDropdownRef.current?.contains(target) ||
        mobileDropdownRef.current?.contains(target) ||
        mobileMenuRef.current?.contains(target)
      ) {
        return;
      }
      setShowDropdown(false);
      setShowMobileMenu(false);
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
    <header className="bg-white fixed top-0 right-4 left-4 w-auto z-50 border-3 rounded-2xl border-black mt-2">
      <div className="flex items-center justify-between px-6 pt-2 pb-2 max-w-7xl mx-auto w-full">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="w-10 h-10 bg-black flex items-center justify-center border-2 border-transparent hover:border-black hover:bg-white transition-all duration-200 group rounded-md">
            <span>
              <img
                src="/favicon.ico"
                alt="Logo"
                className="rounded-none w-6 h-6 group-hover:scale-110 transition-transform"
              />
            </span>
          </div>
          <span className="md:inline-block text-xl font-bold text-gray-900">
            Chhaya Persona
          </span>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {loading ? (
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          ) : user ? (
            <div className="relative" ref={desktopDropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {userProfile?.avatar_url ? (
                  <img
                    src={userProfile.avatar_url}
                    alt={getDisplayName()}
                    className="w-10 h-10 rounded-full border-2 border-black object-cover font-bold"
                  />
                ) : (
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-black">
                    {getUserInitials()}
                  </div>
                )}
                <div className="text-left">
                  <p className="text-sm text-gray-900 font-bold">
                    {getDisplayName()}
                  </p>
                  {/* <p className="text-xs text-gray-500">{user?.email}</p> */}
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] py-2 z-50">
                  <div className="px-4 py-3 border-b-2 border-black">
                    <div className="flex items-center space-x-3">
                      {userProfile?.avatar_url ? (
                        <img
                          src={userProfile.avatar_url}
                          alt={getDisplayName()}
                          className="w-12 h-12 rounded-full object-cover border-2 border-black"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-black">
                          {getUserInitials()}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-black">
                          {getDisplayName()}
                        </p>
                        <p className="text-sm text-gray-600 font-medium">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={handleViewProfile}
                      className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 mr-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      View Profile
                    </button>
                    <button
                      onClick={handleViewHistory}
                      className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 mr-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Chat History
                    </button>
                    <hr className="my-2 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 mr-3 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => router.push("/signup")}
                className="bg-purple-200 text-black px-6 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
              >
                Sign up
              </button>
              <button
                onClick={() => router.push("/login")}
                className="bg-green-200 text-black px-6 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
              >
                Log in
              </button>
              <button
                onClick={() => router.push("/persona")}
                className="bg-sky-200 text-black px-6 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
              >
                Try Demo
              </button>
            </>
          )}
        </div>
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-4">
          {loading ? (
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          ) : user ? (
            <div className="relative" ref={mobileDropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {userProfile?.avatar_url ? (
                  <img
                    src={userProfile.avatar_url}
                    alt={getDisplayName()}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium text-sm border-2 border-gray-200">
                    {getUserInitials()}
                  </div>
                )}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      {userProfile?.avatar_url ? (
                        <img
                          src={userProfile.avatar_url}
                          alt={getDisplayName()}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                          {getUserInitials()}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {getDisplayName()}
                        </p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={handleViewProfile}
                      className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 mr-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      View Profile
                    </button>
                    <button
                      onClick={handleViewHistory}
                      className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 mr-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Chat History
                    </button>
                    <hr className="my-2 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 mr-3 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative" ref={mobileMenuRef}>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 border-2 border-transparent hover:border-black hover:bg-yellow-200 transition-all focus:outline-none"
                aria-label="Menu"
              >
                <svg
                  className={`w-6 h-6 text-black transition-transform duration-200 ${
                    showMobileMenu ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {showMobileMenu ? (
                    <path
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                      strokeWidth={3}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
              {showMobileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] py-2 z-50">
                  <button
                    onClick={() =>
                      handleMobileMenuClick(() => router.push("/signup"))
                    }
                    className="w-full flex items-center px-4 py-3 text-left text-black font-bold hover:bg-purple-200 transition-colors border-b-2 border-black"
                  >
                    <svg
                      className="w-5 h-5 mr-3 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        strokeWidth={3}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    Sign up
                  </button>
                  <button
                    onClick={() =>
                      handleMobileMenuClick(() => router.push("/login"))
                    }
                    className="w-full flex items-center px-4 py-3 text-left text-black font-bold hover:bg-green-200 transition-colors border-b-2 border-black"
                  >
                    <svg
                      className="w-5 h-5 mr-3 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        strokeWidth={3}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Log in
                  </button>
                  <button
                    onClick={() =>
                      handleMobileMenuClick(() => router.push("/persona"))
                    }
                    className="w-full flex items-center px-4 py-3 text-left text-black font-bold hover:bg-sky-200 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-3 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        strokeWidth={3}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Try Demo
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
