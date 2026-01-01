import React from "react";

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
        { name: "API", href: "https://groq.com/" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/" },
        { name: "Blog", href: "https://suprabhat-genai.hashnode.dev/" },
        { name: "Press", href: "/" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/doc" },
        { name: "Help Center", href: "/help" },
        { name: "Community", href: "https://discord.gg/FTQjJSJXaM" },
        // { name: "Contact", href: "#contact" }
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        {
          name: "Feedback",
          href: "https://docs.google.com/forms/d/e/1FAIpQLSdwIl_UlPxekslx2WQGzYuV4Gg19fmRlbTsXoNQfT1ZUtu1-A/viewform?usp=dialog",
        },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Portfolio",
      icon: <img src="social.png" alt="" />,
      href: "https://suprabhat.site",
      target: "_blank",
    },
    {
      name: "Twitter",
      icon: <img src="twitter.png" alt="" />,
      href: "https://x.com/Suprabhat_3",
      target: "_blank",
    },
    {
      name: "GitHub",
      icon: <img src="github.png" alt="" />,
      href: "https://github.com/Suprabhat3/chhaya-persona",
      target: "_blank",
    },
    {
      name: "LinkedIn",
      icon: <img src="linkedin.png" alt="" />,
      href: "https://www.linkedin.com/in/suprabhatt/",
      target: "_blank",
    },
    {
      name: "Discord",
      icon: <img src="discord.png" alt="" />,
      href: "https://discord.gg/FTQjJSJXaM",
      target: "_blank",
    },
  ];

  return (
    <footer className="relative text-black border-t-4 border-black bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-purple-500 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <span className="">
                  <img
                    src="favicon.ico"
                    alt=""
                    className="w-9 h-9 rounded-md"
                  />
                </span>
              </div>
              <span className="text-2xl font-black uppercase tracking-tight">
                Chhaya Persona
              </span>
            </div>
            <p className="text-black font-medium mb-6 leading-relaxed border-l-4 border-yellow-400 pl-4 py-1">
              Engage in meaningful conversations with greatest minds, powered by
              cutting-edge AI technology that brings wisdom to life.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center hover:bg-yellow-300 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  aria-label={social.name}
                >
                  <span className="text-xl transform group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-black text-lg mb-6 uppercase border-b-2 border-black inline-block pb-1">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-black font-bold hover:text-black hover:bg-yellow-200 rounded-md px-2 py-1 -ml-1 transition-colors duration-200"
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
        <div className="border-t-2 border-black pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <p className="text-black font-bold">
              © 2025 Chhaya Persona. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-6 text-sm text-black font-bold">
            <span className="flex items-center space-x-2 bg-green-100 border border-black px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-none animate-pulse"></span>
              <span className="uppercase text-xs tracking-wider">
                All systems operational
              </span>
            </span>
            <span className="hidden md:inline">
              Made with ❤️ for curious minds by Suprabhat
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
