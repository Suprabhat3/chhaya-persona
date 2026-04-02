"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import {
  PERSONAS_BY_CATEGORY,
  CATEGORY_NAMES,
  getCategoryKeys,
  PersonaInfo,
  PersonaCategory,
} from "@/type/personaInfo";

// Category colors for visual distinction
const CATEGORY_COLORS: Record<
  PersonaCategory,
  { bg: string; hover: string; border: string }
> = {
  companion: {
    bg: "bg-pink-400",
    hover: "hover:bg-pink-300",
    border: "border-pink-500",
  },
  "tech-educators": {
    bg: "bg-cyan-400",
    hover: "hover:bg-cyan-300",
    border: "border-cyan-500",
  },
  "sales-mentors": {
    bg: "bg-orange-400",
    hover: "hover:bg-orange-300",
    border: "border-orange-500",
  },
  bollywood: {
    bg: "bg-yellow-400",
    hover: "hover:bg-yellow-300",
    border: "border-yellow-500",
  },
  leaders: {
    bg: "bg-green-400",
    hover: "hover:bg-green-300",
    border: "border-green-500",
  },
  "tech-ceos": {
    bg: "bg-blue-400",
    hover: "hover:bg-blue-300",
    border: "border-blue-500",
  },
  "ai-visionaries": {
    bg: "bg-purple-400",
    hover: "hover:bg-purple-300",
    border: "border-purple-500",
  },
};

export default function PersonaCards() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<PersonaCategory | "all">(
    "all"
  );
  const categories = getCategoryKeys();

  const handlePersonaSelect = (persona: PersonaInfo) => {
    // Store persona info in localStorage for the chat page
    const personaData = {
      key: persona.key,
      name: persona.name,
      role: persona.role,
      personality: persona.personality,
      image: persona.image || "",
      communicationStyle: "Engaging and thoughtful",
      tone: "Professional yet approachable",
      expertise: "Various fields of knowledge",
      additionalContext: "",
    };

    localStorage.setItem("selectedPersona", JSON.stringify(personaData));
    router.push("/chat");
  };

  // Get filtered personas based on active category
  const getDisplayedCategories = (): PersonaCategory[] => {
    if (activeCategory === "all") {
      return categories;
    }
    return [activeCategory];
  };

  return (
    <div className="relative min-h-screen flex flex-col p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12 relative z-10">
        <h1 className="text-4xl md:text-7xl font-black text-black mb-6 tracking-tight uppercase">
          Meet the <br />
          <span className="inline-block bg-purple-500 text-white px-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 mt-2">
            AI Personalities
          </span>
        </h1>
        <div className="max-w-3xl mx-auto border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-sm md:text-lg font-bold text-black">
            Note: All conversations are AI-generated. The personas are simulated
            for educational and entertainment purposes only.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 relative z-10">
        {/* All Tab */}
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 md:px-6 md:py-3 font-black text-xs md:text-sm uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
            activeCategory === "all"
              ? "bg-black text-white translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              : "bg-white text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          }`}
        >
          🌟 All
        </button>

        {/* Category Tabs */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 md:px-6 md:py-3 font-black text-xs md:text-sm uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
              activeCategory === category
                ? `${CATEGORY_COLORS[category].bg} text-black translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`
                : "bg-white text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            {CATEGORY_NAMES[category]}
          </button>
        ))}
      </div>

      {/* Categorized Cards */}
      <div className="space-y-12 md:space-y-16 max-w-7xl mx-auto w-full relative z-10">
        {getDisplayedCategories().map((category) => (
          <div key={category} className="space-y-6">
            {/* Category Header */}
            {activeCategory === "all" && (
              <div className="flex items-center gap-4 mb-6">
                <h2
                  className={`inline-block text-2xl md:text-3xl font-black text-black uppercase px-4 py-2 ${CATEGORY_COLORS[category].bg} border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
                >
                  {CATEGORY_NAMES[category]}
                </h2>
                <div className="flex-1 h-1 bg-black hidden md:block"></div>
              </div>
            )}

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {PERSONAS_BY_CATEGORY[category].map((persona) => (
                <div
                  key={persona.key}
                  className="group relative bg-white border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex flex-col"
                >
                  {/* Image Section */}
                  {persona.image && (
                    <div className="relative h-56 md:h-64 overflow-hidden border-b-4 border-black">
                      <Image
                        src={persona.image}
                        alt={persona.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain transition-all duration-300 transform group-hover:scale-105"
                      />
                      {/* Category Badge */}
                      <div
                        className={`absolute top-3 right-3 ${CATEGORY_COLORS[category].bg} border-2 border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                      >
                        <span className="text-[10px] font-black text-black uppercase">
                          {CATEGORY_NAMES[category].split(" ")[0]}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Content + Button Wrapper */}
                  <div className="flex flex-col flex-grow p-4 md:p-5 bg-white">
                    {/* Content Section */}
                    <div className="space-y-3 flex-grow min-h-[120px] md:min-h-[150px]">
                      {/* Name & Role */}
                      <div>
                        <h3 className="text-xl md:text-2xl font-black text-black uppercase leading-tight">
                          {persona.name}
                        </h3>
                        {persona.role && (
                          <div className="inline-block bg-yellow-300 border border-black px-2 py-0.5 mt-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <p className="text-[10px] md:text-xs font-bold text-black uppercase tracking-wide line-clamp-1">
                              {persona.role}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Personality Description */}
                      {persona.personality && (
                        <p className="text-xs md:text-sm font-medium text-gray-800 leading-snug border-l-4 border-black pl-3 my-3 line-clamp-2">
                          {persona.personality}
                        </p>
                      )}

                      {/* Stats/Info */}
                      <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold text-black pt-2">
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
                        onClick={() => handlePersonaSelect(persona)}
                        className={`w-full relative ${CATEGORY_COLORS[category].bg} ${CATEGORY_COLORS[category].hover} text-black border-2 border-black py-2 md:py-3 font-black text-sm md:text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2`}
                      >
                        START CHAT
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 stroke-[3px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-40 left-10 w-24 h-24 bg-blue-400 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hidden lg:block animate-pulse"></div>
      <div className="absolute top-20 right-20 w-0 h-0 border-l-[30px] border-l-transparent border-t-[50px] border-t-red-500 border-r-[30px] border-r-transparent filter drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] transform -rotate-12 hidden lg:block"></div>
      <div className="absolute bottom-60 left-20 w-16 h-16 rounded-full bg-green-400 border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hidden lg:block"></div>
      <div className="absolute bottom-40 right-10 w-20 h-20 bg-orange-400 transform rotate-45 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hidden lg:block"></div>
    </div>
  );
}
