import localFont from "next/font/local";
import {NextUIProvider} from '@nextui-org/react'
import './globals.css';
import App from "@/components/Navbar"; // added

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextUIProvider>
          <App /> {/* navbar rendered here globally */}
          <div className="pt-16"> {/* offset for fixed navbar */}
            {children}
          </div>
        </NextUIProvider>
      </body>
    </html>
  );
}
