import React from 'react';
import { Heart, Coffee, Gift, Zap } from 'lucide-react';

const SupportMyWorkSection: React.FC = () => {
  const supportFeatures = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Show Your Love",
      description: "Your support keeps this passion project alive and growing"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Buy Me a Coffee",
      description: "Help fuel late-night coding sessions and creative breakthroughs"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Accelerate Development",
      description: "Enable faster feature releases and new persona additions"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Unlock Premium Features",
      description: "Support helps us build advanced AI capabilities"
    }
  ];

  return (
    <section className="relative py-20 flex flex-col">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Support{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              My Work
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            If you enjoy chatting with your favraite personalities and find value in this AI-powered experience, 
            consider supporting the continued development of Chhaya Persona
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200/50">
            <Heart className="w-5 h-5 text-red-500 mr-2 animate-pulse" />
            <span className="text-gray-700 font-medium">Made with passion by an independent developer</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Side - QR Code and Payment Info */}
          <div className="text-center lg:text-left">
            <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 max-w-md mx-auto lg:mx-0">
              {/* QR Code */}
              <div className="flex justify-center mb-6">
                <div className="relative p-4 bg-white rounded-2xl shadow-md border border-gray-100">
                  <img 
                    src="/qr.png" 
                    alt="Support QR Code" 
                    className="w-48 h-48 object-contain"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Gift className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Payment Instructions */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Scan to Support 🙏
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Scan the QR code with your preferred payment app to make a contribution. 
                Every donation, big or small, helps keep this project running!
              </p>
              
              {/* Alternative Payment Methods */}
              <div className="space-y-2 text-sm text-gray-500">
                <p>💳 only UPI for now </p>
                <p>🌍 International payments not supported</p>
              </div>
            </div>
          </div>

          {/* Right Side - Why Support */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Your Support Matters
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Building and maintaining Chhaya Persona requires significant resources - from AI model training 
                to server costs, research, and countless hours of development. Your contribution directly enables:
              </p>
            </div>

            {/* Support Features Grid */}
            <div className="grid gap-6">
              {supportFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/80 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center border border-purple-200/50 group-hover:scale-110 transition-transform">
                    <span className="text-purple-600">
                      {feature.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements - Same as other sections */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-xl opacity-60"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-pink-200 to-red-200 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-xl opacity-60"></div>
    </section>
  );
};

export default SupportMyWorkSection;