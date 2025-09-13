"use client";

import React from 'react';
import { useRouter } from 'next/navigation';



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
      description: "Select from our collection of your favraite personalities, innovators, and thought leaders to start your conversation.",
      icon: "👤"
    },
    {
      title: "Start the Conversation",
      description: "Ask questions, seek advice, or explore ideas with AI-powered personalities that think and respond authentically.",
      icon: "💬"
    },
    {
      title: "Gain New Insights",
      description: "Discover unique perspectives and wisdom from the your favraite personalities, powered by cutting-edge AI technology.",
      icon: "💡"
    }
  ];

  return (
    <section className="relative py-20 flex flex-col m-0">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            How it{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience conversations with your favraite personalities, powered by advanced AI technology.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              {/* Step Number */}
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center border-2 border-purple-200/50 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{step.icon}</span>
                </div>
              </div>

              {/* Step Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line (except last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-purple-200 to-transparent transform -translate-x-10 -translate-y-1/2" style={{ zIndex: -1 }} />
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button  
          onClick={() => router.push('/persona')}
          className="group relative transform transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0">
            <div className="absolute inset-0 bg-black/20 rounded-full transform translate-y-1 group-hover:translate-y-0.5 transition-transform duration-150"></div>
            <div className="relative bg-gradient-to-b from-pink-200 to-pink-300 hover:from-pink-150 hover:to-pink-250 text-gray-900 px-8 py-4 rounded-full font-medium text-lg border border-pink-300/50 shadow-sm">
              Start Your First Conversation
            </div>
          </button>
        </div>
      </div>

      {/* Decorative Elements - Same as Hero Section */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-xl opacity-60"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-pink-200 to-red-200 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-xl opacity-60"></div>
    </section>
    
  );
};

export default HowItWorksSection;