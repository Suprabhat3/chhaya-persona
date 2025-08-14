"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function HelpPage() {
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support</h1>
        <p className="text-gray-600 mb-8">
          Need help with our services? We’re here to assist you.
          Below you’ll find useful links and our contact details.
        </p>

        {/* Contact Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Contact Us</h2>
          <p className="text-gray-700">
            For any queries or support, please email us at:
          </p>
          <p className="text-blue-600 font-semibold">
            suprabhat.work@gmail.com
          </p>
        </div>

        {/* Useful Links */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Useful Links</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              <button
                onClick={() => router.push("/privacy")}
                className="text-blue-600 hover:underline"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/terms")}
                className="text-blue-600 hover:underline"
              >
                Terms & Conditions
              </button>
            </li>
          </ul>
        </div>

        {/* Common Issues */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Common Issues</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Account login problems</li>
            <li>Billing or subscription questions</li>
            <li>Feature requests or feedback</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
