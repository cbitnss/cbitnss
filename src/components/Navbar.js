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
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="7xl" className="fixed">
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

      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <Link href="/">Home</Link>
        </NavbarItem>

        <NavbarItem className="hidden md:flex">
          <Link href="/events">Activities</Link>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Link href="/#nap">NAP</Link>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Link href="/team">Executive Board</Link>
        </NavbarItem>
        <NavbarItem>
          <Button auto size="small" color="success">
            Join Us
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

