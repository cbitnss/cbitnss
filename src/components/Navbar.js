"use client"
import React from "react";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";

import SpotlightGrid from "./SpotlightGrid"; // masked grid overlay (optional)

export const AcmeLogo = () => {
  return (
    <Image src={"/nssid.svg"} alt="CBIT NSS" height={36} width={36} />
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Activities", href: "/events" },
    { name: "NAP", href: "/nap" },
    // { name: "Lost & Found", href: "/lost-found" }, // Hidden for now
    { name: "Executive Board", href: "/team" },
    { name: "Blood Donation Hub", href: "/emergency" },
  ];

  return (
    <>
      {/* Full-viewport spotlight grid (invisible unless cursor reveals) */}
      <SpotlightGrid gridSize={36} highlightRadius={300} gridColor="rgba(255,255,255,0.12)" />

      {/* Navbar: ensure it has higher z-index so UI stays on top */}
      <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="7xl" className="fixed z-50 bg-black/50 backdrop-blur-md">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <AcmeLogo />
            <span className="font-bold text-inherit pl-3">CBIT NSS</span>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link href={item.href} className="text-white">
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          {/* optional right-side items */}
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item) => (
            <NavbarMenuItem key={item.href}>
              <Link href={item.href} className="block w-full">
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}

