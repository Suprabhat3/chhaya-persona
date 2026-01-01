import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Basic Metadata
  title: {
    default: "Chhaya Persona – Chat with AI Personas of Greatest Minds",
    template: "%s | Chhaya Persona",
  },
  description:
    "Experience conversations with the greatest minds in history through AI. Chat with tech leaders like Elon Musk, Sam Altman, Hitesh Choudhary, and legendary figures like Mahatma Gandhi. Powered by advanced AI technology.",
  keywords: [
    "Chhaya Persona",
    "AI chat",
    "AI personas",
    "chat with AI",
    "AI girlfriend",
    "AI boyfriend",
    "chat with Elon Musk",
    "chat with Sam Altman",
    "chat with Hitesh Choudhary",
    "chat with Shah Rukh Khan",
    "chat with Mahatma Gandhi",
    "AI powered conversations",
    "historical figures AI",
    "tech leaders AI",
    "persona chatbot",
    "OpenSource AI",
    "chai aur code",
    "Piyush Garg",
    "CodeWithHarry",
    "Andrew Ng AI",
    "Sundar Pichai",
    "conversational AI",
    "interactive AI personas",
    "AI education",
    "learn from AI",
  ],

  // Author & Creator
  authors: [{ name: "Suprabhat", url: "https://chhayapersona.suprabhat.site" }],
  creator: "Suprabhat",
  publisher: "Chhaya Persona",

  // Robots & Indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add your verification codes when available)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },

  // Category & Classification
  category: "technology",

  // Icons & Favicons
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },

  // Manifest
  manifest: "/site.webmanifest",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://chhayapersona.suprabhat.site/",
    siteName: "Chhaya Persona",
    title: "Chhaya Persona – Chat with AI Personas of Greatest Minds",
    description:
      "Experience conversations with the greatest minds personas through AI. Chat with tech leaders like Elon Musk, Sam Altman, Hitesh Choudhary, and legendary figures like Mahatma Gandhi. Powered by advanced AI technology.",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Chhaya Persona – Chat with AI Personas of Greatest Minds",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@chhayapersona",
    creator: "@suprabhat",
    title: "Chhaya Persona – Chat with AI Personas of Greatest Minds",
    description:
      "Experience conversations with the greatest minds through AI. Chat with tech leaders, historical figures, and legendary personalities. Powered by advanced AI.",
    images: {
      url: "/hero.png",
      alt: "Chhaya Persona – Chat with AI Personas",
    },
  },

  // Other Metadata
  metadataBase: new URL("https://chhayapersona.suprabhat.site/"),
  alternates: {
    canonical: "https://chhayapersona.suprabhat.site/",
  },

  // App-specific
  applicationName: "Chhaya Persona",
  appleWebApp: {
    capable: true,
    title: "Chhaya Persona",
    statusBarStyle: "black-translucent",
  },
};

// Viewport configuration (exported separately in Next.js 14+)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
