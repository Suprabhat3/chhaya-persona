import React from "react";
import Navbar from "@/component/navbar";
import { FiBook, FiZap, FiUsers, FiMessageCircle } from "react-icons/fi";

const DocumentationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-yellow-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 pt-24 md:pt-28">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-4">
            Documentation
          </h1>
          <div className="inline-block bg-white border-4 border-black px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-black font-bold uppercase text-sm">
              Learn How to Use Chhaya Persona
            </p>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 mb-6">
          <p className="text-black font-medium leading-relaxed text-lg">
            Welcome to Chhaya Persona! This documentation will help you get
            started and make the most of your AI-powered conversations with
            historical and contemporary figures.
          </p>
        </div>

        {/* Getting Started */}
        <div className="bg-cyan-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-black flex items-center justify-center border-2 border-black">
              <FiZap className="text-white" size={24} strokeWidth={3} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase">
              Getting Started
            </h2>
          </div>
          <ol className="space-y-3 font-medium text-black">
            <li className="bg-white border-2 border-black p-4">
              <strong className="font-black">1. Select a Persona:</strong>{" "}
              Browse our collection of AI personas and choose one to chat with
            </li>
            <li className="bg-white border-2 border-black p-4">
              <strong className="font-black">2. Start Chatting:</strong> Type
              your message and press Enter or click Send
            </li>
            <li className="bg-white border-2 border-black p-4">
              <strong className="font-black">3. Sign In (Optional):</strong>{" "}
              Create an account to save your conversations and get unlimited
              chats
            </li>
          </ol>
        </div>

        {/* Features */}
        <div className="bg-pink-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-black flex items-center justify-center border-2 border-black">
              <FiMessageCircle
                className="text-white"
                size={24}
                strokeWidth={3}
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase">
              Key Features
            </h2>
          </div>
          <div className="space-y-3">
            <div className="bg-white border-2 border-black p-4">
              <h3 className="font-black text-black/80 text-lg mb-2 uppercase">
                🤖 AI-Powered Conversations
              </h3>
              <p className="font-medium text-black/80">
                Chat with historically accurate AI personas powered by advanced
                language models
              </p>
            </div>
            <div className="bg-white border-2 border-black p-4">
              <h3 className="font-black text-black/80 text-lg mb-2 uppercase">
                💾 Chat History
              </h3>
              <p className="font-medium text-black/80">
                Signed-in users can access their complete conversation history
              </p>
            </div>
            <div className="bg-white border-2 border-black p-4">
              <h3 className="font-black text-black/80 text-lg mb-2 uppercase">
                🎭 Multiple Personas
              </h3>
              <p className="font-medium text-black/80">
                Choose from a diverse range of historical and contemporary
                figures
              </p>
            </div>
            <div className="bg-white border-2 border-black p-4">
              <h3 className="font-black text-black/80 text-lg mb-2 uppercase">
                📱 Mobile Friendly
              </h3>
              <p className="font-medium text-black/80">
                Fully responsive design works seamlessly on all devices
              </p>
            </div>
          </div>
        </div>

        {/* Available Personas */}
        <div className="bg-green-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-black flex items-center justify-center border-2 border-black">
              <FiUsers className="text-white" size={24} strokeWidth={3} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase">
              Available Personas
            </h2>
          </div>
          <p className="font-medium text-black mb-4">
            Each persona is carefully crafted to reflect their unique
            personality, expertise, and communication style:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white border-2 border-black p-3">
              <p className="font-black text-sm text-black/80">• Historical Figures</p>
            </div>
            <div className="bg-white border-2 border-black p-3">
              <p className="font-black text-sm text-black/80">• Scientists & Inventors</p>
            </div>
            <div className="bg-white border-2 border-black p-3">
              <p className="font-black text-sm text-black/80">• Philosophers & Thinkers</p>
            </div>
            <div className="bg-white border-2 border-black p-3">
              <p className="font-black text-sm text-black/80">• Contemporary Leaders</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-yellow-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-black flex items-center justify-center border-2 border-black">
              <FiBook className="text-white" size={24} strokeWidth={3} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase">
              Tips for Best Results
            </h2>
          </div>
          <ul className="space-y-3 font-medium text-black">
            <li className="bg-white border-2 border-black p-4">
              ✓ Be specific and clear in your questions
            </li>
            <li className="bg-white border-2 border-black p-4">
              ✓ Ask follow-up questions to dive deeper into topics
            </li>
            <li className="bg-white border-2 border-black p-4">
              ✓ Remember: Responses are AI-generated simulations
            </li>
            <li className="bg-white border-2 border-black p-4">
              ✓ Verify important information from reliable sources
            </li>
          </ul>
        </div>

        {/* Need Help */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase mb-4">
            Need More Help?
          </h2>
          <p className="text-black font-medium mb-6">
            Check out our Help & Support page or contact us directly
          </p>
          <a
            href="/help"
            className="inline-block bg-pink-400 hover:bg-pink-300 text-black border-4 border-black px-8 py-4 font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all"
          >
            Visit Help Center
          </a>
        </div>
      </main>
    </div>
  );
};

export default DocumentationPage;
