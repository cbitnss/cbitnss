import localFont from "next/font/local";
import { NextUIProvider } from '@nextui-org/react'
import './globals.css';
import App from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpotlightGrid from "@/components/SpotlightGrid"; // Import the grid

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

export const metadata = {
  title: "CBIT NSS",
  description: "Not me but YOU!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-black text-white`}
      >
        {/* 1. GLOBAL GRID: Sits in background (z-0) */}
        <SpotlightGrid />

        {/* 2. APP CONTENT: Sits on top (z-10) */}
        <NextUIProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <App /> 
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </NextUIProvider>
      </body>
    </html>
  );
}