"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/component/navbar";
import { FiMail, FiFileText, FiHelpCircle } from "react-icons/fi";

export default function HelpPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-yellow-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 pt-24 md:pt-28">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-4">
            Help & Support
          </h1>
          <div className="inline-block bg-white border-4 border-black px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-black font-bold uppercase text-sm">
              We're Here to Assist You
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-pink-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-black flex items-center justify-center border-2 border-black">
              <FiMail className="text-white" size={24} strokeWidth={3} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase">
              Contact Us
            </h2>
          </div>
          <p className="text-black font-bold mb-4 text-lg">
            For any queries or support, please email us at:
          </p>
          <a
            href="mailto:suprabhat.work@gmail.com"
            className="inline-block bg-black text-white font-black uppercase px-6 py-3 border-4 border-black hover:bg-white hover:text-black transition-colors"
          >
            suprabhat.work@gmail.com
          </a>
        </div>

        {/* Useful Links */}
        <div className="bg-cyan-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-black flex items-center justify-center border-2 border-black">
              <FiFileText className="text-white" size={24} strokeWidth={3} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase">
              Useful Links
            </h2>
          </div>
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => router.push("/privacy")}
                className="w-full text-left bg-white border-4 border-black px-4 py-3 font-black uppercase text-sm text-black hover:bg-yellow-100 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                → Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/terms")}
                className="w-full text-left bg-white border-4 border-black px-4 py-3 font-black uppercase text-sm text-black hover:bg-yellow-100 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                → Terms & Conditions
              </button>
            </li>
          </ul>
        </div>

        {/* Common Issues */}
        <div className="bg-green-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-black flex items-center justify-center border-2 border-black">
              <FiHelpCircle className="text-white" size={24} strokeWidth={3} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase">
              Common Issues
            </h2>
          </div>
          <ul className="space-y-3">
            <li className="bg-white border-4 border-black px-4 py-3 font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              • Account login problems
            </li>
            <li className="bg-white border-4 border-black px-4 py-3 font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              • Billing or subscription questions
            </li>
            <li className="bg-white border-4 border-black px-4 py-3 font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              • Feature requests or feedback
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
