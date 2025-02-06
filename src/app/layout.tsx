import { Header } from "@iptv/components/header";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const font = DM_Sans({
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
        className={`${font.className} } antialiased`}
      >
         <div className='w-dvw h-dvh bg-gray-50 flex flex-col'>
      <Header />
      <main className="flex-1 w-full p-10 flex flex-col overflow-hidden">{children}</main>
    </div>
        
      </body>
    </html>
  );
}
