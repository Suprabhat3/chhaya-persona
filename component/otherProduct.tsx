'use client';

import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

// Data for the products
const productsData = [
  {
    imageSrc: "/hirementies.png", // Replace with your actual image path
    name: "HireMentis",
    description: "Ace your next interview with realistic, AI-driven practice sessions and receive instant, actionable feedback.",
    features: [
      "Realistic AI Interviews",
      "Instant Performance Feedback",
      "Tailored for Various Roles"
    ],
    url: "https://www.hirementis.site/"
  },
    {
    imageSrc: "/contexual-ai.png", // Replace with your actual image path
    name: "Contextual AI",
    description: "Upload any PDF or other document and get precise, contextual answers. Our advanced RAG technology understands your documents, so you don't have to.",
    features: [
      "Transform your PDFs into intelligent conversations",
      "RAG technology",
      "Open-Source Platform"
    ],
    url: "https://contextual-ai.suprabhat.site/"
  },
];

const OurProductsSection: React.FC = () => {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Our Other AI Products for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Every Need
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Explore our suite of powerful, intuitive tools designed to help you achieve your goals with the power of AI.
          </p>
        </div>

        {/* Products Grid */}
        {/* FIX: Removed 'items-start' to allow cards to stretch to equal height */}
        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {productsData.map((product, index) => (
            <a 
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="block group"
            >
              {/* FIX: Added 'flex flex-col' to allow content to grow */}
              <div className="h-full bg-white/80 backdrop-blur-xl border border-gray-200/80 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
                {/* --- IMAGE CONTAINER --- */}
                <div className="aspect-video overflow-hidden">
                   <img 
                    src={product.imageSrc} 
                    alt={`${product.name} preview`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {/* --- END IMAGE CONTAINER --- */}
                
                {/* FIX: Added 'flex flex-col flex-grow' to make this section fill available space */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
                  {/* FIX: Added 'flex-grow' to the description to push the features to the bottom */}
                  <p className="text-gray-600 mb-6 flex-grow">{product.description}</p>
                  
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0" />
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
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-xl opacity-60 -z-10"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-xl opacity-60 -z-10"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-pink-200 to-red-200 rounded-full blur-xl opacity-60 -z-10"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-xl opacity-60 -z-10"></div>
    </section>
  );
};

export default OurProductsSection;