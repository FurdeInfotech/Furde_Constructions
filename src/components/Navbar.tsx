"use client";

import React from "react";
import { FloatingNav } from "./ui/floating-navbar";


function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    
    },

    {
      name: "Our Story",
      link: "/story",
    
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
      link: "#contact",
    
    },
  ];
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}

export default Navbar;