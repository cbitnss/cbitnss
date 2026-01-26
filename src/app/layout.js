import localFont from "next/font/local";
import './globals.css';
import RootLayoutClient from "./layout-client";

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
  const fonts = `${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-white`;

  return (
    <RootLayoutClient fonts={fonts}>
      {children}
    </RootLayoutClient>
  );
}