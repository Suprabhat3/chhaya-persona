import React from 'react';

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#HowItWorksSection" },
        { name: "Personas", href: "#personas" },
        { name: "Pricing", href: "#support" },
        { name: "API", href: "https://groq.com/" }
      ]
    },
    {
      title: "Company", 
      links: [
        { name: "About", href: "/" },
        { name: "Blog", href: "https://suprabhat-genai.hashnode.dev/" },
        { name: "Careers", href: "/" },
        { name: "Press", href: "/" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/doc" },
        { name: "Help Center", href: "/help" },
        { name: "Community", href: "https://discord.gg/FTQjJSJXaM" },
        // { name: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Feedback", href: "https://docs.google.com/forms/d/e/1FAIpQLSdwIl_UlPxekslx2WQGzYuV4Gg19fmRlbTsXoNQfT1ZUtu1-A/viewform?usp=dialog" },
      ]
    }
  ];

  const socialLinks = [
    { name: "Portfolio", icon: <img src="social.png" alt="" />, href: "https://suprabhat.site", target: "_blank"},
    { name: "Twitter", icon: <img src="twitter.png" alt="" />, href: "https://x.com/Suprabhat_3", target: "_blank"},
    { name: "GitHub", icon: <img src="github.png" alt="" />, href: "https://github.com/Suprabhat3/chhaya-persona", target: "_blank"},
    { name: "LinkedIn", icon:<img src="linkedin.png" alt="" />, href: "https://www.linkedin.com/in/suprabhatt/", target: "_blank"}, 
    { name: "Discord", icon:<img src="discord.png" alt="" />, href: "https://discord.gg/FTQjJSJXaM", target: "_blank"}
  ];

  return (
    <footer className="relative text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
               <span className=''><img src="favicon.ico" alt="" className="rounded" /></span>
              </div>
              <span className="text-2xl font-bold">Chhaya Persona</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Engage in meaningful conversations with greatest minds, 
              powered by cutting-edge AI technology that brings wisdom to life.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target='_blank'
                  className="w-12 h-12 bg-purple-100 hover:bg-purple-200 rounded-full flex items-center justify-center transition-all duration-300 group border border-purple-200"
                  aria-label={social.name}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-lg mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:underline decoration-purple-500"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <p className="text-gray-500">
              © 2025 Chhaya Persona. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>All systems operational</span>
            </span>
            <span>Made with ❤️ for curious minds by Suprabhat</span>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements - Same as other sections */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-xl opacity-60"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-pink-200 to-red-200 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-xl opacity-60"></div>
    </footer>
  );
};

export default Footer;