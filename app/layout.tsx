import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LogPulse",
  description: "The modern changelog for your product.",
};

import { ClerkProvider } from "@clerk/nextjs";

import { UploadThingPlugin } from "@/components/uploadthing-plugin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <UploadThingPlugin />
          {children}
          <Toaster position="bottom-right" theme="dark" />
        </body>
      </html>
    </ClerkProvider>
  );
}
