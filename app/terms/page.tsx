import React from "react";
import Navbar from "@/component/navbar";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-yellow-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 pt-24 md:pt-28">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-4">
            Terms & Conditions
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
            Welcome to Chhaya Persona! By accessing or using our service, you
            agree to be bound by these Terms and Conditions. Please read them
            carefully before using our platform.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          <div className="bg-cyan-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-black text-black mb-4 uppercase border-b-4 border-black pb-2">
              1. Acceptance of Terms
            </h2>
            <p className="text-black font-medium bg-white border-2 border-black p-4">
              By using Chhaya Persona, you acknowledge that you have read,
              understood, and agree to be bound by these Terms and Conditions.
              If you do not agree, please do not use our service.
            </p>
          </div>

          <div className="bg-pink-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-black text-black mb-4 uppercase border-b-4 border-black pb-2">
              2. Use of Service
            </h2>
            <ul className="list-none text-black space-y-2 font-medium">
              <li className="bg-white border-2 border-black px-3 py-2">
                • You must be at least 13 years old to use this service
              </li>
              <li className="bg-white border-2 border-black px-3 py-2">
                • You are responsible for maintaining account security
              </li>
              <li className="bg-white border-2 border-black px-3 py-2">
                • You may not use the service for illegal purposes
              </li>
              <li className="bg-white border-2 border-black px-3 py-2">
                • AI-generated content is for educational/entertainment only
              </li>
            </ul>
          </div>

          <div className="bg-green-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-black text-black mb-4 uppercase border-b-4 border-black pb-2">
              3. User Accounts
            </h2>
            <p className="text-black font-medium bg-white border-2 border-black p-4 mb-3">
              You may need to create an account to access certain features. You
              are responsible for:
            </p>
            <ul className="list-none text-black space-y-2 font-medium">
              <li className="bg-white border-2 border-black px-3 py-2">
                • Providing accurate registration information
              </li>
              <li className="bg-white border-2 border-black px-3 py-2">
                • Keeping your password secure and confidential
              </li>
              <li className="bg-white border-2 border-black px-3 py-2">
                • All activities that occur under your account
              </li>
            </ul>
          </div>

          <div className="bg-yellow-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-black text-black mb-4 uppercase border-b-4 border-black pb-2">
              4. AI-Generated Content
            </h2>
            <div className="bg-white border-2 border-black p-4 space-y-3">
              <p className="text-black font-medium">
                <strong className="font-black">IMPORTANT DISCLAIMER:</strong>{" "}
                All conversations and responses are AI-generated simulations.
                They do not represent the actual views or statements of the
                historical figures they portray.
              </p>
              <p className="text-black font-medium">
                Users should verify any information independently and not rely
                solely on AI-generated content for critical decisions.
              </p>
            </div>
          </div>

          <div className="bg-pink-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-black text-black mb-4 uppercase border-b-4 border-black pb-2">
              5. Intellectual Property
            </h2>
            <p className="text-black font-medium bg-white border-2 border-black p-4">
              All content, features, and functionality of Chhaya Persona are
              owned by us and protected by copyright, trademark, and other
              intellectual property laws.
            </p>
          </div>

          <div className="bg-cyan-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-black text-black mb-4 uppercase border-b-4 border-black pb-2">
              6. Termination
            </h2>
            <p className="text-black font-medium bg-white border-2 border-black p-4">
              We reserve the right to terminate or suspend your account at any
              time for violations of these Terms, without prior notice or
              liability.
            </p>
          </div>

          <div className="bg-green-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-black text-black mb-4 uppercase border-b-4 border-black pb-2">
              7. Limitation of Liability
            </h2>
            <p className="text-black font-medium bg-white border-2 border-black p-4">
              Chhaya Persona is provided "as is" without warranties of any kind.
              We are not liable for any damages arising from your use of the
              service.
            </p>
          </div>

          <div className="bg-yellow-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-black text-black mb-4 uppercase border-b-4 border-black pb-2">
              8. Changes to Terms
            </h2>
            <p className="text-black font-medium bg-white border-2 border-black p-4">
              We may modify these Terms at any time. Continued use of the
              service after changes constitutes acceptance of the new Terms.
            </p>
          </div>

          <div className="bg-pink-200 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-black text-black mb-4 uppercase border-b-4 border-black pb-2">
              9. Contact Information
            </h2>
            <div className="bg-white border-2 border-black p-4">
              <p className="text-black font-medium mb-3">
                For questions about these Terms, contact us at:
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

export default TermsAndConditions;
