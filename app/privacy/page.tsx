import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">Last updated: August 14, 2025</p>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <p className="text-gray-700 leading-relaxed">
            This Privacy Policy explains how we collect, use, and protect your
            personal information when you use our website and services. By
            using our platform, you agree to the terms outlined in this policy.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              1. Information We Collect
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Account details such as name and email address.</li>
              <li>Usage data including pages visited and features used.</li>
              <li>Information you voluntarily provide (e.g., feedback, messages).</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To provide and improve our services.</li>
              <li>To communicate with you about updates and offers.</li>
              <li>To analyze user behavior for better user experience.</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              3. Sharing of Information
            </h2>
            <p className="text-gray-700">
              We do not sell your personal information. We may share limited
              data with trusted third parties who assist in operating our
              services, but only under strict confidentiality agreements.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              4. Data Security
            </h2>
            <p className="text-gray-700">
              We implement industry-standard measures to protect your data.
              However, no online service is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              5. Your Rights
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access and request a copy of your personal data.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Withdraw consent for certain processing activities.</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              6. Changes to This Policy
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. The updated
              version will be posted on this page with a new “Last updated”
              date.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              7. Contact Us
            </h2>
            <p className="text-gray-700 mb-2">
              If you have questions about this Privacy Policy, please contact
              us at:
            </p>
            <p className="text-gray-900 font-semibold">
              Email:{" "}
              <a
                href="mailto:suprabhat.work@gmail.com"
                className="text-emerald-500 hover:underline"
              >
                suprabhat.work@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
