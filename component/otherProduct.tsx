"use client";

import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

// Data for the products
const productsData = [
  {
    imageSrc: "/hirementies.png", // Replace with your actual image path
    name: "HireMentis",
    description:
      "Ace your next interview with realistic, AI-driven practice sessions and receive instant, actionable feedback.",
    features: [
      "Realistic AI Interviews",
      "Instant Performance Feedback",
      "Tailored for Various Roles",
    ],
    url: "https://www.hirementis.site/",
  },
  {
    imageSrc: "/contexual-ai.png", // Replace with your actual image path
    name: "Contextual AI",
    description:
      "Upload any PDF or other document and get precise, contextual answers. Our advanced RAG technology understands your documents, so you don't have to.",
    features: [
      "Transform your PDFs into intelligent conversations",
      "RAG technology",
      "Open-Source Platform",
    ],
    url: "https://contextual-ai.suprabhat.site/",
  },
];

const OurProductsSection: React.FC = () => {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-black mb-6 uppercase tracking-tight">
            Our Other AI Products for <br />
            <span className="inline-block bg-yellow-400 text-black px-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 mt-2">
              Every Need
            </span>
          </h2>
          <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
            <p className="text-xl font-bold text-black">
              Explore our suite of powerful, intuitive tools designed to help
              you achieve your goals with the power of AI.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {productsData.map((product, index) => (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="block group"
            >
              <div className="h-full bg-white border-4 border-black box-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex flex-col">
                {/* --- IMAGE CONTAINER --- */}
                <div className="aspect-video overflow-hidden border-b-4 border-black relative">
                  <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  <img
                    src={product.imageSrc}
                    alt={`${product.name} preview`}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                {/* --- END IMAGE CONTAINER --- */}

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-3xl font-black text-black mb-3 uppercase flex items-center gap-2">
                    {product.name}
                    <ArrowRight
                      className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"
                      strokeWidth={3}
                    />
                  </h3>
                  <p className="text-gray-800 font-medium mb-6 flex-grow leading-relaxed border-l-4 border-black pl-4">
                    {product.description}
                  </p>

                  <ul className="space-y-3 pt-4 border-t-2 border-dashed border-gray-300">
                    {product.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-sm font-bold text-black"
                      >
                        <div className="w-5 h-5 bg-black text-white flex items-center justify-center rounded-none flex-shrink-0">
                          <CheckCircle className="w-3 h-3" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-green-400 border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden md:block"></div>
      <div className="absolute bottom-40 right-20 w-0 h-0 border-l-[40px] border-l-transparent border-b-[60px] border-b-red-500 border-r-[40px] border-r-transparent filter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] transform rotate-45 hidden md:block"></div>
    </section>
  );
};

export default OurProductsSection;
