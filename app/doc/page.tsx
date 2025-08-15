"use client";
import React from "react";

const DocumentationPage = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Documentation
          </h1>
          <p className="text-gray-600">Last updated: 15/08/2025</p>
        </div>

        <div className="space-y-8">
          {/* Intro Section */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              About This Project
            </h2>
            <p className="mb-4 text-gray-700">
              Chhaya Persona is an open-source AI-powered platform that enables
              conversations with simulated personas of famous individuals,
              innovators, and thought leaders.  
              This project is built with modern web technologies and designed
              for both educational and entertainment purposes.
            </p>
            <p className="text-gray-700">
              All personas and responses are AI-generated and are not authored
              by the real individuals they represent.
            </p>
          </div>

          {/* Open Source Section */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              Open Source
            </h2>
            <p className="mb-4 text-gray-700">
              This project is open source and contributions are welcome!  
              You can explore the source code, report issues, or submit pull
              requests through our GitHub repository.
            </p>
            <a
              href="https://github.com/Suprabhat3/chhaya-persona"
              target="_blank"
              className="text-emerald-500 hover:underline font-semibold"
            >
              View Project on GitHub →
            </a>
          </div>

          {/* Getting Started */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              Getting Started
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Clone the repository from GitHub</li>
              <li>Install dependencies with <code>npm install</code></li>
              <li>Run the development server with <code>npm run dev</code></li>
              <li>Access the app locally at <code>http://localhost:3000</code></li>
            </ul>
          </div>

          {/* License */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              License
            </h2>
            <p className="text-gray-700">
              This project is licensed under the MIT License you are free to
              use, modify, and distribute it, provided that the original
              copyright notice is included in any copies or substantial portions
              of the software.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              Contact
            </h2>
            <p className="mb-4 text-gray-700">
              For questions, suggestions, or contributions, you can reach out:
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
                {/* X */}
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
                {/* LinkedIn */}
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

export default DocumentationPage;
