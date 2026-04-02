"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { getAllPersonas, PersonaInfo } from "@/type/personaInfo";

// Featured persona keys (pick the most popular ones)
const FEATURED_PERSONA_KEYS = [
  "hiteshchoudhary",
  "piyushgarg",
  "suprabhat",
  "girlFriend",
  "shahRukhKhan",
  "elonMusk",
];

export default function FeaturedPersonas() {
  const router = useRouter();
  const allPersonas = getAllPersonas();

  // Get featured personas
  const featuredPersonas = FEATURED_PERSONA_KEYS.map((key) =>
    allPersonas.find((p) => p.key === key)
  ).filter((p): p is PersonaInfo => p !== undefined);

  const handlePersonaSelect = (persona: PersonaInfo) => {
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

  return (
    <div className="relative py-12 md:py-20 px-4 md:px-8">
      {/* Section Header */}
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-black mb-4 uppercase tracking-tight">
          Chat With{" "}
          <span className="inline-block bg-pink-400 text-black px-3 py-1 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
            AI Personalities
          </span>
        </h2>
        <div className="max-w-3xl mx-auto border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-lg md:text-xl font-bold text-black">
          Note: All conversations are AI-generated. The personas are simulated
          for educational and entertainment purposes only.
        </div>
      </div>

      {/* Featured Personas Grid - Same card style as cardPersona.tsx */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-10">
        {featuredPersonas.map((persona) => (
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-fill transition-all duration-300 transform group-hover:scale-105"
                />
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
                  className="w-full relative bg-pink-400 hover:bg-pink-300 text-black border-2 border-black py-2 md:py-3 font-black text-sm md:text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2"
                >
                  START CHAT
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 stroke-[3px]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center">
        <button
          onClick={() => router.push("/persona")}
          className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-black border-4 border-black px-8 py-4 font-black text-lg md:text-xl uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all"
        >
          View All Personas
          <ArrowRight className="w-6 h-6 stroke-[3px]" />
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-5 w-12 h-12 bg-cyan-400 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden lg:block transform rotate-12"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-pink-400 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden lg:block rounded-full"></div>
    </div>
  );
}
