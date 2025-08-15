"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth'; // Import the useAuth hook we created earlier

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
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const users: User[] = [
    { id: 1, name: 'User 1', avatar: '/hiteshchoudhary.png'},
    { id: 2, name: 'User 2', avatar: '/avatars/user2.jpg' },
    { id: 3, name: 'User 3', avatar: '/avatars/user3.jpg' },
    { id: 4, name: 'User 4', avatar: '/avatars/user4.jpg' },
    { id: 5, name: 'User 5', avatar: '/avatars/user5.jpg' },
    { id: 6, name: 'User 6', avatar: '/avatars/user6.jpg' },
    { id: 7, name: 'User 7', avatar: '/avatars/user7.jpg' },
    { id: 8, name: 'User 8', avatar: '/avatars/user8.jpg' },
  ];

  // Fetch user profile data when user is logged in
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const { supabase } = await import('@/lib/supabase');
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (data && !error) {
            setUserProfile(data);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      setUserProfile(null);
      setShowDropdown(false);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleViewHistory = () => {
    setShowDropdown(false);
    router.push('/history');
  };

  const handleViewProfile = () => {
    setShowDropdown(false);
    router.push('/profile');
  };

  // Generate user initials for avatar
  const getUserInitials = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name.charAt(0)}${userProfile.last_name.charAt(0)}`.toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
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
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span><img src="/favicon.ico" alt="Logo" className="rounded" /></span>
          </div>
          <span className="hidden md:inline-block text-xl font-bold text-gray-900">Chhaya Persona</span>
        </div>
        <div className="flex items-center space-x-4">
          {loading ? (
            // Loading state
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          ) : user ? (
            // Logged in user - show profile dropdown
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">{getDisplayName()}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    showDropdown ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  {/* User Info */}
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
                        <p className="font-medium text-gray-900">{getDisplayName()}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={handleViewProfile}
                      className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      View Profile
                    </button>
                    
                    <button
                      onClick={handleViewHistory}
                      className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Chat History
                    </button>

                    <hr className="my-2 border-gray-100" />
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Not logged in - show auth buttons
            <>
              <button
                onClick={() => router.push('/signup')}
                className="bg-purple-100 text-gray-800 px-6 py-2 rounded-full font-medium border border-purple-600 shadow-none hover:shadow-[6px_6px_0_0_rgba(24,24,27,0.8)] transition-all duration-300"
              >
                Sign up
              </button>

              <button
                onClick={() => router.push('/login')}
                className="bg-green-100 text-gray-800 px-6 py-2 rounded-full font-medium border border-green-600 shadow-none hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.8)] transition-all duration-300"
              >
                Log in
              </button>

              <button
                onClick={() => router.push('/persona')}
                className="bg-sky-100 text-gray-800 px-6 py-2 rounded-full font-medium border border-sky-600 shadow-none hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.8)] transition-all duration-300"
              >
                Try Demo
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Hero Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
          Conversations with the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Greatest Minds
          </span>
          , Powered by AI
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl leading-relaxed">
          Chhaya Persona uses cutting-edge AI to bring famous figures to life,
          allowing for conversations and insights like never before
        </p>

        <button 
          onClick={() => {
            if (user) {
              router.push('/persona');
            } else {
              router.push('/signup');
            }
          }}
          className="group relative mb-12 transform transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
        >
          <div className="absolute inset-0 bg-black/20 rounded-full transform translate-y-1 group-hover:translate-y-0.5 transition-transform duration-150"></div>
          <div className="relative bg-gradient-to-b from-pink-200 to-pink-300 hover:from-pink-150 hover:to-pink-250 text-gray-900 px-8 py-4 rounded-full font-medium text-lg border border-pink-300/50 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.7)]">
            {user ? 'Start Chatting' : 'Get instant access'}
          </div>
        </button>
      </main>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-xl opacity-60"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-pink-200 to-red-200 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-xl opacity-60"></div>
    </div>
  );
};
export default HeroSection;