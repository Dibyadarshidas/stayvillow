import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./components/AuthProvider";
import Sidebar from "./components/Sidebar";
import MobileMenuButton from "./components/MobileMenuButton";
import HelpChat from "./components/HelpChat";
import { baseMetadata } from "./lib/metadata";
import { getOrganizationSchema, getWebsiteSchema } from "./lib/structuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define the structured data for the website
const structuredData = {
  organization: getOrganizationSchema(),
  website: getWebsiteSchema(),
};

// Merge base metadata with custom metadata
export const metadata: Metadata = {
  ...baseMetadata,
  title: "Stayvillow | Premium Vacation Rentals in India",
  description: "Book luxury villas, private pool stays, and unique getaways with Stayvillow. Discover, list, or buy your dream vacation property in India's most beautiful destinations.",
  manifest: "/manifest.json",
  themeColor: "#0284c7",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Stayvillow",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.organization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.website),
          }}
        />
        <link rel="sitemap" href="/sitemap.xml" type="application/xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0284c7" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Stayvillow" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--color-background)] text-[var(--color-text)]`}
      >
        <AuthProvider>
          <div className="flex flex-col lg:flex-row min-h-screen relative">
            <Sidebar />
            <div className="menu-overlay"></div>
            <MobileMenuButton />
            <main className="main-content flex-1">
              {children}
            </main>
            <HelpChat />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
