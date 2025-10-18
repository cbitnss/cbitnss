import localFont from "next/font/local";
import {NextUIProvider} from '@nextui-org/react'
import './globals.css';
import App from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <NextUIProvider>
          <App /> {/* navbar rendered here globally */}
          <main className="flex-1 pt-16"> {/* offset for fixed navbar */}
            {children}
          </main>
          <Footer />
        </NextUIProvider>
      </body>
    </html>
  );
}
