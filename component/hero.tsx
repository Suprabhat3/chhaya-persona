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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
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
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
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

  const handleMobileMenuClick = (action: () => void) => {
    action();
    setShowMobileMenu(false);
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