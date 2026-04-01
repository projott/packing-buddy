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
  title: "Packing Buddy -- Smart Trip Packing Lists",
  description:
    "Generate smart packing lists based on your trip details. Weather-aware, trip-type specific, and fully editable.",
  openGraph: {
    title: "Packing Buddy",
    description: "Smart packing lists for every trip",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-amber-50 text-stone-800 font-sans">
        {children}
      </body>
    </html>
  );
}
