/**
 * @file layout.tsx
 * @description Root layout component for the application.
 * Defines the HTML structure, global fonts (Geist), metadata, and wraps content with Providers.
 */

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

import { Header } from "@/ui/public/navigation/header/Header";

export const metadata: Metadata = {
  title: "Portal - Advanced Header",
  description: "Demonstrating senior-level header implementation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f5f5f5]`}
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="pt-24">{/* Spacer for fixed header */}
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
