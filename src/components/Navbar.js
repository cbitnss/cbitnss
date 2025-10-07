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
  Button,
} from "@nextui-org/react";

export const AcmeLogo = () => {
  return (
    <Image src={"nssid.svg"} alt="ACME" height={36} width={36} />
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Activities", href: "/events" },
    { name: "Certificates", href: "/certificates" },
    { name: "NAP", href: "/nap" }, // changed to dedicated page
    { name: "Executive Board", href: "/team" },
    { name: "Blood Support Hub", href: "/emergency" },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="7xl" className="fixed bg-black/50 backdrop-blur-md">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link href="/">
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit pl-3">CBIT NSS</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/events">
            Activities
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/certificates">
            Certificates
          </Link>
        </NavbarItem>
      

      
        <NavbarItem className="hidden sm:flex">
          <Link color="foreground" href="/nap"> {/* NAP on desktop now points to /nap */}
            NAP
          </Link>
        </NavbarItem>

        <NavbarItem className="hidden sm:flex">
          <Link color="foreground" href="/team">
            Executive Board
          </Link>
        </NavbarItem>

        <NavbarItem className="hidden sm:flex">
          <Link color="foreground" href="/emergency">
            Blood Support Hub
          </Link>
        </NavbarItem>
        </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="mobile-menu-item text-white"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              <span>{item.name}</span>
              <span>&gt;</span>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

