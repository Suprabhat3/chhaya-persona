// hero
"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  avatar: string;
}

const HeroSection: React.FC = () => {
  const router = useRouter();
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

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span><img src="favicon.ico" alt="Logo" className="rounded" /></span>
          </div>
          <span className="text-xl font-bold text-gray-900">Chhaya Persona</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#reviews" className="text-gray-700 hover:text-gray-900 transition-colors">
            Reviews
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-gray-900 transition-colors">
            Pricing
          </a>
          <a href="#faq" className="text-gray-700 hover:text-gray-900 transition-colors">
            FAQ
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Sign in Button - Purple Theme */}
          <button
            onClick={() => router.push('/signup')}
            className="bg-purple-100 text-gray-800 px-6 py-2 rounded-full font-medium border border-purple-600 shadow-none hover:shadow-[6px_6px_0_0_rgba(24,24,27,0.8)] transition-all duration-300"
          >
            Sign in
          </button>

          {/* Log In Button - Green Theme */}
          <button
            onClick={() => router.push('/login')}
            className="bg-green-100 text-gray-800 px-6 py-2 rounded-full font-medium border border-green-600 shadow-none hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.8)] transition-all duration-300"
          >
            Log in
          </button>

          {/* Try Demo - Sky Theme */}
          <button
            onClick={() => alert('Demo feature coming soon!')}
            className="bg-sky-100 text-gray-800 px-6 py-2 rounded-full font-medium border border-sky-600 shadow-none hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.8)] transition-all duration-300"
          >
            Try Demo
          </button>
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

        <button  onClick={() => router.push('/chat')}
        className="group relative mb-12 transform transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0">
          <div className="absolute inset-0 bg-black/20 rounded-full transform translate-y-1 group-hover:translate-y-0.5 transition-transform duration-150"></div>
          <div className="relative bg-gradient-to-b from-pink-200 to-pink-300 hover:from-pink-150 hover:to-pink-250 text-gray-900 px-8 py-4 rounded-full font-medium text-lg border border-pink-300/50 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.7)]">
            Get instant access
          </div>
        </button>

        {/* User Avatars and Social Proof */}
        {/* <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center -space-x-3">
            {users.map((user, index) => (
              <div
                key={user.id}
                className={`relative w-12 h-12 rounded-full border-3 border-white shadow-lg transform transition-transform hover:scale-110 hover:z-10 ${
                  index % 2 === 0
                    ? 'bg-gradient-to-br from-blue-400 to-purple-500'
                    : index % 3 === 0
                    ? 'bg-gradient-to-br from-green-400 to-blue-500'
                    : 'bg-gradient-to-br from-pink-400 to-red-500'
                }`}
                style={{ zIndex: users.length - index }}
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user.name.charAt(0)}
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 font-medium">
            <span className="text-gray-900 font-bold">3,464</span> persons already use
          </p>
        </div> */}
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