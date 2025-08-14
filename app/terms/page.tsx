"use client";
import React from "react";

const TermsPage = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600">Last updated: 20/05/2025</p>
        </div>

        <div className="space-y-8">
          {/* Section 1 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="mb-4 text-gray-700">
              By accessing and using our AI Interview Platform ("Service"), you
              accept and agree to be bound by the terms and provisions of this
              agreement. If you do not agree, please do not use this service.
            </p>
            <p className="text-gray-700">
              These Terms of Service ("Terms") govern your use of our platform,
              including all content, services, and products available at or
              through the service.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              2. Description of Service
            </h2>
            <p className="text-gray-700 mb-4">Our AI Interview Platform provides:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>AI-powered mock interview sessions</li>
              <li>Personalized feedback and performance analytics</li>
              <li>Industry-specific interview preparation</li>
              <li>Resume and profile management tools</li>
              <li>Interview scheduling and recording capabilities</li>
            </ul>
            <p className="mt-4 text-gray-700">
              We reserve the right to modify, suspend, or discontinue the service
              at any time with or without notice.
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              3. User Accounts and Responsibilities
            </h2>
            <p className="text-gray-700 mb-4">
              To access certain features, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain account security</li>
              <li>Notify us of unauthorized access</li>
              <li>Accept responsibility for all activities</li>
              <li>Use the service lawfully</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              4. Acceptable Use Policy
            </h2>
            <p className="text-gray-700 mb-4">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Upload harmful code</li>
              <li>Attempt unauthorized access</li>
              <li>Disrupt service or servers</li>
              <li>Use the service for illegal activities</li>
              <li>Harass or harm others</li>
              <li>Share misleading information</li>
              <li>Violate laws or regulations</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              5. Intellectual Property Rights
            </h2>
            <p className="mb-4 text-gray-700">
              The service and its content are owned by us and protected by
              intellectual property laws.
            </p>
            <p className="text-gray-700">
              You retain ownership of your content but grant us a license to use
              it for providing the service.
            </p>
          </div>

          {/* Section 6 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              6. Payment and Subscription Terms
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Payment is due in advance</li>
              <li>Subscriptions auto-renew unless canceled</li>
              <li>Refunds follow our refund policy</li>
              <li>Fees may change with 30 days’ notice</li>
              <li>Accounts may be suspended for non-payment</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              7. Disclaimer of Warranties
            </h2>
            <p className="text-gray-700">
              The service is provided "as is" without warranties, express or
              implied.
            </p>
          </div>

          {/* Section 8 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-700">
              We are not liable for indirect, incidental, special, consequential,
              or punitive damages from using the service.
            </p>
          </div>

          {/* Section 9 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              9. Termination
            </h2>
            <p className="mb-4 text-gray-700">
              We may suspend or terminate your account immediately for any
              violation of these Terms.
            </p>
            <p className="text-gray-700">
              You may terminate your account anytime via profile settings or by
              contacting us.
            </p>
          </div>

          {/* Section 10 */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              10. Contact Information
            </h2>
            <p className="mb-4 text-gray-700">
              If you have any questions about these Terms, contact us:
            </p>
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <p className="font-semibold text-black">Email:</p>
              <a
                href="mailto:suprabhat.work@gmail.com"
                className="text-emerald-500 hover:underline"
              >
                suprabhat.work@gmail.com
              </a>
              <div className="flex gap-4 mt-2">
                {/* X Icon */}
                <a
                  href="https://x.com/Suprabhat_3"
                  target="_blank"
                  className="text-gray-400 hover:text-emerald-500"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                {/* LinkedIn Icon */}
                <a
                  href="https://www.linkedin.com/in/suprabhatt/"
                  target="_blank"
                  className="text-gray-400 hover:text-emerald-500"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsPage;
