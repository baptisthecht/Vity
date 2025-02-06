import { Header } from "@iptv/components/header";
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
  title: "Vity",
  description: "Developed by X",
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
         <div className='w-dvw h-dvh bg-gray-50 flex flex-col'>
      <Header />
      <main className="flex-1 w-full p-10 flex flex-col overflow-hidden">{children}</main>
    </div>
        
      </body>
    </html>
  );
}
