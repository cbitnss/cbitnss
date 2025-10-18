"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-black/50 backdrop-blur-md py-12 mt-auto">
      <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between gap-8">
        {/* Logo and Description */}
        <div className="md:w-1/3 space-y-4">
          <div className="flex items-center gap-3">
            <Image src="/nssid.svg" alt="CBIT NSS Logo" width={40} height={40} />
            <h2 className="text-xl font-bold text-white">CBIT NSS</h2>
          </div>
          <p className="text-gray-400 text-sm">
            Not Me, But You! - Join us in our mission to make a difference through
            selfless service and community development.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/events" className="hover:text-white transition-colors">Activities</Link></li>
              <li><Link href="/certificates" className="hover:text-white transition-colors">Certificates</Link></li>
              <li><Link href="/nap" className="hover:text-white transition-colors">NAP</Link></li>
              <li><Link href="/team" className="hover:text-white transition-colors">Executive Board</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/emergency" className="hover:text-white transition-colors">Blood Support Hub</Link></li>
              <li><Link href="/emergency/become-donor" className="hover:text-white transition-colors">Become a Donor</Link></li>
              <li><Link href="/emergency/request-donor" className="hover:text-white transition-colors">Request Blood</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>CBIT, Gandipet</li>
              <li>Hyderabad - 500075</li>
              <li>Email: nsscbit19@gmail.com</li>
              <li>Emergency: +91 7396998809</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-8 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} CBIT NSS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;