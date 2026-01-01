import React from "react";
import { Heart, Coffee, Gift, Zap } from "lucide-react";

const SupportMyWorkSection: React.FC = () => {
  const supportFeatures = [
    {
      icon: Heart,
      title: "Show Your Love",
      description: "Your support keeps this passion project alive and growing",
    },
    {
      icon: Coffee,
      title: "Buy Me a Coffee",
      description:
        "Help fuel late-night coding sessions and creative breakthroughs",
    },
    {
      icon: Zap,
      title: "Accelerate Development",
      description: "Enable faster feature releases and new persona additions",
    },
    {
      icon: Gift,
      title: "Unlock Premium Features",
      description: "Support helps us build advanced AI capabilities",
    },
  ];

  return (
    <section className="relative py-20 flex flex-col">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-black mb-6 uppercase tracking-tight">
            Support{" "}
            <span className="inline-block bg-green-400 text-black px-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-2">
              My Work
            </span>
          </h2>
          <div className="bg-white border-2 border-black inline-block p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-3xl transform -rotate-1 mb-8">
            <p className="text-xl font-bold text-black">
              If you find value in this AI-powered experience, consider
              supporting the continued development of Chhaya Persona.
            </p>
          </div>
          <br />
          <div className="inline-flex items-center px-6 py-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Heart className="w-5 h-5 text-red-600 fill-current mr-2 animate-pulse" />
            <span className="text-black font-black uppercase text-sm">
              Made with passion by an independent developer
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Side - QR Code and Payment Info */}
          <div className="text-center lg:text-left">
            <div className="bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 max-w-md mx-auto lg:mx-0 transform rotate-1 hover:rotate-0">
              {/* QR Code */}
              <div className="flex justify-center mb-6">
                <div className="relative p-4 bg-yellow-200 border-4 border-black">
                  <img
                    src="/qr.png"
                    alt="Support QR Code"
                    className="w-48 h-48 object-contain"
                  />
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-blue-500 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Gift className="w-6 h-6 text-white" strokeWidth={3} />
                  </div>
                </div>
              </div>

              {/* Payment Instructions */}
              <h3 className="text-2xl font-black text-black mb-3 uppercase">
                Scan to Support 🙏
              </h3>
              <p className="text-black font-medium mb-6 leading-relaxed border-b-4 border-black pb-4">
                Scan the QR code with your preferred payment app to make a
                contribution. Every donation helps keep this project running!
              </p>

              {/* Alternative Payment Methods */}
              <div className="space-y-2 text-sm font-bold text-black">
                <p className="flex items-center justify-center lg:justify-start gap-2">
                  <span className="bg-black text-white px-2 py-0.5">UPI</span>{" "}
                  ONLY FOR NOW
                </p>
                <p className="flex items-center justify-center lg:justify-start gap-2">
                  🌍 INTERNATIONAL PAYMENTS NOT SUPPORTED
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Why Support */}
          <div className="space-y-8">
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-black text-black mb-4 uppercase">
                Why Your Support Matters
              </h3>
              <p className="text-black font-medium leading-relaxed">
                Building and maintaining Chhaya Persona requires significant
                resources. Your contribution directly enables:
              </p>
            </div>

            {/* Support Features Grid */}
            <div className="grid gap-4">
              {supportFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-purple-400 border-2 border-black flex items-center justify-center flex-shrink-0">
                    <span className="text-black">
                      <feature.icon className="w-6 h-6" strokeWidth={3} />
                    </span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-black text-black uppercase mb-1 text-lg">
                      {feature.title}
                    </h4>
                    <p className="text-gray-800 font-medium text-sm border-l-2 border-black pl-2">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportMyWorkSection;
