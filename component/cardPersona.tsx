"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Sparkles, User, ArrowRight } from "lucide-react";
import { PERSONAS } from "@/type/personaInfo";

export default function PersonaCards() {
  const router = useRouter();

  const handlePersonaSelect = (personaKey: string, persona: any) => {
    // Store persona info in localStorage for the chat page
    const personaData = {
      key: personaKey,
      name: persona.name || personaKey,
      role: persona.role || "",
      personality: persona.personality || "",
      image: persona.image || "",
      communicationStyle:
        persona.communicationStyle || "Engaging and thoughtful",
      tone: persona.tone || "Professional yet approachable",
      expertise: persona.expertise || "Various fields of knowledge",
      additionalContext: persona.additionalContext || "",
    };

    localStorage.setItem("selectedPersona", JSON.stringify(personaData));

    // Navigate to chat page
    router.push("/chat");
  };

  return (
    <div className="relative min-h-screen flex flex-col p-8">
      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-black text-black mb-6 tracking-tight uppercase">
          Meet the <br />
          <span className="inline-block bg-purple-500 text-white px-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 mt-2">
            Greatest Minds
          </span>
        </h1>
        <div className="max-w-3xl mx-auto border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-lg font-bold text-black">
            Note: All conversations and responses on this platform are
            AI-generated regarding the real individuals they represent. The
            personas are simulated for educational and entertainment purposes
            only.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-10">
        {Object.entries(PERSONAS).map(([key, persona]) => (
          <div
            key={key}
            className="group relative bg-white border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex flex-col"
          >
            {/* Image Section */}
            {persona.image && (
              <div className="relative h-64 overflow-hidden border-b-4 border-black">
                <img
                  src={persona.image}
                  alt={persona.name || key}
                  className="w-full h-full object-cover transition-all duration-300 transform group-hover:scale-105"
                />
              </div>
            )}

            {/* Content + Button Wrapper */}
            <div className="flex flex-col flex-grow p-5 bg-white">
              {/* Content Section */}
              <div className="space-y-3 flex-grow min-h-[150px]">
                {/* Name & Role */}
                <div>
                  <h3 className="text-2xl font-black text-black uppercase leading-tight">
                    {persona.name}
                  </h3>
                  {persona.role && (
                    <div className="inline-block bg-yellow-300 border border-black px-2 py-0.5 mt-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <p className="text-xs font-bold text-black uppercase tracking-wide">
                        {persona.role}
                      </p>
                    </div>
                  )}
                </div>

                {/* Personality Description */}
                {persona.personality && (
                  <p className="text-sm font-medium text-gray-800 leading-snug border-l-4 border-black pl-3 my-3">
                    {persona.personality}
                  </p>
                )}

                {/* Stats/Info */}
                <div className="flex items-center gap-3 text-xs font-bold text-black pt-2">
                  <div className="flex items-center gap-1 bg-gray-200 border border-black px-2 py-1 rounded-sm">
                    <MessageCircle className="w-3 h-3" />
                    <span>AI CHAT</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-200 border border-black px-2 py-1 rounded-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>INTERACTIVE</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-2">
                <button
                  onClick={() => handlePersonaSelect(key, persona)}
                  className="w-full relative bg-pink-400 hover:bg-pink-300 text-black border-2 border-black py-3 font-black text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2"
                >
                  START CHAT
                  <ArrowRight className="w-5 h-5 stroke-[3px]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Elements - Geometric & Brutalist */}
      <div className="absolute top-40 left-10 w-24 h-24 bg-blue-400 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hidden lg:block animate-pulse"></div>
      <div className="absolute top-20 right-20 w-0 h-0 border-l-[30px] border-l-transparent border-t-[50px] border-t-red-500 border-r-[30px] border-r-transparent filter drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] transform -rotate-12 hidden lg:block"></div>
      <div className="absolute bottom-60 left-20 w-16 h-16 rounded-full bg-green-400 border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hidden lg:block"></div>
      <div className="absolute bottom-40 right-10 w-20 h-20 bg-orange-400 transform rotate-45 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hidden lg:block"></div>
    </div>
  );
}
