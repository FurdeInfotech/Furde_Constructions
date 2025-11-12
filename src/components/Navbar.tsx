"use client";

import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { usePathname } from "next/navigation";

function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },

    {
      name: "Our Story",
      link: "/our-story",
    },
    {
      name: "Our Projects",
      link: "/projects",
    },
    {
      name: "Gallery",
      link: "/gallery",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
  ];

  const pathname = usePathname();

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/employees")) {
    return <div></div>;
  }
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}

export default Navbar;
