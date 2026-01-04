"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Step {
  title: string;
  description: string;
  icon: string;
}

const HowItWorksSection: React.FC = () => {
  const router = useRouter();
  const steps: Step[] = [
    {
      title: "Choose Your Persona",
      description:
        "Select from our collection of your favraite personalities, innovators, and thought leaders to start your conversation.",
      icon: "👤",
    },
    {
      title: "Start the Conversation",
      description:
        "Ask questions, seek advice, or explore ideas with AI-powered personalities that think and respond authentically.",
      icon: "💬",
    },
    {
      title: "Gain New Insights",
      description:
        "Discover unique perspectives and wisdom from the your favraite personalities, powered by cutting-edge AI technology.",
      icon: "💡",
    },
  ];

  return (
    <section className="relative py-20 flex flex-col m-0">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-black mb-6 uppercase tracking-tight transform -rotate-1">
            How it{" "}
            <span className="bg-purple-500 text-white px-3 py-1 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Works
            </span>
          </h2>
          <div className="bg-white border-2 border-black inline-block p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1 max-w-3xl">
            <p className="text-xl font-bold text-black">
              Experience conversations with your favraite personalities, powered
              by advanced AI technology.
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center group relative">
              {/* Step Number */}
              <div className="relative mb-8 inline-block">
                <div className="w-24 h-24 mx-auto bg-white rounded-none flex items-center justify-center border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                  <span className="text-4xl">{step.icon}</span>
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-black text-white flex items-center justify-center font-black border-2 border-white">
                  {index + 1}
                </div>
              </div>

              {/* Step Content */}
              <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[200px] flex flex-col justify-center transform group-hover:-rotate-1 transition-transform">
                <h3 className="text-2xl font-black text-black mb-4 uppercase">
                  {step.title}
                </h3>
                <p className="text-black font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <button
            onClick={() => router.push("/persona")}
            className="group relative inline-flex"
          >
            <div className="relative bg-orange-400 hover:bg-orange-300 text-black px-10 py-5 font-black text-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none transition-all duration-200">
              Start Your First Conversation
            </div>
          </button>
        </div>
      </div>

      {/* Decorative Assets */}
      <div className="absolute top-20 left-10 w-0 h-0 border-l-[20px] border-l-transparent border-b-[40px] border-b-blue-500 border-r-[20px] border-r-transparent filter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] transform -rotate-12 hidden md:block"></div>
      <div className="absolute bottom-40 right-10 w-16 h-16 bg-pink-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full hidden md:block"></div>
    </section>
  );
};

export default HowItWorksSection;
