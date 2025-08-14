"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, Sparkles, User, ArrowRight } from 'lucide-react';
import { PERSONAS } from "@/type/personaInfo";

export default function PersonaCards() {
  const router = useRouter();

  const handlePersonaSelect = (personaKey: string, persona: any) => {
    // Store persona info in localStorage for the chat page
    const personaData = {
      key: personaKey,
      name: persona.name || personaKey,
      role: persona.role || '',
      personality: persona.personality || '',
      image: persona.image || '',
      communicationStyle: persona.communicationStyle || 'Engaging and thoughtful',
      tone: persona.tone || 'Professional yet approachable',
      expertise: persona.expertise || 'Various fields of knowledge',
      additionalContext: persona.additionalContext || ''
    };

    localStorage.setItem('selectedPersona', JSON.stringify(personaData));
    
    // Navigate to chat page
    router.push('/chat');
  };

  return (
    <div className="relative min-h-screen flex flex-col p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Meet the <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Greatest Minds</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Note: All conversations and responses on this platform are AI-generated and are not authored by the real individuals they represent. The personas are simulated for educational and entertainment purposes only.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {Object.entries(PERSONAS).map(([key, persona]) => (
          <div
            key={key}
            className="group relative bg-white/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 max-w-sm mx-auto w-full flex flex-col"
          >
            {/* Image Section */}
            {persona.image && (
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                <img
                  src={persona.image}
                  alt={persona.name || key}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            {/* Content + Button Wrapper */}
            <div className="flex flex-col flex-grow">
              {/* Content Section */}
              <div className="p-4 space-y-3 flex-grow min-h-[150px]">
                {/* Name & Role */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                    {persona.name}
                  </h3>
                  {persona.role && (
                    <p className="text-xs font-medium text-purple-600 mt-1">
                      {persona.role}
                    </p>
                  )}
                </div>

                {/* Personality Description */}
                {persona.personality && (
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {persona.personality}
                  </p>
                )}

                {/* Stats/Info */}
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>AI Chat</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Interactive</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => handlePersonaSelect(key, persona)}
                  className="group relative w-full transform transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 rounded-xl overflow-hidden"
                >
                  {/* Shadow layer */}
                  <div className="absolute inset-0 bg-black/10 rounded-xl blur-sm opacity-70 group-hover:opacity-90 transition-opacity duration-200"></div>

                  {/* Button background */}
                  <div className="relative bg-gradient-to-b from-pink-200 to-pink-300 hover:from-pink-100 hover:to-pink-200 text-gray-900 py-4 font-medium text-lg border border-pink-300/50 shadow-md text-center flex items-center justify-center gap-2">
                    <span>Start Chat</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Elements - Same as Hero Section */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-xl opacity-60"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-pink-200 to-red-200 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-xl opacity-60"></div>
    </div>
  );
}