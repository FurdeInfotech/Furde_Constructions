import React, { JSX, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.0) {
        setVisible(false);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        layout
        initial={{ opacity: 1, y: -150 }}
        animate={{ y: visible ? 0 : -150, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.25, delay: 0.5 }}
        className={cn(
          "flex flex-col items-center justify-between md:flex-row md:max-w-[80%] max-w-[94%] fixed sm:top-5 top-5 inset-x-0 mx-auto border rounded-4xl dark:bg-neutral-950 bg-white z-[50] px-8 py-3 overflow-hidden",
          className,
          menuOpen && "rounded-4xl"
        )}
      >
        {/* Top row (logo + hamburger / desktop menu) */}
        <div className="w-full flex items-center justify-between">
          <Image
            src={"/logo.png"}
            alt="Furde Constructions"
            width={100}
            height={100}
          />

          {/* Desktop Menu */}
          <div className="hidden sm:flex gap-12">
            {navItems.map((navItem, idx) => {
              const isActive =
                pathname === navItem.link ||
                pathname.startsWith(navItem.link + "/");
              return (
                <Link
                  key={`link-${idx}`}
                  href={navItem.link}
                  className={cn(
                    "relative items-center justify-center md:text-base text-sm flex space-x-1 text-neutral-700 hover:text-black duration-200 cursor-pointer font-semibold px-4 py-1",
                    isActive && "text-white hover:text-white"
                  )}
                >
                  <span>{navItem.name}</span>
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 -z-10 rounded-full btn-bg dark:bg-neutral-800"
                      layoutId="floatingNavActiveHighlight"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Hamburger */}
          <div className="sm:hidden">
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 flex items-center justify-center"
            >
              {/* SVG Hamburger Morph */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <motion.path
                  d="M4 6 L20 6"
                  variants={{
                    open: { d: "M5 5L19 19" },
                    closed: { d: "M4 6L20 6" },
                  }}
                  animate={menuOpen ? "open" : "closed"}
                />
                <motion.path
                  d="M4 12 L20 12"
                  variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }}
                  animate={menuOpen ? "open" : "closed"}
                />
                <motion.path
                  d="M4 18 L20 18"
                  variants={{
                    open: { d: "M5 19L19 5" },
                    closed: { d: "M4 18L20 18" },
                  }}
                  animate={menuOpen ? "open" : "closed"}
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Links (expand inside same navbar) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobileLinks"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }} // 16px = mt-4
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-4 sm:hidden w-full"
            >
              <div className="w-full h-px border-t"></div>
              {navItems.map((navItem, idx) => {
                const isActive =
                  pathname === navItem.link ||
                  pathname.startsWith(navItem.link + "/");
                return (
                  <Link
                    key={idx}
                    href={navItem.link}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Button
                      size="sm"
                      variant="ghost"
                      className={cn(
                        "font-semibold",
                        isActive && "btn-bg text-white rounded-full"
                      )}
                    >
                      {navItem.name}
                    </Button>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
