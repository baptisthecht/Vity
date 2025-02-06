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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default"
  },
  icons: {
    icon: { rel: "shortcut icon", url: "/favicon.ico", type: "image/x-icon" },
    apple: [
      { url: "/apple-touch-icon.png" },
      { url: "/apple-touch-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-touch-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-touch-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-touch-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-touch-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-touch-icon-180x180.png", sizes: "180x180" },
    ],
  },
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
