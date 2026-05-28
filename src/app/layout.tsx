import type { Metadata } from "next";
import { Playfair_Display, Inter_Tight } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ARSV | Premium Luxury Architecture & Interior Design Studio",
  description: "ARSV is an elite architecture and interior design studio specializing in modern luxury villas, ultra-modern interiors, and commercial spaces guided by Vastu Shastra intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${interTight.variable} font-sans bg-[#FAF8F5] text-[#1A1A1A] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
