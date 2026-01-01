import React from "react";
import Navbar from "@/component/navbar";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-yellow-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 pt-24 md:pt-28">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-4">
            Privacy Policy
          </h1>
          <div className="inline-block bg-white border-4 border-black px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-black font-bold uppercase text-sm">
              Last updated: August 14, 2025
            </p>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 mb-6">
          <p className="text-black font-medium leading-relaxed">
            This Privacy Policy explains how we collect, use, and protect your
            personal information when you use our website and services. By using
            our platform, you agree to the terms outlined in this policy.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          <div className="bg-pink-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-black text-black mb-4 uppercase border-b-4 border-black pb-2">
              1. Information We Collect
            </h2>
            <ul className="list-none text-black space-y-2 font-medium">
              <li className="bg-white border-2 border-black px-3 py-2">
                • Account details such as name and email address
              </li>
              <li className="bg-white border-2 border-black px-3 py-2">
                • Usage data including pages visited and features used
              </li>
              <li className="bg-white border-2 border-black px-3 py-2">
                • Information you voluntarily provide (e.g., feedback, messages)
              </li>
            </ul>
          </div>

          <div className="bg-cyan-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-black text-black mb-4 uppercase border-b-4 border-black pb-2">
              2. How We Use Your Information
            </h2>
            <ul className="list-none text-black space-y-2 font-medium">
              <li className="bg-white border-2 border-black px-3 py-2">
                • To provide and improve our services
              </li>
              <li className="bg-white border-2 border-black px-3 py-2">
                • To communicate with you about updates and offers
              </li>
              <li className="bg-white border-2 border-black px-3 py-2">
                • To analyze user behavior for better user experience
              </li>
            </ul>
          </div>

          <div className="bg-green-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-black text-black mb-4 uppercase border-b-4 border-black pb-2">
              3. Sharing of Information
            </h2>
            <p className="text-black font-medium bg-white border-2 border-black p-4">
              We do not sell your personal information. We may share limited
              data with trusted third parties who assist in operating our
              services, but only under strict confidentiality agreements.
            </p>
          </div>

          <div className="bg-yellow-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-black text-black mb-4 uppercase border-b-4 border-black pb-2">
              4. Data Security
            </h2>
            <p className="text-black font-medium bg-white border-2 border-black p-4">
              We implement industry-standard measures to protect your data.
              However, no online service is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </div>

          <div className="bg-pink-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-black text-black mb-4 uppercase border-b-4 border-black pb-2">
              5. Your Rights
            </h2>
            <ul className="list-none text-black space-y-2 font-medium">
              <li className="bg-white border-2 border-black px-3 py-2">
                • Access and request a copy of your personal data
              </li>
              <li className="bg-white border-2 border-black px-3 py-2">
                • Request correction or deletion of your data
              </li>
              <li className="bg-white border-2 border-black px-3 py-2">
                • Withdraw consent for certain processing activities
              </li>
            </ul>
          </div>

          <div className="bg-cyan-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-black text-black mb-4 uppercase border-b-4 border-black pb-2">
              6. Changes to This Policy
            </h2>
            <p className="text-black font-medium bg-white border-2 border-black p-4">
              We may update this Privacy Policy from time to time. The updated
              version will be posted on this page with a new "Last updated"
              date.
            </p>
          </div>

          <div className="bg-green-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-black text-black mb-4 uppercase border-b-4 border-black pb-2">
              7. Contact Us
            </h2>
            <div className="bg-white border-2 border-black p-4">
              <p className="text-black font-medium mb-3">
                If you have questions about this Privacy Policy, please contact
                us at:
              </p>
              <a
                href="mailto:suprabhat.work@gmail.com"
                className="inline-block bg-black text-white font-black uppercase px-6 py-3 border-4 border-black hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                suprabhat.work@gmail.com
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
