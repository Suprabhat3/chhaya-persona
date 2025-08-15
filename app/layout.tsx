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
  title: "Chhaya Persona",
  description: "Conversations with the Greatest Minds, Powered by AI Chhaya Persona uses cutting-edge AI to bring famous figures to life, allowing for conversations and insights like never before.",
  keywords: [
    "Chhaya Persona",
    "AI website",
    "AI powered persona",
    "chat with elon musk",
    "persona website",
    "OpenSource AI website",
    "Chhaya Persona - chat with",
    "chai aur code",
    "Hitesh Choudhary",
    "Founder of Chai code",
  ],
  openGraph: {
    title: "Chhaya Persona – Conversations with the Greatest Minds, Powered by AI",
    description:
      "Conversations with the Greatest Minds, Powered by AI Chhaya Persona uses cutting-edge AI to bring famous figures to life, allowing for conversations and insights like never before",
    url: "https://chhayapersona.suprabhat.site/",
    siteName: "Chhaya Persona",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Chhaya Persona – Conversations with the Greatest Minds, Powered by AI",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chhaya Persona – Conversations with the Greatest Minds, Powered by AI",
    description:
      "Conversations with the Greatest Minds, Powered by AI Chhaya Persona uses cutting-edge AI to bring famous figures to life, allowing for conversations and insights like never before",
    images: ["/hero.png"],
  },
  metadataBase: new URL("https://chhayapersona.suprabhat.site/"),
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
