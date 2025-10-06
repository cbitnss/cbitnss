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
  Button,
} from "@nextui-org/react";
import Link from "next/link";

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
    { name: "Executive Board", href: "/team" },
    { name: "Certificates", href: "/certificates" },
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
        <NavbarItem className="hidden md:flex">
          <Link href="/naps">
            <button className="your-nap-button-class">NAP</button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/certificates">
            Certificates
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button auto size="small" 
            css={{ 
              background: 'var(--glow-color)', 
              color: '#000', 
              fontWeight: 'bold',
              boxShadow: '0 0 10px var(--glow-color-alpha)'
            }}
          >
            Join Us
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="mobile-menu-item"
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

